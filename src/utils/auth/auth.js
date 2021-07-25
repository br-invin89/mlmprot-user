export const getToken = () => {
  let authData = localStorage.getItem('mlmprotec2-auth')
  if (authData) {
    authData = JSON.parse(authData)
    return authData.token
  }
  return undefined
}

export const getUser = () => {
  let authData = localStorage.getItem('mlmprotec2-auth')
  if (authData) {
    authData = JSON.parse(authData)
    return authData.user
  }
  return undefined  
}

export const saveStorage = (user, token) => {
  let authData = JSON.stringify({user, token})
  localStorage.setItem('mlmprotec2-auth', authData)
}

export const removeStorage = () => {
  localStorage.removeItem('mlmprotec2-auth')
}

export const refreshStorage = (user) => {
  let authData = localStorage.getItem('mlmprotec2-auth')
  if (authData) {
    authData = JSON.parse(authData)
    authData.user = user
    localStorage.setItem('mlmprotec2-auth', JSON.stringify(authData))
  }
}
