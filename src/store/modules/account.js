const account = {
  state: {
    id: '',
    token: '',
    user: {}
  },

  mutations: {
    setId(id) {
      account.state.id = id
    },
    setToken(token) {
      account.state.token = token
    },
    setUser(user) {
      account.state.user = user
    }
  },

  getter: {
    getId() {
      return account.state.id
    },
    getToken() {
      return account.state.token
    },
    getUser() {
      return account.state.user
    },
    clear() {
      account.state = {
        id: '',
        token: '',
        user: {}
      }
    }
  }
}

export default account
