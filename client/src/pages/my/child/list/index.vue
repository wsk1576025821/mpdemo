<template>
    <view class="my-list">
        <AtList>
            <AtListItem
                class="item"
                v-for="(item, index) in list"
                :key="index"
                :title='item.title'
                arrow='right'
                :iconInfo="item.iconInfo"
                :onClick="handleClick"
            />
        </AtList>
    </view>
</template>

<script>
    import './index.scss';
    import { AtList, AtListItem } from 'taro-ui-vue'
    export default {
        components: {
            AtList,
            AtListItem
        },
        data(){
            return{
                list: [
                    {
                        title: '常见问题',
                        iconInfo: {
                            size: 25,
                            color: '#000',
                            value: 'help'
                        }
                    },
                    {
                        title: '打开app',
                        iconInfo: {
                            size: 25,
                            color: '#000',
                            value: 'iphone'
                        }
                    }
                ]
            }
        },
        mounted(){

        },
        methods:{
            // 点击item
            handleClick(item){
                console.log(item);
            }
        }
    }
</script>