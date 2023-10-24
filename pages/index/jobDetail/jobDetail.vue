<template>
	<view class="root-container">
		<navbar class="nav-bar" @clickRight="personalCenter" />
		<view class="job-container">
			<view class="job-title-container">
				<view class="job-title-content">
					<view class="job-name">
						<text class="text-bold">{{jobDetail.title}}</text>
					</view>
					<view class="job-tag">
						<view class="job-tag-container">
							<text v-if="jobDetail.location" class="comment-text">{{jobDetail.location}}</text>
							<text v-if="jobDetail.education" class="comment-text job-tag-space">|</text>
							<text v-if="jobDetail.education" class="comment-text">{{jobDetail.education}}</text>
							<text v-if="jobDetail.category" class="comment-text job-tag-space"> | </text>
							<text v-if="jobDetail.category" class="comment-text">{{jobDetail.category}}</text>
						</view>
						<view class="job-date">
							<img class="job-date-img" src="../../../static/timetubiao.png" alt="">
							<text class="job-date-text"
								v-if="jobDetail.publishDate">{{transitionDate(jobDetail.publishDate)}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 职位描述 -->
			<view class="job-desc-container">
				<view class="job-desc-content">
					<view class="tip-title">
						<text>职位描述</text>
					</view>
					<text class="comment-text">{{jobDetail.description}}</text>
				</view>
			</view>

			<!-- 任职要求 -->
			<view class="job-require-container">
				<view class="job-require-content">
					<view class="tip-title">
						<text>任职要求</text>
					</view>
					<text class="comment-text">{{jobDetail.qualifications}}</text>
				</view>
			</view>

			<!-- 联系方式 -->
			<view class="job-contactway-container">
				<view class="job-contactway-content">
					<view class="tip-title">
						<text>联系方式</text>
					</view>
					<text class="comment-text">{{jobDetail.email}}</text>
				</view>
			</view>

			<!-- 公司信息 -->
			<view class="company-introduction-container">
				<view class="company-introduction-content">
					<img src="../../../static/company_bg.png" alt="" class="company-bg">
					<view class="company-introduction-text">
						<p>上海垣信卫星科技有限公司成立于2018年3月，由上海联和投资有限公司发起设立，致力于成为国际化、商业化卫星产业集团及卫星通信服务商。
						</p>
						<p>垣信卫星采用低成本、高集成、快速迭代的卫品智能制造技术，建设并运营一个由千余颗卫星组成的商业化全球低轨宽带卫星星座，打造覆盖全球的“卫星互联网”新型基础设施，为全球用户提供高速、实时、安全、可靠的空天地海一体化综合性宽带业务服务。
						</p>
					</view>
				</view>
			</view>
		</view>


		<BottomBar class="tabbar" @sendResume="sendResume" :type="jobDetail.status" :jobName="jobDetail.title">
		</BottomBar>

		<input type="file" id="fileInput" style="display: none">
		<PostResumeView class="post-alert" v-if="showPostResume" @uploadResume="onUploadResume"
			@cancelPost="clickCancel" @confirmPost="clickConfirm" :resumeList="resumeList"></PostResumeView>
	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import BottomBar from '@/components/BottomBar.vue';
	import PostResumeView from '../../index/postResume/postResume.vue';
	import {
		jobDetail,
		resumePersonal,
		apply
	} from '@/network/job.js';
	import {
		uploadFile,
		addResume
	} from '@/network/user';
	import ShareView from '@/components/bottomShare.vue';
	import base from '../../../network/baseUrl';
	import Request from '../../../network/request';
	import {
		uploadResume
	} from '../../../pages/user/manageResume/resumeManager.js'

	const requestInstance = new Request();

	export default {
		data() {
			return {
				jobDetail: {},
				tagList: [],
				recruitId: null,
				showPostResume: false,
				resumeList: []
			}
		},
		components: {
			BottomBar,
			PostResumeView,
			ShareView,
			navbar
		},
		onLoad(option) {
			this.recruitId = option.recruitId;
			this.getJobDetail();

			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage"]
			})
		},
		onShareAppMessage(res) {
			return {
				title: this.jobDetail.title
			}
		},
		onShow() {
			if (uni.getStorageSync('token').length > 0) {
				this.getResumeList(true);
			}
		},
		methods: {
			personalCenter() {
				this.isLogin = uni.getStorageSync('token') != null && uni.getStorageSync('token').length > 0;
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
				} else {
					// this.showDropdown = !this.showDropdown;
					uni.navigateTo({
						url: '/pages/user/personalCenter'
					})
				}
			},
			getJobDetail() {
				jobDetail(this.recruitId).then((response) => {
					this.jobDetail = response.data;
				})
			},
			sendResume() {
				let token = uni.getStorageSync('token');
				if (token == null || token.length == 0) {
					// 没登录
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
					return;
				}
				this.showPostResume = true;
			},
			getResumeList(hideLoading) {
				resumePersonal(hideLoading).then((response) => {
					if (response.code == 200) {
						this.resumeList = response.rows;
					}
				})
			},
			clickConfirm(resumeId) {
				this.showPostResume = false;

				if (this.jobDetail.recruitId == null || resumeId == null) {
					this.showToast('参数错误');
					return;
				}
				const params = {
					recruitId: this.jobDetail.recruitId,
					resumeId: resumeId
				}
				apply(params).then((response) => {
					if (response.code == 200) {
						this.showToast('投递成功');
					} else {
						this.showToast(response.msg);
					}
				})
			},
			clickCancel() {
				this.showPostResume = false;
			},
			onUploadResume() {
				uploadResume(this.handleUploadProgress).then((message) => {
					uni.hideLoading({});
					this.showToast('简历上传成功！');
					this.getResumeList(true);
				}).catch((error) => {
					uni.hideLoading({});
					this.showToast(error);
				});
			},
			handleUploadProgress(progress) {
				uni.showLoading({
					title: `上传${progress}%`
				});
			},
			showToast(message) {
				uni.showToast({
					title: message,
					icon: 'none'
				});
			},
			transitionDate(date) {
				// 将日期时间字符串解析为 Date 对象
				const dateTime = new Date(date);
				// 获取年、月、日
				const year = dateTime.getFullYear();
				const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
				const day = dateTime.getDate().toString().padStart(2, "0");
				// 格式化为 "yyyy-MM-dd" 格式
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.comment-text {
		font-size: 14px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #7b7b7b;
	}

	.root-container {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.job-container {
		width: 100%;
		flex: 1;
		overflow: scroll;
		background-color: #f7f7f7;
	}

	.tabbar {
		height: 90px;
	}

	.job-name text {
		font-size: 24px;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-85 Bold;
		font-weight: normal;
		text-align: left;
		color: #181818;
	}

	.job-title-container {
		background-color: white;
	}

	.job-title-content {
		height: 94px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 24px;
		margin-right: 24px;
		border-bottom: 0.5px dashed #e5e5e5;
	}

	.job-tag {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		align-items: center;
		margin-top: 8px;
	}

	.job-tag-space {
		width: 20px;
		text-align: center;
	}

	.job-tag-container {
		display: flex;
		align-items: center;
	}

	.job-date {
		display: flex;
		align-items: center;
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: right;
		color: #acacac;
	}

	.job-date-img {
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}

	.job-desc-container {
		background-color: white;
	}

	.job-desc-content {
		margin-left: 24px;
		margin-right: 24px;
		border-bottom: 0.5px dashed #e5e5e5;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.job-require-container {
		background-color: white;
	}

	.job-require-content {
		background-color: white;
		margin-left: 24px;
		margin-right: 24px;
		padding-top: 20px;
		padding-bottom: 20px;
		border-bottom: 0.5px dashed #e5e5e5;
	}

	.job-contactway-container {
		background-color: white;
	}

	.post-alert {
		position: fixed;
		top: 0;
		bottom: 0;
	}

	.job-contactway-content {
		margin-left: 24px;
		margin-right: 24px;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.company-introduction-container {
		background-color: white;
		height: 220px;
	}

	.company-introduction-content {
		position: relative;
		z-index: 0;

		line-height: 20px;
		font-size: 24rpx;
		line-height: 40rpx;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #181818;
		margin: 10px 24px 0px 24px;
		padding-top: 16px;
		padding-bottom: 20px;
	}

	.company-introduction-text {
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #181818;
		line-height: 40rpx;
		text-indent: 2em;
		white-space: pre-line;
	}


	.company-bg {
		width: 251px;
		height: 192px;
		left: calc((100% - 251px) / 2);
		position: absolute;
		z-index: -1;
	}
</style>