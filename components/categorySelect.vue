<template>
	<view class="container">
		<view class="cover">
			<view class="category-list">
				<text class="category-text">职位类别</text>
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.dictCode">
						<view>
							<checkbox :value="item.dictValue" :checked="selectedValues.includes(item.dictValue)" />
						</view>
						<view class="uni-list-cell-text">{{ item.dictLabel }}</view>
					</label>
				</checkbox-group>
			</view>
			<view class="re-bottom bg-white shadow-sm flex-row">
				<view class="left-botton" @click="clickToClear">
					<text class="left-botton-text">消除</text>
				</view>
				<view class="right-botton">
					<text class="right-botton-text" @click="clickSubmit">确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bottomShare from '@/components/bottomShare.vue'
	import bottomConfirm from '@/components/bottomConfirm.vue'
	import {
		positionType
	} from '../network/job.js';
	export default {
		name: 'categorySelect',
		components: {
			bottomShare,
			bottomConfirm
		},
		props: {
			jobCategorys: {
				type: Array,
				default: [],
			},
		},
		data() {
			return {
				items: [],
				selectedValues: []
			};
		},
		methods: {
			clickToClear() {
				this.selectedValues = [];
				this.$emit('selectedCategory', this.selectedValues);
			},
			clickSubmit() {
				// 接口返回选中内容给后端
				this.$emit('selectedCategory', this.selectedValues);
			},
			getPositionType() {
				positionType().then((response) => {
					if (response.code == 200) {
						this.items = response.data
					}
				})
			},
			onClickMask(event) {
				this.$emit('removeFromSuperview')
			},
			checkboxChange(event) {
				this.selectedValues = event.detail.value;
			}
		},
		mounted() {
			this.selectedValues = this.jobCategorys;
			if (this.items.length == 0) {
				this.getPositionType()
			}
		}
	}
</script>

<style>
	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 200;
	}

	.category-list {
		width: 100vw;
		height: auto;
		background-color: #fff;
		margin-top: 240rpx;
		border-radius: 24rpx 24rpx 0 0;
		padding: 20rpx 20rpx;
		position: absolute;
		bottom: 176rpx;
		left: 0;
		max-height: calc(100vh - 400rpx);
		overflow: auto;
		border-bottom: 30rpx solid #F7F7F7;
	}

	.re-bottom {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		padding: 12rpx 48rpx 60rpx 48rpx;
	}

	.category-text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		text-align: center;
		color: #acacac;
		height: 50px;
	}

	.uni-list-cell {
		display: flex;
		align-items: center;
		padding: 20rpx 20rpx;
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

	.right-botton-text {
		font-size: 34rpx;
		font-family: PingFangSC-Regular;
		color: #fff;
	}

	.uni-list-cell-text {
		/* background-color: red; */
		margin-left: 36px;
		/* border-bottom: 0.5px solid #ccc; */
	}
</style>