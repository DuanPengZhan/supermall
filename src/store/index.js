import {
  createStore
} from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters  from './getters'


const state = {
  cartList: []
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})