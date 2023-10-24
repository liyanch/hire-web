<template>
	<view class="nav-container">
		<img src="../static/logo.png" alt="" class="nav-logo">
		<view class="nav-title-container">
			<img src="../static/nav-title.png" alt="" class="nav-title">
		</view>
		<view class="nav-right-container" @click="rightButtonOnClick">
			<img src="../static/home-user.png" alt="" class="nav-right-button" v-if="showRightButton">
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
			}
		}
	}
</script>

<style scoped>
	.nav-container {
		height: 44px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: white;
		border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);
	}

	.nav-title-container {
		display: flex;
		flex: 1;
		align-items: center;
		margin-left: 9px;
	}

	.nav-title {
		width: 63px;
		height: 22px;
	}

	.nav-logo {
		height: 30px;
		width: 46px;
		margin-left: 24px;
		z-index: 2;
		margin-top: 8px;
	}

	.nav-right-container {
		margin-right: 24px;
		width: 44px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.nav-right-button {
		width: 22px;
		height: 18px;
	}
</style>