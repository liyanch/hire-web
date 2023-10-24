<template>
	<view class="container">
		<navbar class="nav" :showRightButton="false"></navbar>
		<view class="top-container">
			<view class="cell" @click="changePhoneNumber">
				<text class="cell-title">账号</text>
				<text class="cell-subtitle">更换 {{userInfo.encryptedPhoneNumber}}</text>
				<img class="cell-arrow" src="../../static/arrow_right.png" alt="">
			</view>
		</view>

		<view class="logout-button-container">
			<text @click="onLogout">注销账号</text>
		</view>
		<!--更换绑定的手机号弹窗-->
		<view class="warning-mask" v-if="showChangePhoneNumberView" @touchmove.stop.prevent="emptyEvent">
			<view class="warning-content-container">
				<view class="warning-content-title">
					更换绑定的手机号
				</view>
				<view class="warning-content">
					当前绑定的手机号码为{{userInfo.encryptedPhoneNumber}}
				</view>
				<view class="warning-content-button-container">
					<view class="warning-cancel-button" @click="cancelChangePhoneNumber">
						取消
					</view>
					<view class="warning-confirm-button" @click="confirmChangePhoneNumber">
						更换
					</view>
				</view>
			</view>
		</view>
		<!--注销账号弹窗-->
		<view class="warning-mask" v-if="showLogoutWarningView" @touchmove.stop.prevent="emptyEvent">
			<view class="warning-content-container">
				<view class="warning-content-title">
					注销登录
				</view>
				<view class="warning-content">
					注销后将删除个人信息，个人简历，投递记录，请谨慎操作
				</view>
				<view class="warning-content-button-container">
					<view class="warning-cancel-button" @click="cancelLogout">
						取消
					</view>
					<view class="warning-confirm-button" @click="confirmLogout">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	import navbar from '@/components/nav.vue';
	import {
		logoff
	} from '@/network/user.js';
	export default {
		data() {
			return {
				userInfo: {},
				showLogoutWarningView: false,
				showChangePhoneNumberView: false
			}
		},
		props: {

		},
		components: {
			navbar
		},
		onLoad(option) {
			this.userInfo = JSON.parse(decodeURIComponent(option.userInfo));
			this.userInfo.encryptedPhoneNumber = this.encryptedPhoneNumber(this.userInfo.mobile);
		},
		methods: {
			encryptedPhoneNumber(phoneNumber) {
				if (typeof phoneNumber !== 'string' || phoneNumber.length !== 11) {
					return phoneNumber;
				}
				return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			},
			changePhoneNumber() {
				this.showChangePhoneNumberView = true;
			},
			onLogout() {
				this.showLogoutWarningView = true;
			},
			cancelChangePhoneNumber() {
				this.showChangePhoneNumberView = false;
			},
			confirmChangePhoneNumber() {
				this.showChangePhoneNumberView = false;
				uni.navigateTo({
					url: '/pages/user/changePhoneNumber'
				})
			},
			cancelLogout() {
				this.showLogoutWarningView = false;
			},
			confirmLogout() {
				this.showLogoutWarningView = false;
				logoff().then((response) => {
					if (response.code == 200) {
						uni.removeStorageSync('token');
						uni.showToast({
							title: '注销账号成功',
							icon: 'none'
						});

						setTimeout(function() {
							uni.navigateBack({
								delta: 100
							});
						}, 800);
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.top-container {
		background-color: white;
		margin-bottom: 16px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
	}

	.cell {
		width: 100%;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.5px solid #dddddd;
		background-color: white;
	}

	.cell text {
		flex: 1;
		margin-left: 15px;
	}

	.cell-title {}

	.cell-subtitle {
		text-align: right;
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		color: #acacac;
		margin-right: 5px;
	}

	.cell-arrow {
		height: 13px;
		width: 7px;
		margin-right: 24px;
	}

	.logout-button-container {
		display: flex;
		background-color: white;
		justify-content: center;
		height: 99px;
		width: 100%;
	}

	.logout-button-container text {
		height: 47px;
		line-height: 47px;
		width: 100%;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #fa5151;
	}

	.warning-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.warning-content-container {
		width: 320px;
		height: 226px;
		background: #ffffff;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.warning-content-title {
		height: 24px;
		line-height: 24px;
		margin-top: 32px;
		opacity: 0.9;
		font-size: 17px;
		font-family: PingFangSC-Medium;
		text-align: center;
		color: #000000;
	}

	.warning-content {
		height: 53px;
		width: calc(100% - 2 * 24px);
		opacity: 0.3;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #000000;
	}

	.warning-content-button-container {
		display: flex;
		flex-direction: row;
		height: 57px;
		width: 100%;
		border-top: 0.5px solid rgba(0, 0, 0, 0.10);
	}

	.warning-cancel-button {
		height: 100%;
		line-height: 57px;
		opacity: 0.9;
		font-size: 17px;
		font-family: PingFangSC-Medium;
		text-align: center;
		color: #000000;
		letter-spacing: 1px;
		flex: 1 1 auto;
		border-right: 0.5px solid rgba(0, 0, 0, 0.10);
	}

	.warning-confirm-button {
		height: 100%;
		font-size: 17px;
		font-family: PingFangSC-Medium;
		text-align: center;
		color: #fa5151;
		line-height: 57px;
		letter-spacing: 1px;
		flex: 1 1 auto;
	}
</style>