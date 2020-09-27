import './styles.scss'

function render() {
  const appWrapper = document.getElementById('app')
  if (appWrapper)
    appWrapper.innerHTML = `
      <h1>hello</h1>
    `
}

render()
