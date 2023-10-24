<template>
	<view class="container">
		<span class="title-text">{{ title }}<span v-if="required" class="required-text">*</span></span>
	</view>

</template>

<script>
	export default {
		name: 'card',
		props: {
			title: {
				type: String,
				default: ''
			},
			required: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {

		}
	}
</script>

<style>
	.container {}

	.title-text {
		height: 24px;
		opacity: 0.9;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: rgba(0, 0, 0, 0.90);
	}

	.required-text {
		color: red;
	}
</style>