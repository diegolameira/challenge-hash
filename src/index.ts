import { Template } from './template'
import { toCurrency, toFloat } from './commons/format'
import { service } from './service'
import './styles.scss'

function render() {
  const appWrapper = document.getElementById('app')
  if (appWrapper) {
    appWrapper.innerHTML = Template
  }
  // NOTE: i would like to get into more componentization, but if I cant this still be here =)
  const days = [1, 15, 30, 90]

  const form = document.querySelector('form')

  // NOTE: event delegation here
  form?.addEventListener(
    'blur',
    async () => {
      const data: any = {}

      // NOTE: ease way to get form data, iterable with value and key
      new FormData(form).forEach((v, k) => {
        // toFloat util for remove any mask
        data[k] = Number(toFloat(v))
      })

      // NOTE: get only values and filter for truthy values, reject if any is empty
      if (Object.values(data).filter(Boolean).length >= 3) {
        // then its time to call the api service
        try {
          const { amount, installments, mdr } = data
          let res = await service.calculate(amount, installments, mdr, days)

          // NOTE: I could make a component if things are moved on html,
          // but for matter of simplicity and time, this would work nicely and clear

          // So I map over the days params, and populate it with response
          res = days.map((v) => res[v])

          // As days are ordered as the template needs, so I just loop over it
          const report = form.querySelectorAll('p > strong')
          report.forEach((el, key) => {
            el.innerHTML = toCurrency(res[key], true)
          })
        } catch (e) {
          // NOTE: something went wrong? remind to clear so user dont see wrong report
          const report = form.querySelectorAll('p > strong')
          report.forEach((el, key) => {
            el.innerHTML = toCurrency('0', true)
          })
        }
      }
    },
    true,
  )

  // NOTE: this again can be a better module, but just follow KISS rule =P
  // In this case, here is for mask, simple and right to the point
  const amount = form?.querySelector('input[name="amount"]')
  amount.oninput = () => {
    amount.value = toCurrency(amount.value)
  }

  // This might be not used, but i keep it for debugging, just for BnF masking
  amount.onkeyup = () => {
    amount.raw = toFloat(amount.value)
  }
}

render()
