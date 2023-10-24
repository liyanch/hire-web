import {
	get,
	post,
	del
} from './api.js'

export function jobList(params) {
	return get('/system/recruit/list', params)
}
// 岗位详情页
export function jobDetail(recruitId) {
	return get('/system/recruit/detail/' + recruitId, {})
}

export function deliveryRecord() {
	return get('/system/resume/apply/history', {})
}

export function recruitDetail(recruitId) {
	return get('/system/recruit/detail/' + recruitId, {})
}

export function positionType() {
	return get('/system/dict/data/type/sys_recruit_category', {})
}

export function resumePersonal(hideLoading) {
	return get('/system/resume/personal', {}, true, hideLoading)
}

export function apply(params) {
	return post('/system/resume/apply', params)
}

export function addResume(params) {
	return post('/system/resume/add', params)
}

export function educationInfo() {
	return get('/system/dict/data/type/sys_education_type')
}