export const onLoading = () => {
  const elm = document.querySelector('aside')
  elm?.setAttribute('data-loading', 'true')
}

export const stopLoading = () => {
  const elm = document.querySelector('aside')
  elm?.removeAttribute('data-loading')
}
