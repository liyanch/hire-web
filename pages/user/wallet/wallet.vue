<template>
	<view class="container flex-column align-center">
		<view class="wallet-card radius-sm margin-top-sm flex-column flex-center text-white">
			<text class="text-xl">收益</text>
			<text class="margin-top-lg text-bold">99</text>
			<view class="btn re-btn">
				提现信息
			</view>
		</view>
		<view class="re-btn re-btn-lg bg-blue text-white margin-top-xl">
			我要提现
		</view>
		<titleBar :titleValue="'提现记录'" class="margin-top-lg"></titleBar>
		
		<!-- 提现记录列表 -->
		<view class="record-list flex-column align-center">
			<view class="recod-item bg-white radius-xs margin-top-sm" 
			v-for="(recordItem, index) in recordList" :key="index">
				<text class="margin-left-sm text-gray">2020-09-05 12:31:56</text>
				<text class="text-red text-bold text-lg">- 90</text>
			</view>
		</view>
	</view>
</template>

<script>
	import titleBar from '@/components/titleBar.vue';
	
	export default {
		data() {
			return {
				recordList: [
					{
						
					},
					{
						
					},
					{
						
					}
				],
				
			}
		},
		components: {
			titleBar
		},
		methods: {
			
		}
	}
</script>

<style>
	.wallet-card {
		width: 94%;
		height: 300rpx;
		background: linear-gradient(to right, rgb(255, 126, 95), rgb(254, 180, 123));
		position: relative;
	}
	
	.wallet-card text:last-of-type {
		font-size: 50rpx;
	}
	
	.wallet-card text:last-of-type::before {
		content: '¥';
		font-size: 20px;
		margin-right: 14rpx;
	}
	
	.wallet-card .btn {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		background-color: rgba(0,0,0,.3);
		width: 160rpx;
		height: 50rpx;
		font-size: 13px;
		border-radius: 50rpx;
	}
	
	.record-list {
		width: 100%;
		height: auto;
	}
	
	.record-list .recod-item {
		width: 94%;
		height: 120rpx;
		line-height: 120rpx;
	}
	
	.record-list .recod-item text:last-of-type {
		float: right;
		margin-right: 20rpx;
	}
	
	.record-list .recod-item:last-of-type {
		margin-bottom: 30rpx;
	}
</style>
