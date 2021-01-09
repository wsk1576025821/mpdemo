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
            phone: '',
            token: ''
        },
        curCloud: 0,
        // cloudList: [
        //     {
        //         title: '客厅的盒子0(管理员)',
        //         ip: 'FXJC_AP3(192/168.50.',
        //         desc: 'HCB****1001',
        //         state: '1',
        //         status: '',
        //         src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
        //         size: '20.2G',
        //         totalSize: '981.58G',
        //         percent: 25
        //     },
        //     {
        //         title: '客厅的盒子1(管理员)',
        //         ip: 'FXJC_AP3(192/168.50.',
        //         desc: 'HCB****1001',
        //         state: '',
        //         status: 1,
        //         src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',size: '100.2G',
        //         totalSize: '981.58G',
        //         percent: 100
        //     },
        //     {
        //         title: '客厅的盒子2(管理员)',
        //         ip: 'FXJC_AP3(192/168.50.',
        //         desc: 'HCB****1001',
        //         src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
        //         state: '0',
        //         status: '',
        //         size: '25.2G',
        //         totalSize: '981.58G',
        //         percent: 25
        //     },
        //     {
        //         title: '客厅的盒子3(管理员)',
        //         ip: 'FXJC_AP3(192/168.50.',
        //         desc: 'HCB****1001',
        //         state: '',
        //         src: 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg',
        //         status: '',
        //         size: '50.2G',
        //         totalSize: '981.58G',
        //         percent: 50
        //     }
        // ],
        cloudList: [],
        uploadList: [
            {
                id: 1,
                title: '标题文字1',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                progress: 25,
                size: 111111,
                speed: 20,
                type: 'image'
            },
            {
                id: 2,
                title: '标题文字2',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                progress: 50,
                size: 999999,
                speed: 50,
                type: 'image',
                time: '1608994578861'
            },
            {
                id: 3,
                title: '标题文字3',
                thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                progress: 100,
                size: 999,
                speed: 100,
                type: 'image',
                time: '1608994578861'
            }
        ],
        curUploadIdx: 0,
    },
    actions,
    mutations,
    getters,
});

export default store;