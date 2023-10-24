<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')	
		},
		onPageNotFound: [
			function(res) {
				const path = res.path;
				if (path.includes('jobDetail')) {
					const id = /\d+$/.exec(path)[0];
					uni.redirectTo({
						url: '/pages/index/jobDetail/jobDetail?recruitId=' + id
					})
				}
			}
		]
	}
</script>

<style>
	/*每个页面公共css */
	@import "ReView/fontawesome.css";
	@import "Review/component.css";
	
</style>
