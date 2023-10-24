//network/api.js文件

import Request from './request.js'
let request = new Request()

/*
 * 请求样式：
    自定义名字: function(data) {
        return request({
            url: "/banner", //请求头
            method: "GET", //请求方式 
            data: data,    //请求数据
            whetherData: true,  //是否数据格式规范接口
            hideLoading: false, //加载样式
        })
    }, 
 */
export function get(url, data, whetherData = true, hideLoading = false, header) {
	return request.http({
		url: url,
		method: 'GET',
		data: data,
		header: header,
		whetherData: whetherData,
		hideLoading: hideLoading
	})
}

export function post(url, data, whetherData = true, hideLoading = false, header) {
	return request.http({
		url: url,
		method: 'POST',
		data: data,
		header: header,
		whetherData: whetherData,
		hideLoading: hideLoading
	})
}

export function del(url, data, whetherData = true, hideLoading, header) {
	return request.http({
		url: url,
		method: 'DELETE',
		data: data,
		header: header,
		whetherData: whetherData,
		hideLoading: hideLoading,
	})
}

export function upload(url, filePath, fileName, progressCallback) {
	return request.upload({
		url: url,
		filePath: filePath,
		fileName: fileName,
		progressCallback: progressCallback
	})
}