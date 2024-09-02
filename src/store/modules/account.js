const account = {
  state: {
    token: '',
    user: {}
  },

  mutations: {
    setToken(token) {
      account.state.token = token
    },
    setUser(user) {
      account.state.user = user
    }
  },

  getter: {
    getToken() {
      return account.state.token
    },
    getUser() {
      return account.state.user
    }
  }
}

export default account
