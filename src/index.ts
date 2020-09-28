import { Template } from './template'
import { toCurrency, toFloat } from './commons/format'
import { service } from './service'
import './styles.scss'

function render() {
  const appWrapper = document.getElementById('app')
  if (appWrapper) {
    appWrapper.innerHTML = Template
  }
  const days = [1, 15, 30, 90]

  const form = document.querySelector('form')

  form?.addEventListener(
    'blur',
    () => {
      const data: any = {}

      new FormData(form).forEach((v, k) => {
        data[k] = Number(toFloat(v))
      })

      if (Object.values(data).filter(Boolean).length >= 3) {
        const { amount, installments, mdr } = data
        service
          .calculate(amount, installments, mdr, days)
          .then((res) => {
            return days.map((v) => res[v])
          })
          .then((res) => {
            const report = form.querySelectorAll('p > strong')
            report.forEach((el, key) => {
              el.innerHTML = toCurrency(res[key], true)
            })
          })
      }
    },
    true,
  )

  const amount = form?.querySelector('input[name="amount"]')
  amount.oninput = () => {
    amount.value = toCurrency(amount.value)
  }

  amount.onkeyup = () => {
    amount.raw = toFloat(amount.value)
  }
}

render()
