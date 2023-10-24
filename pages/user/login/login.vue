<template>
	<view class="container">
		<!-- <uni-nav-bar :fixed="true" left-width="0" right-icon="bars" class="nav-container">
			<img src="../../../static/logo.png" alt="" class="nav-img">
			<view class="nav-text">垣信卫星</view>
		</uni-nav-bar> -->
		<navbar :showRightButton="false" />
		<view class="login-title">手机号码登录</view>
		<view class="input-container phonenumber" :class="{ invalid: phoneNumberError }">
			<view class="input-title">手机号</view>
			<input type="text" placeholder="请输入手机号码" v-model="phoneNumber">
		</view>
		<view class="error-text phonenumber-error" :style="{ visibility: phoneNumberError ? 'visible' : 'hidden' }">
			手机号输入错误</view>
		<view class="input-container verificationcode" :class="{ invalid: verificationCodeError }">
			<view class="input-title">验证码</view>
			<input type="text" placeholder="请输入验证码" v-model="verificationCode">
			<view class="send-button" :class="{ 'disabled' : countDownInterval == null }" @click="sendVerificationCode">
				{{ buttonText }}
			</view>
		</view>
		<view class="error-text verificationcode-error"
			:style="{ visibility: verificationCodeError ? 'visible' : 'hidden' }">验证码输入错误</view>
		<view class="login-button" @click="onLogin">登录</view>
		<view class="register-hint">未注册的手机号登录成功后将自动注册</view>
		<view class="protocol-container" @click="toggleCheckbox" :class="{ checked: isChecked }">
			<img alt="" class="checkbox-icon">
			<span class="gray-text">我已阅读并同意</span>
			<span class="blue-text" @click.stop="userProtocol">《用户协议》</span>
			<span class="gray-text">与</span>
			<span class="blue-text" @click.stop="privacyPolicy">《隐私政策》</span>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import {
		getVerificationCode,
		login,
		userInfo,
		supplyInfo
	} from '@/network/user.js';
	export default {
		data() {
			return {
				isChecked: false,
				phoneNumber: '',
				verificationCode: '',
				countDown: 60,
				countDownInterval: null,
				phoneNumberError: false,
				verificationCodeError: false
			};
		},
		components: {
			navbar
		},
		computed: {
			buttonText() {
				return this.countDownInterval != null ? `已发送（${this.countDown})` : '发送验证码';
			}
		},
		methods: {
			toggleCheckbox() {
				this.isChecked = !this.isChecked;
			},
			sendVerificationCode() {
				if (this.phoneNumber.length == 0) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return
				}
				if (this.phoneNumber.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return
				}

				if (this.countDownInterval != null) return;

				const params = {
					areaCode: '86',
					mobile: this.phoneNumber,
					type: 1
				}
				getVerificationCode(params).then((response) => {
					if (response.code == 200) {
						this.countDown = 60;
						this.countDownInterval = setInterval(() => {
							this.countDown--;
							if (this.countDown <= 0) {
								clearInterval(this.countDownInterval);
								this.countDownInterval = null;
							}
						}, 1000);
					} else {
						uni.showToast({
							title: '验证码请求失败',
							icon: 'none'
						});
					}
				});
			},
			validatePhoneNumber() {
				const phoneNumberPattern = /^[1]\d{10}$/;
				if (!phoneNumberPattern.test(this.phoneNumber)) {
					this.phoneNumberError = true;
					return false;
				}
				return true;
			},
			onLogin() {
				// 检查是否同意协议等逻辑...
				if (this.isChecked == false) {
					uni.showToast({
						title: '请阅读并同意《用户协议》及《隐私政策》',
						icon: 'none'
					});
					return;
				}
				// 进行手机号验证逻辑
				if (!this.validatePhoneNumber()) {
					return;
				}
				if (this.verificationCode.length === 0) {
					this.verificationCodeError = true;
					return;
				}
				const params = {
					areaCode: '86',
					mobile: this.phoneNumber,
					code: this.verificationCode
				}

				login(params).then((response) => {
					if (response.code === 200) {
						uni.setStorageSync('token', response.data.access_token);
						supplyInfo().then((userInfoResponse) => {
							if (userInfoResponse.code === 200 && userInfoResponse.data.realName != null) {
								// 已经填写过基本信息了
								uni.navigateBack({
									delta: 1 // 返回一个页面
								});
							} else {
								// 没有填写过基本信息，跳转到跳转基础信息页
								uni.navigateTo({
									url: '/pages/index/baseInfo/baseInfo'
								})
							}
						})
					} else if (response.msg === '验证码或手机号不正确') {
						this.verificationCodeError = true;
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none'
						});
					}
				})
			},
			userProtocol() {
				uni.navigateTo({
					url: '/pages/user/userProtocol/userProtocol'
				})
			},
			privacyPolicy() {
				uni.navigateTo({
					url: '/pages/user/privacyPolicy/privacyPolicy'
				})
			}
		},
		beforeDestroy() {
			if (this.countDownInterval) {
				clearInterval(this.countDownInterval);
				this.countDownInterval = null;
			}
		}
	};
