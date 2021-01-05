import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const store = new Vuex.Store({
    state: {
        curCloud: 0
    },
    actions,
    mutations,
    getters,
});

export default store;