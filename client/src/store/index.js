import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const store = new Vuex.Store({
    state: {
        userInfo: {
            avatarImg: '',
            username: '昵称',
            phone: '176****5993',
            token: ''
        },
        curCloud: 0,
        cloudList: [
            {
                title: '客厅的盒子0(管理员)',
                ip: 'FXJC_AP3(192/168.50.',
                desc: 'HCB****1001',
                state: '1',
                status: '',
                src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                size: '20.2G',
                totalSize: '981.58G',
                percent: 25
            },
            {
                title: '客厅的盒子1(管理员)',
                ip: 'FXJC_AP3(192/168.50.',
                desc: 'HCB****1001',
                state: '',
                status: 1,
                src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',size: '100.2G',
                totalSize: '981.58G',
                percent: 100
            },
            {
                title: '客厅的盒子2(管理员)',
                ip: 'FXJC_AP3(192/168.50.',
                desc: 'HCB****1001',
                src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                state: '0',
                status: '',
                size: '25.2G',
                totalSize: '981.58G',
                percent: 25
            },
            {
                title: '客厅的盒子3(管理员)',
                ip: 'FXJC_AP3(192/168.50.',
                desc: 'HCB****1001',
                state: '',
                src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
                status: '',
                size: '50.2G',
                totalSize: '981.58G',
                percent: 50
            }
        ]
    },
    actions,
    mutations,
    getters,
});

export default store;