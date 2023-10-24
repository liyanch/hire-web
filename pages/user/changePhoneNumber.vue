<template>
	<view class="container">
		<navbar :showRightButton="false" />
		<view class="login-title">现手机号验证</view>
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
		<view class="login-button" @click="onConfirm">确认</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import {
		getVerificationCode,
		change
	} from '@/network/user.js';
	export default {
		data() {
			return {
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
			onConfirm() {
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

				change(params).then((response) => {
					if (response.code === 200) {
						setTimeout(function() {
							uni.navigateBack({
								delta: 100
							});
						}, 800);
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
</style>