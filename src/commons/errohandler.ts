const dict = {
  'The installments cannot be greater than 12':
    'Parcelas não pode ser maior que 12',
  'The amount cannot be greater than 1 million':
    'Valor da venda não pode ser maior que 1 milhão',
}

const parseError = (error) =>
  ({
    400: {
      msg: dict[error.message] || error.message,
      type: 'warning',
    },
    408: {
      msg: 'Ops, o servidor não está respondendo.',
      type: 'info',
    },
    0: {
      msg: 'Ops, verifique sua conexão e tente novamente.',
      type: 'info',
    },
  }[error.status] || {
    msg: 'Ops, ocorreu um erro inexperado..',
    type: 'danger',
  })

export const onError = (error) => {
  const { msg, type } = parseError(error)
  const elm = document.querySelector('aside')
  elm?.setAttribute('data-msg', msg)
  elm?.setAttribute('data-type', type)
}

export const clearError = () => {
  const elm = document.querySelector('aside')
  elm?.removeAttribute('data-msg')
  elm?.removeAttribute('data-type')
}
