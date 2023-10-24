<template>
	<view class="container" :class="{fixStyle: hasMask}">
		<!-- 顶部操作栏 -->
		<view class="header-bar bg-white flex-column align-center">
			<!-- 搜索组件 -->
			<searchBar class="margin-top-sm" ref="searchKey" @searchClick="toSearch"></searchBar>
			
			<!-- 条件筛选栏 -->
			<view class="condition-bar flex-row text-gray">
				<view class="bar-item" v-for="(barItem, index) in barList" :key="index"
				@click="chooseBar(index)" :class="{active: currentBar == index}">
					<text>{{barItem}}</text>
					<text class="fa fa-angle-down margin-left-xs"></text>
				</view>
			</view>
		</view>
		
		<!-- 列表显示区域 -->
		<scroll-view scroll-y="true" class="main">
			<view class="job-list flex-column align-center">
				<card v-for="(jobItem, index) in jobList" :key="index"
				:jobName="jobItem.job_name"
				:jobSalary="jobItem.job_salary"
				:tagList="jobItem.job_tag"
				:place="jobItem.job_place"
				:userAvatar="jobItem.user_avatar"
				:userName="jobItem.user_name"
				:date="jobItem.job_date">
				</card>
			</view>
		</scroll-view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-show="hasMask">
			<!-- 根据第五筛选 -->
			<view class="box bg-white place-select flex-row" 
			v-show="currentBar == 0">
				<scroll-view scroll-y="true" enable-flex="true" class="city-list">
					<view class="city-item text-center" v-for="(cityItem, index) in cityList" :key="index">
						<text>{{cityItem}}</text>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" enable-flex="true" class="zone-list">
					<view class="zone-item text-center" v-for="(zoneItem, index) in currentZoneList" :key="index" >
						<text>{{zoneItem}}</text>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" enable-flex="true" class="twon-list">
					<view class="twon-item text-center" v-for="(twonItem, index) in currentTwonList" :key="index" >
						<text>{{twonItem}}</text>
					</view>
				</scroll-view>
			</view>
			<!-- 根据薪资筛选 -->
			<view class="box bg-white salary-select flex-column align-center"
			v-show="currentBar == 1">
				<view class="quick-bar margin-top-sm">
					<view class="quick-item radius-xs text-center text-xs"
					 v-for="(quickItem, index) in quickList" :key="index"
					 @click="saSelect(index)" :class="{activeBar: currentSa == index}">
						<text>{{quickItem}}</text>
					</view>
				</view>
			</view>
			<!-- 根据学历 经验筛选 -->
			<view class="box bg-white more-select flex-column align-center"
			v-show="currentBar == 2">
				<view class="experience flex-column">
					<view class="head-title">
						<text>经验要求</text>
					</view>
					<view class="experience-bar grid col-4">
						<view class="experience-item radius-xs text-center text-xs" 
						v-for="(experienceItem, index) in experienceList" :key="index"
						@click="exSelect(index)" :class="{activeBar: currentEx == index}">
							<text>{{experienceItem}}</text>
						</view>
					</view>
				</view>
				<view class="education flex-column">
					<view class="head-title">
						<text>学历要求</text>
					</view>
					<view class="education-bar grid col-4">
						<view class="education-item radius-xs text-center text-xs" 
						v-for="(educationItem, index) in educationList" :key="index"
						@click="edSelect(index)" :class="{activeBar: currentEd == index}">
							<text>{{educationItem}}</text>
						</view>
					</view>
				</view>
				<view class="re-btn bg-blue margin-top-xl" @click="submitSelect">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchBar from '@/components/searchBar.vue';
	import card from '@/components/card.vue';
	export default {
		data() {
			return {
				barList: ['地区选择', '薪资选择', '更多条件'],
				jobList: [
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02'
					},
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02'
					},
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02'
					},
					{
						job_name: '欧菲光电子厂流水线工人',
						job_salary: '3-4K',
						job_tag: [
							{
								name: '经验不限'
							},
							{
								name: '无限一金'
							},
							{
								name: '带薪休假'
							},
							{
								name: '八小时工作制'
							}
						],
						job_place: '南昌市青山湖区',
						user_name: '杨先生 人事部经理',
						user_avatar: '../static/success.png',
						job_date: '2020-09-02'
					}
				],
				currentBar: -1,
				hasMask: false,
				cityList: [
					'南昌市',
					'赣州市',
					'吉安市',
					'抚州市',
					'上饶市',
					'景德政'
				],
				currentZoneList: [
					'高新技术开发区',
					'东湖区',
					'西湖区',
					'青山湖区',
					'红谷滩新区'
				],
				zoneList: [
					[
						'高新技术开发区',
						'东湖区',
						'西湖区',
						'青山湖区',
						'红谷滩新区'
					],
					[
						'章贡区',
						'南康区',
						'赣县区'
					]
				],
				currentTwonList: [
					'麻丘镇',
				],
				quickList: [
					'不限',
					'1-2k',
					'2-3k',
					'3-4k',
					'4-5k',
					'5-6k',
					'6-7k',
					'7-8k',
					'8-9k',
					'9-10k',
					'10-12k',
					'12k-20k'
				],
				experienceList: [
					'无经验',
					'1-2年',
					'2-3年',
					'3-4年',
					'5-6年',
					'6-9年',
					'10年以上'
				],
				educationList: [
					'无要求',
					'初中及以下',
					'高中',
					'专科',
					'本科',
					'研究生',
					'硕士',
					'博士'
				],
				currentEd: -1,
				currentEx: -1,
				currentSa: -1,
				
				
			}
		},
		components: {
			searchBar,
			card,
		},
		methods: {
			toSearch:function() {
				uni.showToast({
					title: this.$refs.searchKey.key_word,
					icon: 'none',
					duration: 2000
				})
			},
			chooseBar:function(index) {
				if (this.currentBar == index) {
					// 选中后再次点击 选中状态将失效
					this.currentBar = -1;
					this.hasMask = false;
				}
				else {
					this.currentBar = index;
					this.hasMask = true;
				}
			},
			submitSelect() {
				this.currentBar = -1;
				this.hasMask = false
			},
			exSelect(index) {
				if (this.currentEx == index) {
					this.currentEx = -1;
				}
				else {
					this.currentEx = index;
				}
			},
			edSelect(index) {
				if (this.currentEd == index) {
					this.currentEd = -1;
				}
				else {
					this.currentEd = index;
				}
			},
			saSelect(index) {
				if (this.currentSa == index) {
					this.currentSa = -1;
				}
				else {
					this.currentSa = index;
				}
			},
			
		}
	}
