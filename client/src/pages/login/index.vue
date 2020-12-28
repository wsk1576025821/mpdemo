<template>
    <view class="login-container">
        <view class="header">
            <view class="item" v-for="(item, index) in infoList" :key="index">
                <view class="left">
                    <text class="num">{{item.idx}}</text>
                </view>
                <view class="right">
                    <text class="txt">{{item.name}}</text>
                </view>
            </view>
        </view>
        <view class="content">
            <AtForm>
                <AtInput
                    clear
                    name='phone'
                    :border="false"
                    title='手机号'
                    type='number'
                    :maxLength='11'
                    placeholder='请输入手机号'
                    :value="phone"
                    :onChange="handleChangePhone"
                />
                <AtInput
                    clear
                    name='code'
                    :border="false"
                    title='验证码'
                    :maxLength='6'
                    type='number'
                    placeholder='请输入验证码'
                    :value="code"
                    :onChange="handleChangeCode"
                >
                    <AtButton
                        class="obtain-btn"
                        :class="{'disabled': disabledSendCodeBtn}"
                        :disabled="disabledSendCodeBtn"
                        :onClick="handleSendCode"
                    >
                        {{sendBtnTxt}}
                    </AtButton>
                </AtInput>
                <AtButton
                    class="binding-btn"
                    :class="{'disabled': disabledBandingBtn}"
                    :disabled="disabledBandingBtn"
                    :onClick="onSubmit"
                >
                    绑定
                </AtButton>
                <AtButton
                    class="wxauthsign-btn"
                    openType="getPhoneNumber"
                    :onGetPhoneNumber="getPhoneNumber"
                    lang="zh_CN"
                >
                    微信授权登录
                </AtButton>
            </AtForm>    
        </view>
        <view class="footer">
            登陆即表示同意
            <view class="agreement" @tap="handleRouteTo('/pages/agreement/user/index')">《用户协议》</view>
            和
            <view class="agreement" @tap="handleRouteTo('/pages/agreement/privacy/index')">《隐私协议》</view>
        </view>
    </view>
</template>

<script>
    import './index.scss';
    import { AtInput, AtForm, AtButton } from 'taro-ui-vue';
    import Taro from '@tarojs/taro';
    import {
        toWebView,
        checkMobile,
        checkSmsCaptcha
    } from "../../utils/common";
    let maxCount = 6, defSendBtnTxt = '获取';
    export default {
        name: 'Login',
        components: {
            AtForm,
            AtInput,
            AtButton
        },
        data(){
            return{
                infoList: [
                    { name: '登录', idx: 1 },
                    { name: '连接云盒', idx: 2 },
                    { name: '选择群聊文件', idx: 3 },
                    { name: '上传', idx: 4 }
                ],
                phone: '',
                code: '',
                sendBtnTxt: defSendBtnTxt,
                disabledSendCodeBtn: true,
                timer: null,
                count: maxCount,
                isClick: false,
                isGetCode: false,
                disabledBandingBtn: true
            }
        },
        mounted(){

        },
        methods: {
            // 手机号变化
            handleChangePhone(val){
                this.phone = val;
                if(this.phone.length == 11 && !this.isClick){
                    this.disabledSendCodeBtn = false;
                }else{
                    this.disabledSendCodeBtn = true;
                }
            },
            // 验证码变化
            handleChangeCode(val){
                this.code = val;
                if(this.code.length == 6 && this.isGetCode && this.phone.length == 11){
                    this.disabledBandingBtn = false;
                } else {
                    this.disabledBandingBtn = true;
                }
            },
            // 点击获取
            handleSendCode(){
                if(!checkMobile(this.phone) || this.disabledSendCodeBtn){
                    return false;
                }
                this.disabledSendCodeBtn = true;
                // 调取发送验证码接口
                this.isGetCode = true;
                this.countDown();
            },
            // 倒计时
            countDown() {
                this.timer = setInterval(() => {
                    this.disabledSendCodeBtn = true;
                    this.isClick = true;
                    this.count--;
                    this.sendBtnTxt = this.count + 's';
                    if (this.count < 1){
                        clearInterval(this.timer);
                        this.isClick = false;
                        this.count = maxCount;
                        this.sendBtnTxt = defSendBtnTxt;
                        this.disabledSendCodeBtn = false;
                        this.isGetCode = false;
                    }
                }, 1000);
            },
            // 绑定
            onSubmit(event){
                if (!(checkMobile(this.phone) && checkSmsCaptcha(this.code))){
                    return false;
                }
            },
            // 微信手机号一键登录
            getPhoneNumber(e){
                console.log(e);
                return;
                const {dispatchRegist} = this.props;
                const {openid} = this.props.userInfo;
                if (e.detail.encryptedData && e.detail.iv) {
                    if (!openid) {
                        dispatchLogin(this).then(() => {
                        const {openid} = this.props.userInfo;
                        dispatchRegist(this, {
                            openid,
                            encryptedData: e.detail.encryptedData,
                            iv: e.detail.iv
                        }).then(() => {
                            let next = this.$router.params.next;
                            redirectTo({
                            url: next || "/pages/user/index",
                            isCloseAll: true
                            });
                        });
                        })
                    } else {
                        dispatchRegist(this, {
                            openid,
                            encryptedData: e.detail.encryptedData,
                            iv: e.detail.iv
                        }).then(() => {
                            let next = this.$router.params.next;
                            let { params } = this.$router;
                            redirectTo({
                                url: next || "/pages/user/index",
                                query: params,
                                isCloseAll: true
                            });
                        });
                    }
                }
            },
            handleRouteTo(path){
                Taro.navigateTo({
                    url: path
                });
            }
        }
    }
</script>