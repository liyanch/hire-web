<template>
	<view class="container">
		<navbar :showRightButton="false"></navbar>
		<view class="info-container">
			<img src="../../static/avatar.png" alt="" class="head-portrait">
			<view class="username-text">
				{{userInfo.realName}}
			</view>
		</view>

		<view class="cell-container">
			<view class="cell" @click="updateUserInfo">
				<img src="../../static/update_info_icon.png" alt="" class="cell-img">
				<text>修改个人资料</text>
				<img class="cell-arrow" src="../../static/arrow_right.png" alt="">
			</view>
			<view class="cell" @click="managementResume">
				<img src="../../static/management_resume_icon.png" alt="" class="cell-img">
				<text>简历管理</text>
				<img class="cell-arrow" src="../../static/arrow_right.png" alt="">
			</view>
			<view class="cell" @click="deliveryRecord">
				<img src="../../static/delivery_recard_icon.png" alt="" class="cell-img">
				<text>应聘记录</text>
				<img class="cell-arrow" src="../../static/arrow_right.png" alt="">
			</view>
			<view class="cell" @click="updateAccount">
				<img src="../../static/account_update_icon.png" alt="" class="cell-img">
				<text>账号修改</text>
				<img class="cell-arrow" src="../../static/arrow_right.png" alt="">
			</view>
		</view>
		<view class="logout-button-container">
			<view class="logout-button" @click="onLogout">
				退出登录
			</view>
		</view>

	</view>
</template>
<script>
	import {
		logout,
		supplyInfo
	} from '@/network/user.js';
	import navbar from '@/components/nav.vue';
	export default {
		data() {
			return {
				showWarningView: false,
				userInfo: {}
			}
		},
		onShow() {
			this.getUserInfo();
		},
		components: {
			navbar
		},
		methods: {
			updateUserInfo() {
				const json = encodeURIComponent(JSON.stringify(this
					.userInfo));
				uni.navigateTo({
					url: '/pages/user/changeUserInfo?userInfo=' + json
				})
			},
			managementResume() {
				uni.navigateTo({
					url: '/pages/user/manageResume/manageResume'
				})
			},
			deliveryRecord() {
				uni.navigateTo({
					url: '/pages/user/record/DeliveryRecord'
				})
			},
			updateAccount() {
				const json = encodeURIComponent(JSON.stringify(this
					.userInfo));
				uni.navigateTo({
					url: '/pages/user/accountModify?userInfo=' + json
				})
			},
			onLogout() {
				logout().then((response) => {
					uni.removeStorageSync('token');
					uni.navigateBack({
						delta: 1 // 返回一个页面
					});
				})
			},
			getUserInfo() {
				supplyInfo().then((response) => {
					if (response.code == 200 && response.data != null) {
						this.userInfo = response.data;
					}
				})
			}
		}

	}
</script>

<style>
	.container {
		/* position: fixed; */
		width: 100%;
		/* height: 100vh; */
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.info-container {
		height: 194px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.head-portrait {
		width: 81px;
		height: 81px;
		border-radius: calc(81px / 2);
	}

	.username-text {
		margin-top: 7px;
		height: 17px;
		font-size: 12px;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #181818;
	}

	.cell-container {
		flex: 1;
	}

	.cell {
		width: 100%;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.5px solid #dddddd;
	}

	.cell-img {
		width: 18px;
		height: 18px;
		margin-left: 24px;
	}

	.cell text {
		flex: 1;
		margin-left: 15px;
	}

	.cell-arrow {
		height: 13px;
		width: 7px;
		margin-right: 24px;
	}

	.logout-button-container {
		height: 92px;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.logout-button {
		height: 55px;
		line-height: 55px;
		width: calc(100% - 2 * 24px);
		background: #ffffff;
		border: 1px solid #dddddd;
		border-radius: 29px;
		text-align: center;
	}
</style>