</script>

<style>
	.container {
		height: 100vh;
	}
	
	.header-bar {
		width: 100vw;
		height: 180rpx;
		border-bottom: 1px solid #f1f2f6;
	}
	
	.condition-bar {
		width: 94vw;
		height: 88rpx;
		justify-content: space-between;
		line-height: 88rpx;
	}
	
	.active {
		color: #4B7BEC;
	}
	
	.active text:last-of-type {
		transform: rotate(180deg);
		transition: all .2s linear;
	}
	
	.fixStyle {
		position: fixed;
	}
	
	.main {
		width: 100vw;
		height: calc(100vh - 180rpx);
	}
	
	.main .job-list {
		width: 100%;
		height: auto;
	}
	
	card:last-of-type {
		margin-bottom: 30rpx;
	}
	
	.mask {
		height: calc(100vh - 180rpx);
		position: fixed;
		top: 180rpx;
		z-index: 999;
	}
	
	.mask .box {
		width: 100%;
		position: fixed;
		top: 180rpx;
	}
	
	.place-select {
		height: calc(100vh - 180rpx);
	}
	
	.city-list, .zone-list, .twon-list {
		height: 100%;
	}
	
	.city-list {
		flex: 2;
		border-right: 1px solid #F1F2F6;
	}
	
	.city-list .city-item,
	.zone-list .zone-item,
	.twon-list .twon-item {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.zone-list {
		flex: 3;
		border-right: 1px solid #F1F2F6;
	}
	
	.twon-list {
		flex: 2;
	}
	
	.salary-select {
		height: 360rpx;
	}
	
	.salary-select .quick-bar {
		width: 94vw;
		height: 256rpx;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20rpx;
	}
	
	.salary-select .quick-bar .quick-item {
		height: 72rpx;
		border: 1px solid #f1f2f6;
		line-height: 72rpx;
	}
	
	.more-select {
		height: 620rpx;
	}
	
	.more-select .experience, .education {
		width: 94vw;
	}
	
	.more-select .head-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.experience .experience-bar,
	.education .education-bar {
		grid-gap: 20rpx;
	}
	
	.experience .experience-bar .experience-item,
	.education .education-bar .education-item {
		height: 72rpx;
		line-height: 72rpx;
		border: 1px solid #f1f2f6;
	}
	
	.more-select .re-btn {
		width: 94vw;
		height: 80rpx;
		color: white;
	}
</style>
