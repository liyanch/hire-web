<template>
	<view class="container flex-column bg-white">
		
		<!-- 头部用户信息展示 -->
		<view class="head">
			<view class="info-card flex-row">
				<view class="card-left flex-row">
					<view class="img-box flex-row flex-center">
						<image src="../../static/fail.png" class="avatar"></image>
					</view>
					<view class="text-box flex-column justify-center">
						<text class="text-bold text-xl">REDEFINE</text>
						<text class="margin-top-sm text-xs">15870678860</text>
					</view>
				</view>
				<view class="card-right flex-row flex-center">
					<view class="re-btn bg-gray re-btn-sm text-black text-xs">
						更新信息
						<text class="fa fa-refresh"></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 简历菜单 -->
		<view class="menu-list radius-xs grid col-4 bg-white shadow-sm">
			<view class="menu-item flex-column flex-center" 
			v-for="(menuItem, index) in menuList" :key="index" @click="toOfferPage(index)">
				<image :src="menuItem.icon"></image>
				<text>{{menuItem.name}}</text>
			</view>
		</view>
		
		<!-- 功能菜单 -->
		<view class="func-list radius-xs bg-white">
			<reList v-for="(funcItem, index) in funcList" :key="index"
			:icon="funcItem.icon" :name="funcItem.name" @toFunc="toFuncPage(index)"></reList>
		</view>
	</view>
</template>

<script>
	import reList from '@/components/listItem.vue';
	export default {
		data() {
			return {
				menuList: [
					{
						icon: '../../static/all.png',
						name: '全部'
					},
					{
						icon: '../../static/yitoudi.png',
						name: '已投递'
					},
					{
						icon: '../../static/daimianshi.png',
						name: '待面试'
					},
					{
						icon: '../../static/pass.png',
						name: '未通过'
					}
				],
				funcList: [
					{
						icon: '../static/jianli.png',
						name: '我的简历'
					},
					{
						icon: '../static/jianzhi.png',
						name: '我的兼职'
					},
					{
						icon: '../static/wallet.png',
						name: '钱包'
					},
					{
						icon: '../static/share.png',
						name: '分享推广'
					},
					{
						icon: '../static/jubao.png',
						name: '举报投诉'
					},
					{
						icon: '../static/setting.png',
						name: '设置'
					}
				],
				
			}
		},
		components: {
			reList
		},
		methods: {
			toFuncPage:function(index) {
				switch(index) {
					case 0:
						uni.navigateTo({
							url: 'myResume/myResume'
						})
						break;
					case 1:
						uni.navigateTo({
							url: 'myPartTime/myPartTime'
						})
						break;
					case 2:
						uni.navigateTo({
							url: 'wallet/wallet'
						})
						break;
					case 3:
						uni.navigateTo({
							url: 'share/share'
						})
						break;
					case 4:
						uni.navigateTo({
							url: 'report/report'
						})
						break;
					case 5:
						uni.navigateTo({
							url: 'setting/setting'
						})
						break;
						
				}
			},
			toOfferPage:function(index) {
				uni.navigateTo({
					url: 'allOffer/allOffer?index=' + index
				})
			},
			
		}
	}
</script>

<style>
	.container {
		align-items: center;
	}
	
	.head {
		width: 100vw;
		height: 260rpx;
		background-color: #4b7bec;
	}
	
	.head .info-card {
		width: 94%;
		margin-left: 3%;
		height: 170rpx;
	}
	
	.info-card .card-left {
		width: 74%;
		height: 100%;
	}
	
	.info-card .card-left .img-box {
		width: 30%;
		height: 100%;
	}
	
	.info-card .card-left .text-box {
		width: 70%;
		height: 100%;
		color: white;
	}
	
	.info-card .card-right {
		width: 26%;
		height: 100%;
	}
	
	.menu-list {
		width: 94%;
		height: 160rpx;
		margin-top: -90rpx;
	}
	
	.menu-item {
		height: 160rpx;
	}
	
	.menu-item image {
		width: 64rpx;
		height: 64rpx;
	}
	
	.menu-item text {
		font-size: 15px;
		margin-top: 14rpx;
	}
	
	.func-list {
		width: 100vw;
		margin-top: 30rpx;
		height: 500rpx;
	}
</style>
