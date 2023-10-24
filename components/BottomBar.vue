<template>
	<view class="bottom-container">
		<view class="button-container" v-if="type == '0'">
			<button class="left-button" open-type="share">
				分享好友
			</button>
			<button class="right-button" @click="clickToSubmit">
				投递
			</button>
		</view>
		<view class="closed-button-container" v-else>
			<button class="closed-button">
				此职位已关闭
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BottomBar',
		props: {
			type: {
				type: String,
				default: null
			},
			jobName: {
				type: String,
				default: null
			}
		},
		data() {
			return {

			};
		},
		methods: {
			clickToSubmit: function() {
				this.$emit('sendResume');
			}
		},
		onLoad(option) {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage"]
			})
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {

			}
		}
	}
</script>

<style scoped>
	.bottom-container {
		width: 100%;
	}

	.button-container {
		height: 55px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-left: 24px;
		margin-right: 24px;
		margin-top: 6px;
	}

	.left-button {
		margin-right: 10px;
		flex: 1;
		height: 55px;
		line-height: 55px;
		text-align: center;
		background: #ffffff;
		border: 2rpx solid #69a5fe;
		border-radius: 58rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #69a5fe;
	}

	.right-button {
		line-height: 55px;
		text-align: center;
		flex: 1;
		height: 55px;
		background: #69a5fe;
		border-radius: 56rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #ffffff;
	}

	.closed-button-container {
		width: 100%;
		height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 6px;
	}

	.closed-button {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #fff;
		line-height: 55px;
		height: 55px;
		background: #acacac;
		border-radius: 28px;
		text-align: center;
		flex: 1;
		/* width: calc(100% - 24px * 2); */
		margin-left: 24px;
		margin-right: 24px;
	}
</style>