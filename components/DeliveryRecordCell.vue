<template>
	<view class="re-card bg-white" @click="toCardDetail">
		<view class="job-name">
			<text class="job-name-text">{{jobName}}</text>
		</view>
		<view class="bottom-container">
			<view class="status-container">
				<image src="../static/checkbox_selected.png" mode="aspectFit" class="job-status-image"></image>
				<text class="job-status-text">{{status}}</text>
			</view>
			<view class="date-container">
				<image src="../static/timetubiao.png" mode="aspectFit" class="job-date-image"></image>
				<text class="job-date-text">{{transitionDate(date)}}</text>
			</view>
		</view>
		<div class="dashed-border"></div>
	</view>
</template>

<script>
	export default {
		name: 'card',
		props: {
			jobId: {
				type: String,
				default: ''
			},
			date: {
				type: String,
				default: ''
			},
			jobName: {
				type: String,
				default: ''
			},
			status: {
				type: String,
				default: ''
			},
			recruitId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			transitionDate(date) {
				// 将日期时间字符串解析为 Date 对象
				const dateTime = new Date(date);
				// 获取年、月、日
				const year = dateTime.getFullYear();
				const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
				const day = dateTime.getDate().toString().padStart(2, "0");
				// 格式化为 "yyyy-MM-dd" 格式
				return `${year}-${month}-${day}`;
			},
			toCardDetail: function() {
				this.$emit('toCardDetail', this.recruitId);
			}
		}
	}
</script>

<style scoped>
	.re-card {
		/* position: relative; */
		width: 100vw;
		min-height: 170rpx;
		max-height: 370rpx;
	}

	.card-top {
		width: 96%;
		height: 80rpx;
		line-height: 80rpx;
	}

	.card-top .job-name {
		width: 80%;
	}

	.job-name-text {
		display: inline-block;
		font-size: 18px;
		font-family: PingFang SC, PingFang SC-Medium;
		text-align: left;
		color: #181818;
		margin: 16px 24px 0px 24px;
	}

	.bottom-container {
		height: 25px;
		margin: 20px 24px 19px 24px;
	}

	.status-container {
		width: 100px;
		height: 25px;
		float: left;
		line-height: 25px;
	}

	.job-status-image {
		width: 14px;
		height: 14px;
		overflow: auto;
	}

	.job-status-text {
		font-size: 14px;
		font-family: PingFang SC, PingFang SC-Regular;
		text-align: left;
		color: #7b7b7b;
		margin-left: 5px;
	}

	.date-container {
		height: 25px;
		float: right;
		line-height: 25px;
	}

	.job-date-image {
		width: 10px;
		height: 10px;
		/* vertical-align: middle; */
		overflow: auto;
	}

	.job-date-text {
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		line-height: 25px;
		float: right;
		margin-left: 5px;
		color: #acacac;
	}

	.dashed-border {
		bottom: 0;
		left: 24px;
		right: 0px;
		/* width: calc(100% - 24px); */
		height: 1px;
		border-bottom: 1px dashed #ddd;
		/* 虚线样式 */
	}
</style>