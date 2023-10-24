//network/request.js文件

import base from './baseUrl.js'

export default class Request {
	http(param) {
		// 请求参数
		let url = param.url;
		let method = param.method;
		let header = param.header || {};
		let data = Object.assign(param.data || {});
		let hideLoading = param.hideLoading || false;
		let whetherData = param.whetherData;
		//拼接完整请求地址
		let requestUrl = base.baseUrl + url;
		header = Object.assign({
			'content-type': "application/json"
		}, param.header, {
			'Authorization': uni.getStorageSync("token")
		})
		//加载圈
		if (!hideLoading) {
			uni.showLoading({})
		}

		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: header,
				success: (res) => {
					// 判断 请求是否成功 
					if (res.statusCode == 200) {
						//判断  接口返回列表中是否存在 data 列表 （因为接口不统一所以从这里判断 promise返回什么数据）
						if (whetherData) {
							// code判断:1/200成功,不等于1/200错误
							if (res.data.code == 1 || res.data.code == 200) {
								//成功            
								resolve(res.data)
								return true;
							} else {
								if (res.data.code == 401 || res.data.code == 403) {
									uni.removeStorageSync("token")

									uni.navigateTo({
										url: '/pages/user/login/login'
									})
								}
								resolve(res.data)
								return false;
							}
						} else {
							resolve(res.data)
							return true;
						}
					} else {
						return false;
					}
				},
				//请求失败
				fail: (err) => {
					//隐藏加载
					reject(err);
					return false;
				},
				//请求完成
				complete() {
					if (!hideLoading) {
						uni.hideLoading();
					}
					return;
				}
			})
		})
	}

	// 上传文件
	upload(param) {
		let url = param.url;
		//拼接完整请求地址
		let requestUrl = base.baseUrl + url;
		let filePath = param.filePath;
		const token = uni.getStorageSync('token');
		const header = {
			'Authorization': token
		};
		return new Promise((resolve, reject) => {
			const task = uni.uploadFile({
				url: requestUrl,
				filePath: filePath,
				name: 'file',
				method: 'POST',
				formData: {
					'fileName': param.fileName
				},
				header: header,
				success: (res) => {
					// 判断 请求是否成功 
					if (res.statusCode == 200) {
						resolve(JSON.parse(res.data));
						return true;
					} else {
						return false;
					}
				},
				//请求失败
				fail: (err) => {
					reject(err);
					return false;
				},
				//请求完成
				complete() {
					return;
				}
			});

			task.onProgressUpdate(res => {
				if (param.progressCallback) {
					param.progressCallback(res.progress);
				}
			});
		});
	}
}