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
    curType: () => account.getter.getToken() !== null ? 'account' : 'worker',
    curId: () => account.getter.getToken() !== null ? account.getter.getId() : worker.getter.getId(),
    curToken: () => account.getter.getToken() !== null ? account.getter.getToken() : worker.getter.getToken(),
    curUser: () => account.getter.getToken() !== null ? account.getter.getUser() : worker.getter.getUser(),
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
