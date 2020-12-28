<template>
    <view class="my-container">
        <Header />
        <CloudBox />
        <List />
        <Footer />
    </view>
</template>

<script>
    import './index.scss';
    import Header from  './child/header';
    import CloudBox from './child/cloudBox';
    import List from './child/list';
    import Footer from './child/footer';
    export default {
        name: 'My',
        components: {
            Header,
            CloudBox,
            List,
            Footer
        },
        data(){
            return{
                
            }
        },
        mounted(){

        },
        methods:{
            
        }
    }
</script>