</script>

<style>
	.container {
		background-color: white;
	}

	.nav-container {
		height: 50px;
	}

	.nav-text {
		height: 50px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-65 Medium;
		font-weight: normal;
		text-align: left;
		color: #181818;
		line-height: 50px;
		margin-left: 12rpx;
		padding: 0px;
	}

	.nav-img {
		height: 30px;
		width: 46px;
		margin-left: 24px;
		z-index: 12;
		margin-top: 8px;
	}

	.login-title {
		height: 42px;
		font-size: 30px;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #181818;
		margin-top: 15%;
		margin-left: 24px;
	}

	.input-container {
		display: flex;
		align-items: center;
		height: 56px;
		margin-left: 24px;
		margin-right: 24px;
		border-bottom: 1px solid #ccc;
	}

	.input-title {
		width: 80px;
	}

	.input-container.invalid {
		border-bottom: 1px solid #fa5151;
	}

	.input-container.phonenumber {
		margin-top: 50px;
	}

	.input-container.verificationcode {
		margin-top: 4px;
	}

	.phonenumber text {
		height: 24px;
		width: 40px;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #181818;
	}

	.phonenumber input {
		height: 24px;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #181818;
		flex: 1;
	}

	.error-text {
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #fa5151;
	}

	.error-text.hidden {
		visibility: hidden;
	}

	.phonenumber-error {
		margin-left: 24px;
	}

	.verificationcode-error {
		margin-left: 24px;
	}

	.verificationcode span {
		width: 50px;
	}

	.verificationcode input {
		flex: 1;
		height: 24px;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
	}

	.send-button {
		width: 80px;
		height: 40px;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		text-align: right;
		color: #69a5fe;
		line-height: 40px;
		cursor: pointer;
	}

	.disabled {
		cursor: not-allowed;
	}



	.login-button {
		margin-top: 45px;
		margin-left: 24px;
		margin-right: 24px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		background: #69a5fe;
		color: white;
		border-radius: 25px;
	}

	.register-hint {
		width: 100%;
		height: 17px;
		opacity: 0.3;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #000000;
		margin-top: 13px;
	}

	.protocol-container {
		display: flex;
		position: fixed;
		bottom: 41px;
		left: 0px;
		right: 0px;
		justify-content: center;
		align-items: center;
		height: 20px;
	}

	.checkbox-icon {
		width: 14px;
		height: 14px;
		margin-right: 8px;
		background-image: url(../../../static/blue-checkbox-deselected.png);
		background-size: 14px;
		background-repeat: no-repeat;
		background-position: center;
	}

	.protocol-container.checked .checkbox-icon {
		width: 14px;
		height: 14px;
		margin-right: 8px;
		background-image: url(../../../static/blud_checkbox_selected.png);
		background-size: 14px;
		background-repeat: no-repeat;
		background-position: center;
	}

	.gray-text {
		/* line-height: 20px; */
		font-size: 12px;
		font-family: PingFangSC-Regular;
		text-align: right;
		color: #acacac;
		line-height: 20px;
	}

	.blue-text {
		/* line-height: 20px; */
		font-size: 12px;
		font-family: PingFangSC-Regular;
		text-align: right;
		color: #69a5fe;
		line-height: 20px;
	}
</style>