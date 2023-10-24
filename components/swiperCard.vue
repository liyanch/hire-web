<template>
	<view :style="{ width: screenWidth + 'px', height: bannerHeight + 'px' }">
		<swiper :style="{ width: screenWidth + 'px', height: bannerHeight + 'px' }" indicator-dots="true"
			circular="true" autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(swiperItem,index) in swiperList" :key="index">
				<image class="swiper_img" :src="swiperItem"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'swiperCard',
		props: {
			swiperList: {
				type: Array,
				default () {
					return [
						'../static/banner1.png'
					]
				}
			}
		},
		data() {
			return {
				screenWidth: 0,
				aspectRatio: 428 / 180,
				bannerHeight: 0
			};
		},
		methods: {

		},
		mounted() {
			const vc = this;
			uni.getSystemInfo({
				success(res) {
					vc.screenWidth = res.windowWidth;
					vc.bannerHeight = vc.screenWidth / vc.aspectRatio;
				}
			})

		}
	}
</script>

<style>
	.swiper_img {
		width: 100%;
		height: 100%;
	}
</style>