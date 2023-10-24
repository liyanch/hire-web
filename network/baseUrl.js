//network/baseUrl.js

// ================================================================设置网络请求根路径
let baseUrl = (function() {
	// 请求根路径
	let urlStr = '';
	if (process.env.NODE_ENV === 'development') {
		console.log('开发环境');
		// #ifdef H5
		// urlStr = 'http://192.168.200.250:8080';
		// urlStr = 'https://gmscosmo.com:18090';
		urlStr = 'http://172.16.16.121:8080';
		// #endif
		// #ifndef H5
		urlStr = 'http://172.16.16.121:8080';
		// #endif
	} else {
		console.log('生产环境');
		// #ifdef H5
		urlStr = 'http://172.16.16.121:8080';
		urlStr = 'https://gmscosmo.com:18090';
		// #endif
		// #ifndef H5

		urlStr = 'https://gmscosmo.com:18090';
		// #endif
	}
	// urlStr = 'https://gmscosmo.com:18090';
	return urlStr
})();
// ==================== 图片上传url==========
let uploadImgUrl = (function() {
	let urlStr = '';
	if (process.env.NODE_ENV === 'development') {
		// urlStr = 'http://192.168.31/collect/';

	} else {
		// urlStr = 'http://192.168.31/collect/';

	}
	return urlStr
})();

export default {
	baseUrl,
	uploadImgUrl
}