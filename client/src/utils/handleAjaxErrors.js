export const handleAjaxErrors = (error) => {
  if (error.status === 401) {
    console.log('Não autorizado')
  }
}
