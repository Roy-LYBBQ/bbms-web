import Vue from 'vue'
import Vuex from 'vuex'
import account from '@/store/modules/account'
import worker from '@/store/modules/worker'

Vue.use(Vuex)

const myStore = new Vuex.Store({
  modules: {
    account,
    worker
  },
  getters: {
    account: () => account,
    worker: () => worker,
    hasAccount: function() {
      return function() {
        return account.getter.getToken() !== null
      }
    },
    hasWorker: function() {
      return function() {
        return worker.getter.getToken() !== null
      }
    }
  }
})

export default myStore
