<template>
	<view class="min-height container">
		<view class="cover">
			<view class="re-bottom bg-white shadow-sm flex-column">
				<view class="top">
					<text class="top-text" @click="clickToRecommend">投递简历</text>
				</view>
				<!-- 根据是否有简历来判断展示 -->
				<!-- 有简历的情况 -->
				<view v-if="resumeList.length > 0">
					<view class="resume-list-container">
						<radio-group style="width: 100%;" v-model="selectedResume" @change="onRadioChange">
							<view class="flex-have-resume" v-for="(resume, index) in resumeList" :key="resume.resumeId">
								<view class="resume-cell">
									<span class="resume-name-text">
										{{ resume.type == '1' ? '在线简历' : resume.resumeName }}
									</span>
									<radio :value="resume.resumeId.toString()" color="#69A5FE"
										style="transform: scale(0.7);" />
								</view>
							</view>
						</radio-group>
					</view>
					<view class="gap"></view>
					<view class="write-resume">
						<view class="flex-resume" @click="toManageResume">
							<view>简历管理</view>
							<view>
								<img src="../../../static/dayu.png" alt="" class="arrow-img">
							</view>
						</view>
					</view>
					<view class="gap"></view>
					<view class="bottom-botton">
						<view class="button-container">
							<text class="cancel" @click="clickCancel">取消</text>
							<text class="confirm" @click="clickConfirm">确认</text>
						</view>
					</view>
				</view>
				<!-- 无简历的情况 -->
				<view v-else>
					<view class="write-resume">
						<view class="flex-resume" @click="uploadResume">
							<view>上传简历</view>
							<img src="../../../static/recommend_img.png" alt="" class="hot-img">
							<view class="upload-resume-right">
								<span style="margin-right: 5px;">20M以内</span>
								<img src="../../../static/dayu.png" alt="" class="arrow-right-img">
							</view>
						</view>
						<view class="flex-resume" @click="toOnlineResume">
							<view>在线填写简历</view>
							<view>
								<img src="../../../static/dayu.png" alt="" class="arrow-right-img">
							</view>
						</view>
					</view>
					<view class="gap"></view>
					<view class="right-botton">
						<text class="cancel-single-button" @click="clickCancel">取消</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bottomShare from '@/components/bottomShare.vue';
	export default {
		name: "postResume",
		data() {
			return {
				hasResume: true,
				selectedResume: null
			};
		},
		components: {
			bottomShare
		},
		methods: {
			toOnlineResume() {
				uni.navigateTo({
					url: '/pages/index/resumeSubmit/resumeSubmit'
				})
			},
			uploadResume() {
				this.$emit('uploadResume');
			},
			toManageResume() {
				uni.navigateTo({
					url: '/pages/user/manageResume/manageResume'
				})
			},
			clickCancel() {
				this.$emit('cancelPost');
			},
			clickConfirm() {
				if (this.selectedResume == null) {
					uni.showToast({
						title: '请选择简历',
						icon: 'none'
					});
					return;
				}
				this.$emit('confirmPost', this.selectedResume);
			},
			onRadioChange(event) {
				for (let i = 0; i < this.resumeList.length; i++) {
					if (this.resumeList[i].resumeId.toString() === event.detail.value) {
						this.selectedResume = this.resumeList[i].resumeId;
						break;
					}
				}
			}
		},
		props: {
			resumeList: {
				type: Array,
				default: null
			}
		}
	}
</script>

<style>
	.min-height {
		/* min-height: calc(100vh - 88rpx); */
		height: 100%;
		width: 100%;
	}

	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 200;
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
	}

	.re-bottom {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		width: 100vw;
		border-radius: 20rpx 20rpx 0 0;
	}

	.top {
		width: 100%;
		text-align: center;
		border-bottom: 1rpx solid rgba(0, 0, 0, .1);
		padding: 16rpx 0;
	}

	.top-text {
		height: 24px;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #acacac;
	}

	.write-resume {
		display: flex;
		flex-direction: column;
	}

	.font-color {
		color: #69A5FE;
	}

	.resume-list-container {
		display: flex;
		flex-direction: column;
		color: #69A5FE;
		max-height: 300px;
		overflow: scroll;
	}

	.flex-resume {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		height: 56px;
		line-height: 56px;
		color: #000000;
		margin: 0 48rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, .1);
	}

	.hot-img {
		margin-left: 5px;
		width: 41px;
		height: 17px;
	}

	.flex-have-resume {
		display: flex;
		width: 100%;
		justify-content: space-between;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		height: 66px;
		line-height: 56px;
		color: #000000;
		padding: 0 24rpx;
	}

	.resume-name-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #69a5fe;
		max-width: 85%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gap {
		height: 32rpx;
		background: #f7f7f7;
	}

	.arrow-img {
		width: 8px;
		height: 13px;
	}

	.cancel {
		width: 160px;
		height: 55px;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #69A5FE;
		line-height: 110rpx;
		border-radius: 58rpx;
		border: 1rpx solid #69a5fe;
		flex: 1;
		margin-right: 10px;
	}

	.cancel-single-button {
		width: 85%;
		height: 55px;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #69A5FE;
		line-height: 110rpx;
		border-radius: 58rpx;
		border: 1rpx solid #69a5fe;
	}

	.confirm {
		width: 160px;
		height: 55px;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #fff;
		line-height: 110rpx;
		border-radius: 58rpx;
		background-color: #69A5FE;
		flex: 1;
	}

	.left-botton {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 110rpx;
		border-bottom: 4rpx solid #f1f1f1;

	}

	.left-botton-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #69a5fe;
		line-height: 40rpx;
		flex: 1;
	}

	.right-botton {
		display: flex;
		justify-content: center;
		margin-top: 12rpx;
		height: 196rpx;
	}

	.bottom-botton {
		display: flex;
		justify-content: space-around;
		margin-top: 12rpx;
		height: 196rpx;
	}

	.button-container {
		height: 55px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-left: 24px;
		margin-right: 24px;
		margin-top: 6px;
	}

	.right-botton-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #181818;
	}

	.resume-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: nowrap;
		width: 100%;
		height: 66px;
		border-bottom: 0.5px solid #ccc;
	}

	.upload-resume-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex: 1;
	}

	.upload-resume-right span {
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #acacac;
	}

	.arrow-right-img {
		width: 7px;
		height: 13px;
	}
</style>