<template>
	<view class="cover">
		<view class="re-bottom bg-white shadow-sm flex-column">
			<button class="copy-button">分享好友</button>
			<view class="cancel-button-container">
				<button class="cancel-button" @click="clickToSubmit">取消</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		methods: {
			clickToSubmit: function() {
				this.$emit('cancelShare');
			},
			clickToCopy: function() {
				this.$emit('copyLink');
			}
		}
	}
</script>

<style scoped>
	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 200;
	}

	.re-bottom {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #f7f7f7;
	}

	.copy-button {
		height: 56px;
		line-height: 56px;
		width: 100%;
		background: #ffffff;
		border-radius: 12px 12px 0px 0px;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #69a5fe;
	}

	.cancel-button-container {
		display: flex;
		height: 98px;
		width: 100%;
		justify-content: center;
		margin-top: 17px;
		background-color: white;
	}

	.cancel-button {
		height: 55px;
		line-height: 55px;
		width: calc(100% - 2 * 24px);
		background: #ffffff;
		border: 1px solid #dddddd;
		border-radius: 29px;
		text-align: center;
		margin-top: 6px;
	}
</style>