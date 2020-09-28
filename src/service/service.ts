import { onLoading, stopLoading } from './../commons/loading'
import { clearError, onError } from './../commons/errohandler'

class Service {
  protected apiUrl: string
  constructor(apiUrl = '') {
    this.apiUrl = apiUrl
  }
  public calculate = async (
    amount: number,
    installments: number,
    mdr: number,
    days?: number[],
  ): Promise<any> => {
    try {
      clearError()
      onLoading()
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, installments, mdr, days }),
      })
      if (res.status !== 200) {
        const { message } = await res.json()
        throw { status: res.status, message }
      }
      return await res.json()
    } catch (e) {
      onError(e)
      throw e
    } finally {
      stopLoading()
    }
  }
}

export const service = new Service(process.env.API_URL)
