<template>
	<view class="container">
		<navbar :showRightButton="false" />
		<view class="info-container">
			<view class="info-title">
				基础信息
			</view>
			<view class="cell-container">
				<text class="cell-title">姓名</text><text class="cell-required">*</text>
				<input type="text" class="cell-input" placeholder="请输入" v-model="userInfo.realName">
			</view>
			<view class="cell-container">
				<text class="cell-title">邮箱</text><text class="cell-required">*</text>
				<input type="text" class="cell-input" placeholder="请输入" v-model="userInfo.email">
			</view>
		</view>
		<view class="button-container">
			<view class="cancel-button" @click="cancelChange">
				取消
			</view>
			<view class="confirm-button" @click="confirmChange">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import {
		modify
	} from '@/network/user.js';
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		components: {
			navbar
		},
		onLoad(option) {
			this.userInfo = JSON.parse(decodeURIComponent(option.userInfo));
		},
		methods: {
			cancelChange() {
				uni.navigateBack({
					delta: 1
				});
			},
			confirmChange() {
				const params = {
					realName: this.userInfo.realName,
					email: this.userInfo.email
				};

				modify(params).then((response) => {
					if (response.code == 200) {
						uni.showToast({
							title: '个人信息修改成功',
							icon: 'none'
						});

						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 800);
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none'
						});
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
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.info-container {
		background-color: white;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.info-title {
		height: 40px;
		line-height: 40px;
		border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);
		font-size: 14px;
		font-family: SFProDisplay-Regular;
		text-align: left;
		color: #000000;
		margin-left: 24px;
		margin-top: 5px;
	}

	.cell-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 24px;
		height: 56px;
		line-height: 56px;
		border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);
	}

	.cell-container input {
		margin-left: 60px;
	}

	.cell-required {
		color: red;
	}

	.cell-input {
		height: 24px;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #000000;
	}

	.button-container {
		height: 99px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: white;
		border-top: 0.5px solid rgba(0, 0, 0, 0.10);
	}

	.cancel-button {
		height: 55px;
		text-align: center;
		line-height: 55px;
		background: #ffffff;
		border: 1px solid #69a5fe;
		color: #69a5fe;
		border-radius: 29px;
		margin-top: 5px;
		margin-left: 24px;
		margin-right: 14px;
		flex: 1;
	}

	.confirm-button {
		height: 55px;
		line-height: 55px;
		text-align: center;
		background: #69a5fe;
		color: white;
		border-radius: 28px;
		margin-top: 5px;
		margin-right: 24px;
		flex: 1;
	}
</style>