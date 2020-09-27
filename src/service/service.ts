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
  ): Promise<any> =>
    await (
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, installments, mdr, days }),
      })
    ).json()
}

export const service = new Service(process.env.API_URL)
