<template>
	<view class="container">
		<view class="cover">
			<bottomShare></bottomShare>
		</view>
	</view>
</template>

<script>
	import bottomShare from '@/components/bottomShare.vue';
	export default {
		name:"recommend",
		data() {
			return {
				
			};
		},
		components: {
			bottomShare
		},
	}
</script>

<style>
	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.5);
		z-index: 200;
	}
</style>