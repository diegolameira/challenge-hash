import { Template } from './template'
import './styles.scss'
function render() {
  const appWrapper = document.getElementById('app')
  if (appWrapper) {
    appWrapper.innerHTML = Template
  }
}

render()
