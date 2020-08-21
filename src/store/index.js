import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 点击回复的id
        comId: null,
        isComId: false
    },
    mutations: {
        reply(state, id) {
            state.isComId = !state.isComId
            state.comId = id
        },
        blurIpt(state) {
            state.comId = null
        }
    }
})

export default store