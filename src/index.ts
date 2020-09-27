import { Template } from './template'
import { service } from './service'
import './styles.scss'
function render() {
  const appWrapper = document.getElementById('app')
  if (appWrapper) {
    appWrapper.innerHTML = Template
  }
  const days = [1, 15, 30, 90]

  const form = document.querySelector('form')
  if (form)
    form.addEventListener(
      'blur',
      () => {
        const data: any = {}

        new FormData(form).forEach((v, k) => {
          data[k] = Number(v)
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
                el.innerHTML = res[key]
              })
            })
        }
      },
      true,
    )
}

render()
