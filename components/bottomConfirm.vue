<template>
	<view class="re-bottom bg-white shadow-sm flex-row">
		<view class="left-botton">
			<text class="left-botton-text">取消</text>
		</view>
		<view class="right-botton">
			<text class="right-botton-text" @click="clickToSubmit">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'bottomConfirm',
		props: {
			
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickToSubmit:function() {
				// uni.navigateTo({
				// 	url: '/pages/index/jobDetail/jobDetail'
				// })
				this.$router.go(-1);
			},
			clickToRecommend:function() {
				uni.navigateTo({
					url: '/pages/index/recommend/recommend'
				})
			},
		}
	}
</script>

<style>
	.re-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 134rpx;
		border-radius: 20rpx 20rpx 0 0;
		padding: 12rpx 48rpx;
	}
	.re-bottom {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 240rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
	.left-botton {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 366rpx;
		height: 110rpx;
		background: #ffffff;
		border: 2rpx solid #69a5fe;
		border-radius: 58rpx;
	}
	.left-botton-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #69a5fe;
		line-height: 40rpx;
	}
	.right-botton {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 366rpx;
		height: 110rpx;
		background: #69a5fe;
		border-radius: 56rpx;
		margin-left: 28rpx;
	}
	.right-botton {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #ffffff;
	}
	.right-botton-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #181818;
	}
	.bottom-left {
		width: 40%;
	}
	
	.bottom-left .home, .share {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 40rpx;
	}
	
	.bottom-left .home {
		border-right: 1px solid #f1f1f1;
		border-radius: 20rpx 0 0 0;
	}
	.bottom-left .home:active, .share:active {
		background-color: rgba(0,0,0,.1);
	}
	
	.bottom-right {
		width: 60%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0 20rpx 0 0;
	}
	
	.bottom-right:active {
		opacity: 0.9;
	}
</style>
