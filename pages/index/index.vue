<template>
	<view class="container flex-column align-center">
		<navbar class="nav-bar" @clickRight="personalCenter"></navbar>
		<swiperCard></swiperCard>
		<view class="job-background">
			<view class="job-category">
				<view class="grid-item-box" style="background-color: #69A5FE;" @click="toCategorySelect">
					<uni-icons type="list" size="20" color="#FFFFFF"></uni-icons>
					<view class="job-style-text">职位类别</view>
				</view>
				<view class="grid-item-box" style="background-color: #D2E4FF;" @click="showSearch">
					<uni-icons type="search" size="20" color="#69A5FE"></uni-icons>
					<view class="job-style-text-blue">搜索</view>
				</view>
			</view>
			<!-- 搜索框 -->
			<uni-search-bar v-model="searchText" v-show="searchStatus" :focus="searchStatus" cancel-button="none"
				bgColor="#000" @confirm="search" @input="input"></uni-search-bar>
			<view class="show-job-nums"><span class="job-nums">共{{total}}个职位</span></view>
		</view>
		<view class="job-list">
			<card v-for="(jobItem, index) in jobList" :searchText="searchText" :key="index" :jobItem="jobItem"
				:jobName="jobItem.title" :place="jobItem.location" :category="jobItem.category"
				:education="jobItem.education" :tagList="jobItem.qualifications" :recruitId="jobItem.recruitId"
				:date="jobItem.publishDate" @toCardDetail="toCardDetail"></card>
		</view>
		<view class="bottom-text">
			<text>已经到底啦</text>
		</view>

		<jobCategory class="job-category" v-if="showJobCategory" @removeFromSuperview="toCategorySelect"
			@selectedCategory="selectedJobCategory" :jobCategorys="jobCategorys"></jobCategory>
	</view>
</template>

<script>
	import navbar from '@/components/nav.vue';
	import card from '@/components/card.vue';
	import swiperCard from '@/components/swiperCard.vue';
	import searchBar from '@/components/searchBar.vue';
	import jobCategory from '@/components/categorySelect.vue';
	import {
		jobList
	} from '@/network/job.js';
	import {
		logout,
		supplyInfo
	} from '../../network/user';
	export default {
		data() {
			return {
				searchStatus: false,
				city: '北京',
				jobList: [],
				total: 0,
				showDropdown: false,
				showJobCategory: false,
				username: '',
				isLogin: false,
				jobCategorys: [],
				searchText: ''
			}
		},
		components: {
			card,
			swiperCard,
			jobCategory,
			navbar
		},
		onShow() {
			this.isLogin = uni.getStorageSync('token').length > 0;
			if (this.isLogin) {
				this.getUserInfo();
			}

			this.fetchJobList(this.jobCategorys, this.searchText);
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
			toBaseInfo() {
				uni.navigateTo({
					url: '/pages/index/baseInfo/baseInfo'
				})
			},
			toUserProtocol() {
				uni.navigateTo({
					url: '/pages/user/userProtocol/userProtocol'
				})
			},
			showSearch() {
				this.searchStatus = !this.searchStatus;
			},
			fetchJobList(types, keyword) {
				var params;
				if (types.length == 0) {
					params = {
						keyword: keyword
					}
				} else {
					params = {
						keyword: keyword,
						categoryIds: types.join(',')
					}
				}

				jobList(params).then((response) => {
					if (response.code == 200) {
						this.jobList = response.rows;
						this.total = response.total;
					} else {
						this.jobList = [];
						this.total = 0;
					}
				})
			},
			input(text) {
				this.fetchJobList(this.jobCategorys, this.searchText);
			},
			toCardDetail: function(jobItem) {
				uni.navigateTo({
					url: 'jobDetail/jobDetail?recruitId=' + jobItem.recruitId
				})
			},
			toCategorySelect() {
				this.showJobCategory = !this.showJobCategory;
			},
			selectedJobCategory(types) {
				this.jobCategorys = types

				this.showJobCategory = false;

				this.fetchJobList(types, this.searchText);
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			maskViewRemoveFromSuperview() {
				this.showDropdown = false;
			},
			onLogin() {
				uni.navigateTo({
					url: '/pages/user/login/login'
				})

				this.showDropdown = false;
			},
			onLogout() {
				logout().then((response) => {
					uni.removeStorageSync('token');
					this.showDropdown = false;
				})
			},
			getUserInfo() {
				supplyInfo().then((response) => {
					if (response.code == 200 && response.data != null) {
						this.username = response.data.realName;
					}
				})
			},
			deliveryRecord() {
				this.showDropdown = false;
				uni.navigateTo({
					url: '/pages/user/record/DeliveryRecord'
				})
			},
			resumenManagement() {
				this.showDropdown = false;
				uni.navigateTo({
					url: '/pages/user/manageResume/manageResume'
				})
			},
			highlightText(text) {
				if (!this.searchText) {
					return text;
				}
				const pattern = new RegExp(this.searchText, 'gi');
				return text.replace(pattern, match => `<span class="highlight">${match}</span>`);
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style>
	card:last-of-type {
		margin-bottom: 30rpx;
	}

	/deep/ .uni-navbar__header-container {
		overflow: inherit;
	}

	/deep/ .uni-searchbar__box {
		/* width: 380px; */
		height: 35px;
		border: 1px solid #69a5fe !important;
		border-radius: 19px !important;
		background-color: #fff !important;
	}

	/deep/ .uniui-search {
		color: #69A5FE !important;
	}

	/deep/ .uni-searchbar__box-icon-search {
		color: #69A5FE !important;
	}

	.nav-bar {
		width: 100%;
	}

	.job-background {
		background-color: #ffffff;
		margin-bottom: 10px;
	}

	.job-category {
		display: flex;
		flex-direction: row;
		height: 50px;
	}

	.job-style-text {
		font-size: 15px;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
	}

	.job-style-text-blue {
		font-size: 15px;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: center;
		color: #69a5fe;
	}

	.show-job-nums {
		background-color: #ffffff;
		padding: 5px 0;
		width: 100vw;
	}

	.job-nums {
		font-size: 12px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: left;
		color: #7b7b7b;
		margin-left: 20px;
	}

	.job-list {
		width: 100%;
		height: auto;
	}

	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-item-box {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 5px 5px;
		width: 50vw;
	}

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.bottom-text {
		width: 87px;
		height: 14px;
		font-size: 10px;
		font-family: PingFang SC, PingFang SC-Regular;
		font-weight: 400;
		text-align: center;
		color: #acacac;
		margin-top: 16px;
		margin-bottom: 60px;
	}

	.menu-mask {
		position: fixed;
		top: 88px;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.menu-background {
		background-color: white;
		border-top: 1px solid #ccc;
	}

	.menu-cell {
		display: flex;
		height: 56px;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.5px solid #ccc;
	}

	.menu-cell span {
		line-height: 56px;
		margin-left: 24px;
	}

	.menu-cell-arrow {
		width: 8px;
		height: 13px;
		margin-right: 24px;
	}

	.job-category {
		/* position: absolute; */
		top: 44px;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1001;
	}
</style>