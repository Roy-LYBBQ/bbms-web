const account = {
  state: {
    id: null,
    token: null,
    user: null
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
        id: null,
        token: null,
        user: null
      }
    }
  }
}

export default account
