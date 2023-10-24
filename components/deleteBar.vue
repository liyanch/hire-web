<template>
	<view class="add-project" @click="deleteProject()">
		<view class="">
			<img src="../static/shanchu.png" style="width: 48rpx; height: 48rpx;" alt="">
		</view>
		<view class="delete-content">
			<text>删除内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			showRightButton: {
				type: Boolean,
				default: true
			},
		},
		methods: {
			rightButtonOnClick() {
				this.$emit('clickRight')
			},
			deleteProject() {
				this.$emit('deleteProject')
			}
		}
	}
</script>

<style scoped>
	
	.add-project {
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-top: 20rpx;
		background-color: #fff;
		border-top: 1rpx solid rgba(0, 0, 0, 0.10);
	}

	.delete-content {
		opacity: 0.9;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #b2b2b2;
		margin-left: 20rpx;
	}
</style>