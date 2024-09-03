const worker = {
  state: {
    token: '',
    id: '',
    user: {}
  },

  mutations: {
    setId(id) {
      worker.state.id = id
    },
    setToken(token) {
      worker.state.token = token
    },
    setUser(user) {
      worker.state.user = user
    }
  },
  getter: {
    getId() {
      return worker.state.id
    },
    getToken() {
      return worker.state.token
    },
    getUser() {
      return worker.state.user
    },
    clear() {
      worker.state = {
        token: '',
        id: '',
        user: {}
      }
    }
  }
}

export default worker
