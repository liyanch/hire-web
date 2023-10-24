<template>
	<view class="container" style="background-color: #f7f7f7;">
		<navbar :showRightButton="false" class="nav"></navbar>
		<view class="online">
			<view class="">
				<view class="resume-text">在线简历</view>
				<view class="time-text">{{ onlineResume != null ? onlineResume.updateTime : ''}}
					{{ onlineResume != null ? '更新' : '填写'}}
				</view>
			</view>
			<view class="tubiao">
				<view class="tubiao-edit tubiao-container" @click="editOnlineResume">
					<img src="../../../static/tianxie.png" alt="" class="tubiao-img">
				</view>
				<view v-if="onlineResume != null" class="tubiao-delete tubiao-container"
					@click="deleteOnlineResume(onlineResume.resumeId)">
					<img src="../../../static/shanchu.png" alt="" class="tubiao-img">
				</view>
			</view>
		</view>

		<view class="resume-record-container">
			<view class="resume-att-record" v-for="(resume, index) in resumeList" :key="resume.resumeId">
				<view class="resume-icon">
					<img :src="getResumeIcon(resume.resumeName)" alt="">
				</view>
				<view class="resume-info">
					<view class="resume-name-text">{{resume.resumeName}}</view>
					<view class="time-text">{{ resume.updateTime != null ? resume.updateTime : ''}} 更新</view>
				</view>
				<view class="resume-right-img tubiao-container tubiao-delete"
					@click="deleteAttachmentResume(resume.resumeId)">
					<img src="../../../static/shanchu.png" alt="" class="tubiao-img">
				</view>
			</view>
		</view>


		<view class="resume-record" @click="onUploadResume">
			<img src="../../../static/add.png" alt="" class="upload-icon">
			<view class="upload-text">上传简历</view>
			<input type="file" id="fileInput" style="display: none">
		</view>
		<view class="bottom-text">请上传jpg、png、doc、docx、pdf格式的简历，大小不超过20M</view>
		<view class="alert-container" v-if="showAlert">
			<view class="alert-mask">

			</view>

			<view class="alert-button-container">
				<view class="cancel" @click="cancelDelete">取消</view>
				<view class="alert-space"></view>
				<view class="confirm" @click="confirmDelete">确认删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import {
		resumePersonal
	} from '@/network/job.js';
	import HttpRequest from 'uview-ui/libs/luch-request';
	import {
		addResume,
		deleteResume,
		uploadFile
	} from '../../../network/user';

	import {
		uploadResume
	} from './resumeManager.js'


	export default {
		data() {
			return {
				resumeList: [],
				onlineResume: null,
				showAlert: false,
				deleteResumeId: null
			}
		},
		components: {
			navbar
		},
		onLoad() {
			this.getResumeList(false);
		},
		methods: {
			activeSelect: function(index) {
				if (this.industryList[index].active == true) {
					this.industryList[index].active = false;
				} else {
					this.industryList[index].active = true;
				}
			},
			getResumeList(hideLoading) {
				this.resumeList = [];
				resumePersonal(hideLoading).then((response) => {
					if (response.code == 200) {
						for (let i = 0; i < response.rows.length; i++) {
							if (response.rows[i].type == '1') {
								this.onlineResume = response.rows[i];
							} else {
								this.resumeList.push(response.rows[i]);
							}
						}
					}
				})
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
			deleteAttachmentResume(resumeId) {
				this.showAlert = true;
				this.deleteResumeId = resumeId;
			},
			deleteOnlineResume(resumeId) {
				this.showAlert = true;
				this.deleteResumeId = resumeId;
			},
			editOnlineResume() {
				const self = this;
				uni.navigateTo({
					url: '/pages/index/resumeSubmit/resumeSubmit',
					success: function(res) {
						if (typeof(self.onlineResume) != 'undefined' && self.onlineResume != null) {
							res.eventChannel.emit('pushData', self.onlineResume);
						} else {
							res.eventChannel.emit('pushData', null);
						}
					}
				})
			},
			confirmDelete() {
				this.showAlert = false;
				deleteResume(this.deleteResumeId).then((response) => {
					this.getResumeList(false);
				})
			},
			cancelDelete() {
				this.showAlert = false;
			},
			getResumeIcon(url) {
				if (url == null) {
					return '../../../static/file.png';
				}
				const filename = url.split('/').pop();
				const extension = filename.split('.').pop();

				if (['png'].includes(extension)) {
					return '../../../static/att_png.png';
				} else if (['doc', 'docx'].includes(extension)) {
					return '../../../static/att_doc.png';
				} else if (['pdf'].includes(extension)) {
					return '../../../static/att_pdf.png';
				} else if (['jpg', 'jpeg'].includes(extension)) {
					return '../../../static/att_jpg.png';
				} else {
					return '../../../static/file.png';
				}
			}
		}
	}
</script>

<style scoped>
	.online {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 16px;
		background-color: #fff;
		width: 100%;
		height: 164rpx;
		padding-left: 32px;
		padding-right: 10px;
	}

	.tubiao {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 56rpx;
	}

	.tubiao-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 40px;
		/* background-color: green; */
	}

	.tubiao-img {
		width: 12px;
		height: 12px;
	}

	.tubiao-edit {
		/* margin-right: 28px; */
	}

	.resume-record-container {
		margin-top: 32rpx;
	}

	.resume-att-record {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		align-items: center;
		align-items: center;
		background-color: #fff;
		width: 100%;
		height: 82px;
		padding-left: 32px;
		padding-right: 10px;
		/* border-bottom: 0.5px solid #ccc; */
		border: 0.5px dashed #dddddd;
	}

	.resume-record {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		/* justify-content: space-between; */
		align-items: center;
		margin-top: 32rpx;
		background-color: #fff;
		width: 100%;
		height: 164rpx;
		padding-left: 32px;
		padding-right: 10px;
	}

	.upload-icon {
		width: 26px;
		height: 26px;
	}

	.upload-text {
		margin-left: 14px;
		height: 25px;
		font-size: 18px;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #69a5fe;
	}

	.resume-icon {
		height: 40px;
	}

	.resume-icon img {
		width: 40px;
		height: 40px;
	}

	.resume-info {
		margin-left: 19px;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.resume-right-img {
		width: 50px;
	}

	/* .resume-img {
		display: flex;
		flex-direction: row;
	} */

	/* .resume-text {
		font-size: 36rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: left;
		color: #181818;
	} */

	.resume-name-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.time-text {
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #acacac;
		margin-top: 16rpx;
	}

	/deep/ .uni-navbar__header-container {
		overflow: inherit;
	}

	/deep/ .container {
		background-color: #f7f7f7;
	}

	.head-top {
		width: 100%;
		height: 120rpx;
		font-weight: 500;
		line-height: 120rpx;
	}

	.main {
		width: 100%;
	}

	.gongsitubiao {
		height: 30px;
		width: 46px;
		margin-left: -55px;
		z-index: 2;
		margin-top: 8px;
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
	}

	.list-array {
		width: 100%;
		height: auto;
	}

	.list-array .industry-item {
		width: 94%;
		height: auto;
		background-color: #F1F2F6;
	}

	.list-array .industry-item .main-name {
		width: 100%;
		height: 100rpx;
		position: relative;
		border-radius: 10rpx 10rpx 0 0;
	}

	.selectStyle {
		/* border-bottom: 1px solid #606266; */
		background-color: #4B7BEC;
		color: white;
		transition: all .2s linear;
	}

	.selectStyle text:last-of-type {
		transform: rotate(90deg);
		transition: all .2s linear;
	}

	.list-array .industry-item .main-name text:last-of-type {
		position: absolute;
		right: 20rpx;
	}

	.list-array .industry-item .name-list {
		width: 100%;
		height: auto;
	}

	.list-array .industry-item .name-list .name-item {
		width: 100%;
		height: 90rpx;
		position: relative;
	}

	.list-array .industry-item .name-list .name-item .fa-check-circle {
		position: absolute;
		right: 20rpx;
	}

	.bottom-text {
		height: 27px;
		line-height: 27px;
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: center;
		color: #acacac;
	}

	.alert-container {
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

	.alert-mask {
		height: calc(100% - 98px);
	}

	.alert-button-container {
		display: flex;
		justify-content: space-between;
		background-color: white;
		height: 98px;
	}


	.cancel {
		margin-top: 6px;
		margin-left: 24px;
		flex: 1;
		height: 55px;
		line-height: 55px;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #69A5FE;
		border-radius: 58rpx;
		border: 1rpx solid #69a5fe;
	}

	.alert-space {
		width: 14px;
	}

	.confirm {
		margin-top: 6px;
		margin-right: 24px;
		flex: 1;
		height: 55px;
		line-height: 55px;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #fff;
		border-radius: 58rpx;
		background-color: #69A5FE;
	}
</style>