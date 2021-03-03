import vuex from 'vuex'

import Vue from 'vue'

Vue.use(vuex)

export default new vuex.Store({
    state:{
        tx_data:{
            num:'',
            type:'1'
        }
    },
    mutations:{
        change_tx(state,data){
            state.tx_data=data
        }
    }
})