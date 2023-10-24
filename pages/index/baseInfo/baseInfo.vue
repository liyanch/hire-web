<template>
	<view class="container">
		<view class="main">
			<navbar style="border-bottom: 1px solid #ddd;">
			</navbar>
			<view class="experience" style="margin-bottom: 1px solid #ddd;">
				<view>
					<text class="baseText">基本信息</text>
					<view class="example">
						<!-- 基础表单校验 -->
						<!-- :rules="rules" -->
						<uni-forms ref="valiForm" :modelValue="valiFormData" :rules="rules">
							<uni-forms-item label="姓名" required name="name">
								<uni-easyinput v-model="valiFormData.name" placeholder="请输入" />
							</uni-forms-item>
							<uni-forms-item label="邮箱" required name="email">
								<uni-easyinput v-model="valiFormData.email" placeholder="请输入"
									@input="binddata('email',$event)" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</view>
			</view>
			<view class="flex-center">
				<view class="confirmButton" @click="submitBasicInfo">
					<text class="botton-text">确定</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import navbar from '@/components/nav.vue';
	import {
		supply
	} from '@/network/user.js';
	export default {
		data() {
			return {
				rules: {
					name: [{
						required: true,
						message: "请输入姓名"
					}],
					email: [{
							required: true,
							message: "请输入邮箱"
						},
						{
							type: "email",
							message: "邮箱格式不正确"
						}
					]
				},
				valiFormData: {
					name: '',
					email: ''
				}
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		components: {
			navbar
		},
		onLoad() {},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			submitBasicInfo() {
				if (this.valiFormData.name.length == 0) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					});
					return
				}
				const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
				if (!emailRegex.test(this.valiFormData.email)) {
					uni.showToast({
						title: '请输入正确的邮箱',
						icon: 'none'
					});
					return
				}
				const params = {
					realName: this.valiFormData.name,
					email: this.valiFormData.email
				}
				supply(params).then((response) => {
					if (response.code == 200) {
						this.basicInfoData = response.data;
						uni.navigateBack({
							delta: 2 // 返回一个页面
						});
					} else {
						uni.showToast({
							title: response.msg,
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style>
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.confirmButton {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 640rpx;
		height: 100rpx;
		background-color: #69a5fe;
		border-radius: 25px;
	}

	.botton-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #ffffff;
		line-height: 40rpx;
	}

	/deep/ .uni-easyinput {
		width: 260px;
	}

	/deep/ .uni-section {
		height: 100vh;
	}

	.baseText {
		font-size: 48rpx;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-85 Bold;
		font-weight: normal;
		text-align: left;
		color: #181818;
		margin-left: 30rpx;
	}

	.experience {
		margin-top: 32rpx;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}

	.main {
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
	}

	/deep/ .uni-navbar__header {
		border-bottom: 1px solid #ddd;
	}

	/deep/ .uni-navbar__header-container {
		overflow: inherit;
	}

	.gongsitubiao {
		height: 30px;
		margin-left: -55px;
		z-index: 2;
		margin-top: 8px;
	}

	.company-introduction {
		margin-top: 20rpx;
		margin-bottom: 60rpx;
		background-color: #fff;
		padding: 32rpx 48rpx;
	}

	.company-introduction-text {
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #181818;
		line-height: 40rpx;
	}

	.card-box {
		width: 94%;
	}

	.title-text {
		height: 44px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-65 Medium;
		font-weight: normal;
		text-align: left;
		color: #181818;
		line-height: 44px;
		margin-left: 12px;
		/* border-bottom: 1px solid #ddd; */
	}

	.text-decoration {
		padding: 0 5px;
	}

	.qualifications-text {
		width: 280rpx;
		height: 98px;
		opacity: 0.5;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #000000;
		line-height: 20px;
		white-space: wrap;
	}

	.basic-info {
		/* height: 270rpx; */
	}

	.job-intro {
		width: 94%;
		height: auto;
		margin-bottom: 160rpx;
	}

	.job-intro .intro {
		width: 94%;
		height: auto;
		line-height: 50rpx;
		margin-bottom: 20rpx;
	}

	.container>>>.re-bottom {
		position: fixed;
		bottom: 0;
		padding-bottom: 10px;
	}

	.re-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 134rpx;
		border-radius: 20rpx 20rpx 0 0;
		padding: 12rpx 48rpx;
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
</style>