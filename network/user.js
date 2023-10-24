import {
	get,
	post,
	del,
	upload
} from './api.js'

export function getVerificationCode(params) {
	return post('/auth/sms/code', params)
}

export function login(params) {
	return post('/auth/sms/login', params)
}

export function logout() {
	return del('/auth/logout')
}

export function supply(params) {
	return post('/system/user/supply', params)
}

export function logoff() {
	return post('/system/account/logoff')
}

export function userInfo() {
	return get('/system/user/getInfo', {})
}

export function modify(params) {
	return post('/system/account/modify', params)
}

export function change(params) {
	return post('/auth/account/change', params)
}

export function supplyInfo() {
	return get('/system/user/supply/info')
}

export function addResume(params, hideLoading) {
	return post('/system/resume/add', params, true, hideLoading)
}

export function editResume(params) {
	return post('/system/resume/edit', params)
}

export function deleteResume(resumeId) {
	return del('/system/resume/remove/' + resumeId)
}

export function uploadFile(filePath, fileName, progressCallback) {
	return upload('/system/upload', filePath, fileName, progressCallback)
}