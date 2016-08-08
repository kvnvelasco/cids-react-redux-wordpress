export const openMenu = () => {
  return dispatch => {
    dispatch({type: '_MENU', payload: true})
  }
}
