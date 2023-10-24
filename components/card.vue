<template>
	<view class="card-container" @click="toCardDetail">
		<view class="job-name">
			<span v-for="(segment, index) in getHighlightedSegments(jobName)" :key="index"
				:class="segment.highlighted ? 'highlight-text' : 'non-highlight-text'">
				{{ segment.text }}
			</span>
		</view>
		<view class="tag-container">
			<view class="tag-list">
				<text v-if="place" class="comment-text">{{place}}</text>
				<text v-if="education" class="comment-text job-tag-space">|</text>
				<text v-if="education" class="comment-text">{{education}}</text>
				<text v-if="category" class="comment-text job-tag-space"> | </text>
				<text v-if="category" class="comment-text">{{category}}</text>
			</view>
			<view v-if="date" class="tag-date" style="display: flex;">
				<image src="../static/timetubiao.png" mode="aspectFit" class="uni-image-size"></image>
				<text>{{ transitionDate(date) }}</text>
			</view>
		</view>
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
			tagList: {
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
			jobSalary: {
				type: String,
				default: ''
			},
			place: {
				type: String,
				default: ''
			},
			userName: {
				type: String,
				default: ''
			},
			offerDate: {
				type: String,
				default: ''
			},
			education: {
				type: String,
				default: ''
			},
			category: {
				type: String,
				default: ''
			},
			jobItem: {
				type: Object,
				default: null
			},
			searchText: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			toCardDetail: function() {
				this.$emit('toCardDetail', this.jobItem);
			},
			getHighlightedSegments(text) {
				if (!this.searchText || text == null) {
					return [{
						text,
						highlighted: false
					}];
				}

				const pattern = new RegExp(this.searchText, 'gi');
				const segments = [];
				let lastIndex = 0;
				let match;

				while ((match = pattern.exec(text)) !== null) {
					segments.push({
						text: text.slice(lastIndex, match.index),
						highlighted: false
					});
					segments.push({
						text: match[0],
						highlighted: true
					});
					lastIndex = match.index + match[0].length;
				}

				segments.push({
					text: text.slice(lastIndex),
					highlighted: false
				});

				return segments;
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

<style scoped>
	.card-container {
		background-color: white;
		width: 100%;
		height: 96px;
		display: flex;
		align-content: flex-start;
		flex-wrap: wrap;
	}

	.job-name {
		margin-top: 16px;
		margin-left: 24px;
		height: 25px;
		width: 80%;
	}

	.tag-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: calc(96px - (16px + 25px));
		margin-left: 24px;
		width: calc(100% - 24px);
		border-bottom: 0.5px solid #ccc;
	}

	.tag-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.comment-text {
		color: #606266;
		font-size: 12px;
	}

	.tag-list .tag-item:first-of-type {
		margin-left: 0;
	}

	.tag-date {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 24px;
		width: 95px;
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		text-align: right;
		color: #acacac;
	}

	.uni-image-size {
		width: 14px;
		height: 14px;
	}

	.highlight-text {
		color: #69a5fe;
	}

	.non-highlight-text {
		color: black;
	}

	.job-tag-space {
		width: 20px;
		text-align: center;
	}
</style>