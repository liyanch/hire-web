<template>
	<view class="container bg-white flex-column align-center">
		<view class="menu-list">
			<reList :icon="'../static/xieyi.png'" :name="'平台协议'"></reList>
		</view>
		<view class="re-btn bg-red text-white re-btn-lg">
			退出登录
		</view>
	</view>
</template>

<script>
	import reList from '@/components/listItem.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			reList
		},
		methods: {
			
		}
	}
</script>

<style>
	.menu-list {
		width: 100%;
		height: auto;
	}
	
	.re-btn {
		margin-top: 100rpx;
	}
</style>
