<template>
    <!-- 这里的style=css是一定要加的 -->
    <view class="item" :style="css">
        <view class="img-box">
            <image class="img" :src="data[index].src" />
        </view>
        <view class="desc">
            <view class="top">{{data[index].title}}</view>
            <view class="bottom">
                <view class="time">{{data[index].time}}</view>
                <view class="size">{{data[index].size}}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['index', 'data', 'css'],

}
</script>

<style lang="scss">
.item{
    background: #fff;
    height: 102px;
    box-sizing: border-box;
    border-radius: 24px;
    padding: 20px 28px 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 16px;
    .img-box{
        width: 64px;
        height: 64px;
        flex-shrink: 0;
        .img{
            width: 100%;
            height: 100%;
        }
    }
    .desc{
        margin-left: 17px;
        height: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .top{   
            font-size: 22px;
            font-weight: 400;
            color: #4B4D5E;
        }
        .bottom{
            font-size: 18px;
            font-weight: 400;
            color: #A0A2B4;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            .time{

            }
            .size{
                margin-left: 17px;
            }
        }
    }
}
</style>