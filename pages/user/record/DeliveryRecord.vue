<template>
	<view class="container">
		<navbar :showRightButton="false">
		</navbar>
		<div class="record-title">
			<view class="text-wrapper">
				<text>应聘记录</text>
			</view>
		</div>
		<div v-if="record.length === 0" class="no-data">
			<p>暂无投递记录</p>
			<button @click="viewAllJobs">查看所有工作机会</button>
		</div>
		<view v-else class="record-list">
			<cell v-for="(jobItem, index) in record" :key="index" :jobName="jobItem.title"
				:status="getStatusWithType(jobItem.recruitState)" :date="jobItem.applyTime"
				:recruitId="jobItem.recruitId" @toCardDetail="toCardDetail">
			</cell>
		</view>

	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import cell from '@/components/DeliveryRecordCell.vue';
	import {
		deliveryRecord,
		recruitDetail
	} from '../../../network/job';

	export default {
		data() {
			return {
				record: []
			}
		},
		components: {
			cell,
			navbar
		},
		methods: {
			getDeliveryRecord() {
				deliveryRecord().then((response) => {
					this.record = response.rows;
				})
			},
			getStatusWithType(type) {
				switch (type) {
					case '0':
						return '已应聘'
					case '1':
						return '面试'
					case '2':
						return '通过'
					case '3':
						return '不通过'
					default:
						return '未知'
				}
			},
			viewAllJobs() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toCardDetail(recruitId) {
				uni.navigateTo({
					url: '/pages/index/jobDetail/jobDetail?recruitId=' + recruitId
				})
			}
		},
		onLoad() {
			this.getDeliveryRecord();
		}
	}
</script>

<style>
	.container {
		background-color: white;
	}

	.title-text {
		height: 44px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-65 Medium;
		font-weight: normal;
		text-align: left;
		color: #181818;
		line-height: 44px;
		margin-left: 12rpx;
		padding: 0px;
	}

	.gongsitubiao {
		height: 30px;
		margin-left: 24px;
		z-index: 12;
		margin-top: 8px;
	}

	.record-title {
		height: 66px;
		width: 100%;
		background-color: white;
	}

	.text-wrapper {
		position: relative;
		border-bottom: 1px solid #ccc;
		margin-left: 24px;
		width: calc(100% - 20px);
		box-sizing: border-box;
		line-height: 66px;
	}

	.record-title>text {
		display: block;
		line-height: 66px;
		font-size: 24px;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-85 Bold;
		font-weight: bold;
		text-align: left;
		color: #181818;
		margin: 0px;
	}

	.no-data {
		height: 222px;
		margin-top: calc(50% - 111px);
		margin-left: 50px;
		margin-right: 50px;
	}

	.no-data p {
		width: 100%;
		height: 24px;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #181818;
		line-height: 20px;
	}

	.no-data button {
		width: 100%;
		height: 50px;
		margin-top: calc(222px - 50px - 24px);
		background: #69a5fe;
		border-radius: 25px;
		color: white;
	}

	.record-list {
		width: 100%;
		height: 100px;
	}
</style>