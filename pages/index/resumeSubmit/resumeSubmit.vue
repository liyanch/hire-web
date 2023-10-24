<template>
	<view class="container">
		<view class="main flex-column">
			<navbar class="nav-bar" @clickRight="more"></navbar>
			<!-- <view style="border-bottom: 1px solid #ddd;">
				<uni-nav-bar :fixed="true" right-icon="bars" class="title-text">
					<img src="../../../static/logo.png" alt="" class="gongsitubiao">
					<view class="title-text">垣信卫星</view>
				</uni-nav-bar>
			</view> -->
			<view class="experience" style="margin-bottom: 1px solid #ddd;">
				<uni-section title="基础信息" class="section">
					<view class="example">
						<!-- 基础表单校验 -->
						<uni-forms ref="valiFormData" :rules="rules" label-align="left" validate-trigger="blur"
							:modelValue="valiFormData">
							<uni-forms-item label="姓名" required name="name" label-width="78px">
								<uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="电话" required name="mobile" label-width="78px">
								<uni-easyinput v-model="valiFormData.mobile" placeholder="请输入手机号" />
							</uni-forms-item>
							<uni-forms-item label="邮箱" required name="email" label-width="78px">
								<uni-easyinput v-model="valiFormData.email" placeholder="请输入邮箱" />
							</uni-forms-item>
							<uni-forms-item label="性别" required name="sex" label-width="78px">
								<picker v-model="valiFormData.sex" @change="bindSexPickerChange" :value="sexIndex" :range="sexArr"
									:range-key="'title'">
									<view class="uni-input">
										{{sexArr[sexIndex] != null ? sexArr[sexIndex].title : ''}}
									</view>
								</picker>
							</uni-forms-item>
							<uni-forms-item label="生日" required name="birthday" label-width="78px">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="valiFormData.birthday"
									@maskClick="maskClick" />
							</uni-forms-item>
							<uni-forms-item label="民族" required name="nation" label-width="78px">
								<uni-easyinput v-model="valiFormData.nation" placeholder="请输入民族" />
							</uni-forms-item>
							<uni-forms-item label="政治面貌" required name="politics" label-width="78px">
								<uni-easyinput v-model="valiFormData.politics" placeholder="请输入政治面貌" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</uni-section>
			</view>
			<view class="experience" v-for="(item, index) in educationFormData.educationItem">
				<uni-section title="教育经历">
					<view class="example">
						<uni-forms ref="educationFormData" :modelValue="educationFormData">
							<uni-forms-item label="学校" label-width="78px" required name="school">
								<uni-easyinput v-model="item.school" placeholder="请输入学校" />
							</uni-forms-item>
							<uni-forms-item v-model="item.educationId" label="学历" label-width="78px" required
								name="educationId">
								<picker @change="bindEducationPickerChange(index, $event, item)"
									:value="item.educationIndex" :range="educationArr" :range-key="'dictLabel'">
									<view class="uni-input">
										{{educationArr[item.educationIndex] != null ? educationArr[item.educationIndex].dictLabel : '' }}
									</view>
								</picker>
							</uni-forms-item>
							<uni-forms-item v-model="item.educationType" label="学历类型" required name="educationType"
								label-width="78px">
								<picker @change="bindEducationTypePickerChange(index, $event, item)"
									:value="item.educationTypeIndex" :range="educationTypeArr" :range-key="'title'">
									<view class="uni-input">
										{{educationTypeArr[item.educationTypeIndex] != null ? educationTypeArr[item.educationTypeIndex].title : ''}}
									</view>
								</picker>
							</uni-forms-item>
							<uni-forms-item label="专业" required name="major" label-width="78px">
								<uni-easyinput v-model="item.major" placeholder="请输入专业" />
							</uni-forms-item>
							<uni-forms-item label="开始时间" required name="startDate" label-width="78px">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="item.startDate"
									@maskClick="maskClick" />
							</uni-forms-item>
							<uni-forms-item label="结束时间" required name="endDate" label-width="78px">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="item.endDate"
									@maskClick="maskClick" />
							</uni-forms-item>
							<!-- <uni-section title="描述" name="eduDesc" padding="0 10px 10px 10px">
								<uni-easyinput type="textarea" v-model="item.eduDesc" placeholder="请输入"></uni-easyinput>
							</uni-section> -->
							<uni-forms-item label="描述" name="eduDesc" style="margin-left: 14rpx;" label-width="78px">
								<uni-easyinput type="textarea" v-model="item.eduDesc" placeholder="请输入" />
							</uni-forms-item>
						</uni-forms>
						<view class="add-project" @click="deleteEducation(index)"
							v-if="index != 0 && educationFormData.educationItem.length > 1">
							<view class="">
								<img src="../../../static/shanchu-red.png" class="tubiao" alt="">
							</view>
							<view class="delete-content">
								<text>删除此段教育经历</text>
							</view>
						</view>
					</view>
				</uni-section>
			</view>
			<!-- 增加教育经历按钮 -->
			<view class="add-education" @click="addEducation">
				<view class="">
					<img src="../../../static/jiahao.png" style="width: 48rpx; height: 48rpx;" alt="">
				</view>
				<view class="add-education-text">
					<text>添加教育经历</text>
				</view>
			</view>
			<!-- 实习/工作经历 -->
			<view class="experience" v-for="(item, index) in workFormData.workItem">
				<uni-section title="实习/工作经历">
					<view class="example">
						<uni-forms ref="workFormData" :modelValue="workFormData">
							<uni-forms-item label="公司" required name="company" label-width="78px">
								<uni-easyinput v-model="item.company" placeholder="请输入公司" />
							</uni-forms-item>
							<uni-forms-item label="职位" required name="position" label-width="78px">
								<uni-easyinput v-model="item.position" placeholder="请输入职位" />
							</uni-forms-item>
							<uni-forms-item label="开始时间" required name="startDate" label-width="78px">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="item.startDate"
									@maskClick="maskClick" />
							</uni-forms-item>
							<uni-forms-item label="结束时间" required name="endDate" label-width="78px">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="item.endDate"
									@maskClick="maskClick" />
							</uni-forms-item>
							<uni-forms-item label="描述" name="expDesc" label-width="78px">
								<uni-easyinput type="textarea" v-model="item.expDesc" placeholder="请输入" />
							</uni-forms-item>
						</uni-forms>
						<view class="add-project" @click="deleteWork(index)">
							<view class="">
								<img src="../../../static/shanchu-red.png"
									style="width: 30rpx; height: 32rpx; margin-top: 4px;" alt="">
							</view>
							<view class="delete-content">
								<text>删除此段实习/工作经历</text>
							</view>
						</view>
					</view>
				</uni-section>
			</view>
			<!-- 增加工作经历按钮 -->
			<view class="add-education" @click="addWork">
				<view class="">
					<img src="../../../static/jiahao.png" style="width: 48rpx; height: 48rpx;" alt="">
				</view>
				<view class="add-education-text">
					<text>添加实习/工作经历</text>
				</view>
			</view>

			<!-- 项目经历 -->
			<view class="experience" v-for="(item, index) in projectFormData.projectItem">
				<uni-section title="项目经历">
					<view class="example">
						<uni-forms ref="projectFormData" :modelValue="projectFormData">
							<uni-forms-item label="项目名称" required name="projectName" label-width="78px">
								<uni-easyinput v-model="item.projectName" placeholder="请输入项目名称" />
							</uni-forms-item>
							<uni-forms-item label="项目角色" name="projectPosition" label-width="78px">
								<uni-easyinput v-model="item.projectPosition" placeholder="请输入项目角色" />
							</uni-forms-item>
							<uni-forms-item label="开始时间" required name="startDate" label-width="78px" placeholder="请选择">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="item.startDate"
									@maskClick="maskClick" />
							</uni-forms-item>
							<uni-forms-item label="结束时间" required name="endDate" label-width="78px" placeholder="请选择">
								<uni-datetime-picker type="date" :clear-icon="false" v-model="item.endDate"
									@maskClick="maskClick" />
							</uni-forms-item>
							<uni-forms-item label="项目链接" name="pjUrl" label-width="78px">
								<uni-easyinput v-model="item.pjUrl" placeholder="请输入项目名称" />
							</uni-forms-item>
							<uni-forms-item label="项目描述" name="pjDesc" label-width="78px">
								<uni-easyinput type="textarea" v-model="item.pjDesc" placeholder="请输入" />
							</uni-forms-item>
						</uni-forms>
						<!-- <deleteBar @deleteProject(index)="deleteProject(index)"></deleteBar> -->
						<view class="add-project" @click="deleteProject(index)">
							<view class="">
								<img src="../../../static/shanchu-red.png"
									style="width: 30rpx; height: 32rpx; margin-top: 4px;" alt="">
							</view>
							<view class="delete-content">
								<text>删除此段项目内容</text>
							</view>
						</view>
					</view>
				</uni-section>
			</view>
			<!-- 增加项目经历按钮 -->
			<view class="add-education" @click="addProject">
				<view class="">
					<img src="../../../static/jiahao.png" style="width: 48rpx; height: 48rpx;" alt="">
				</view>
				<view class="add-education-text">
					<text>添加项目经历</text>
				</view>
			</view>
		</view>

		<view class="experience">
			<uni-section title="获得证书/奖项" padding="0 10px 10px 10px">
				<uni-easyinput type="textarea" v-model="awards" placeholder="请输入"></uni-easyinput>
			</uni-section>
		</view>

		<view class="experience">
			<uni-section title="自我评价" padding="0 10px 10px 10px">
				<uni-easyinput type="textarea" v-model="selfAssessment" placeholder="请输入"></uni-easyinput>
			</uni-section>
		</view>

		<view class="re-bottom bg-white shadow-sm flex-row">
			<view class="left-botton" @click="back">
				<text class="left-botton-text">取消</text>
			</view>
			<view class="right-botton">
				<text class="right-botton-text" @click="clickToSubmit">确定</text>
			</view>
		</view>
	</view>
</template>
<script>
	import deleteBar from '@/components/deleteBar.vue';
	import navbar from '@/components/nav.vue';
	import {
		educationInfo,
		resumePersonal
	} from '../../../network/job';
	import {
		supplyInfo,
		editResume,
		addResume
	} from '../../../network/user';
	export default {
		data() {
			return {
				awards: '',
				selfAssessment: '',
				resume: null,
				title: 'picker',
				educationArr: [{
					'dictLabel': '请选择',
					'dictCode': ''
				}],
				sexArr: [{
					title: '请选择',
					value: '-1'
				}, {
					title: '男',
					value: '0'
				}, {
					title: '女',
					value: '1'
				}, {
					title: '未知',
					value: '2'
				}],
				educationTypeArr: [{
					title: '请选择',
					value: '0'
				}, {
					title: '海外及港澳台',
					value: '1'
				}, {
					title: '统招全日制',
					value: '2'
				}, {
					title: '统招非全日制',
					value: '3'
				}, {
					title: '自考',
					value: '4'
				}, {
					title: '其他',
					value: '5'
				}],
				sexIndex: '0',
				// 基础信息表单数据
				valiFormData: {
					name: '',
					mobile: '',
					email: '',
					sex: '',
					birthday: '',
					nation: '', // 民族
					politics: '' // 政治面貌
				},
				// 教育经历
				educationFormData: {
					educationItem: [{
						school: '',
						educationId: '',
						educationType: '',
						major: '',
						startDate: '',
						endDate: '',
						eduDesc: '',
						educationIndex: 0,
						educationTypeIndex: 0
					}]
				},
				// 工作经历
				workFormData: {
					workItem: [
						// {
						// 	company: '',
						// 	position: '',
						// 	startDate: '',
						// 	endDate: '',
						// 	expDesc: ''
						// },
					]
				},
				// 项目经历
				projectFormData: {
					projectItem: [
						// {
						// 	name: '',
						// 	role: '',
						// 	startDate: '',
						// 	endDate: '',
						// 	projectHref: '',
						// 	expDesc: ''
						// },
					]
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					mobile: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}, {
							// pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
							pattern: '^1[34578]\\d{9}$',
							errorMessage: '手机号码格式错误',
							trigger: 'blur',
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: '邮箱不能为空'
						}, {
							// pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
							pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+',
							errorMessage: '邮箱格式不对，请输入正确的邮箱格式',
							trigger: 'blur',
						}]
					},
					birthday: {
						rules: [{
							required: true,
							errorMessage: '生日不能为空'
						}]
					},
					nation: {
						rules: [{
							required: true,
							errorMessage: '民族不能为空'
						}]
					},
					politics: {
						rules: [{
							required: true,
							errorMessage: '政治面貌不能为空'
						}]
					},
				},
				// 自定义表单数据
				customFormData: {
					name: '',
					age: '',
					hobby: []
				},
				dictCodes: []
			}
		},
		components: {
			navbar,
			deleteBar
		},
		onLoad(option) {
			const eventChannel = this.getOpenerEventChannel();
			const self = this;
			eventChannel.on('pushData', function(data) {
				if (data != null) {
					self.resume = data;
					const educationList = self.resume.educationList;
					const workList = self.resume.workList;
					const projectList = self.resume.projectList;
					const selfAssessment = self.resume.selfAssessment;
					const awards = self.resume.awards;


					self.valiFormData = {
						name: self.resume.realName,
						mobile: self.resume.mobile,
						email: self.resume.email,
						sex: self.resume.sex,
						birthday: self.resume.birthday,
						nation: self.resume.nation,
						politics: self.resume.politics
					};

					if (educationList && educationList.length > 0) {
						for (let i = 0; i < self.educationArr.length; i++) {
							for (let j = 0; j < educationList.length; j++) {
								if (self.educationArr[i].dictCode === educationList[j]
									.educationId) {
									educationList[j].educationIndex = i;
								}
							}
						}

						for (let i = 0; i < self.educationTypeArr.length; i++) {
							for (let j = 0; j < educationList.length; j++) {
								if (self.educationTypeArr[i].value === educationList[j]
									.educationType) {
									educationList[j].educationTypeIndex = i;
								}
							}
						}

						self.educationFormData.educationItem = educationList;
					}

					if (workList && workList.length > 0) {
						self.workFormData.workItem = workList;
					}

					if (projectList && projectList.length > 0) {
						self.projectFormData.projectItem = projectList;
					}
					
					if (selfAssessment && selfAssessment.length > 0) {
						self.selfAssessment = selfAssessment;
					}
					
					if (awards && awards.length > 0) {
						self.awards = awards;
					}
				} else {
					self.getUserInfo();
				}
			})

			// if (option.resume != null) {
			// 	this.resume = JSON.parse(decodeURIComponent(option.resume));

			// 	if (this.resume == null) {
			// 		this.getUserInfo();
			// 		return;
			// 	}

			// 	const educationList = this.resume.educationList;
			// 	const workList = this.resume.workList;

			// 	this.valiFormData = {
			// 		name: this.resume.realName,
			// 		mobile: this.resume.mobile,
			// 		email: this.resume.email
			// 	};

			// 	if (educationList && educationList.length > 0) {
			// 		for (let i = 0; i < this.educationArr.length; i++) {
			// 			for (let j = 0; j < educationList.length; j++) {
			// 				if (this.educationArr[i].dictCode === educationList[j]
			// 					.educationId) {
			// 					educationList[j].educationIndex = i;
			// 				}
			// 			}
			// 		}

			// 		for (let i = 0; i < this.educationTypeArr.length; i++) {
			// 			for (let j = 0; j < educationList.length; j++) {
			// 				if (this.educationTypeArr[i].value === educationList[j]
			// 					.educationType) {
			// 					educationList[j].educationTypeIndex = i;
			// 				}
			// 			}
			// 		}

			// 		this.educationFormData.educationItem = educationList;
			// 	}

			// 	if (workList && workList.length > 0) {
			// 		this.workFormData.workItem = workList;
			// 	}
			// } else {
			// 	this.getUserInfo();
			// }

			this.getEducationInfo();
		},
		methods: {
			addEducation: function() {
				const educationPushList = {
					school: '',
					educationId: '',
					educationType: '',
					major: '',
					startDate: '',
					endDate: '',
					eduDesc: '',
					educationIndex: 0,
					educationTypeIndex: 0
				}
				let arr = JSON.parse(JSON.stringify(educationPushList));
				this.educationFormData.educationItem.push(arr);
			},
			deleteEducation: function(index) {
				this.educationFormData.educationItem.splice(index, 1);
			},
			addWork: function() {
				const workPushList = {
					company: '',
					position: '',
					startDate: '',
					endDate: '',
					expDesc: ''
				}
				let workArr = JSON.parse(JSON.stringify(workPushList));
				this.workFormData.workItem.push(workArr);
			},
			deleteWork: function(index) {
				this.workFormData.workItem.splice(index, 1);
			},
			addProject: function() {
				const projectPushList = {
					projectName: '',
					projectPosition: '',
					startDate: '',
					endDate: '',
					pjUrl: '',
					pjDesc: ''
				}
				let projectArr = JSON.parse(JSON.stringify(projectPushList));
				this.projectFormData.projectItem.push(projectArr);
			},
			deleteProject: function(index) {
				this.projectFormData.projectItem.splice(index, 1);
			},
			bindSexPickerChange: function(e) {
				this.sexIndex = e.detail.value;
				this.valiFormData.sex = this.sexArr[e.detail.value].value;
			},
			bindEducationPickerChange: function(index, e, item) {
				item.educationIndex = e.detail.value;
				item.educationId = this.educationArr[e.detail.value].dictCode;
			},
			bindEducationTypePickerChange: function(index, e, item) {
				item.educationTypeIndex = e.detail.value;
				item.educationType = this.educationTypeArr[e.detail.value].value;
			},
			getUserInfo() {
				supplyInfo().then((response) => {
					if (response.code == 200 && response.data != null) {
						this.valiFormData.name = response.data.realName;
						this.valiFormData.mobile = response.data.mobile;
						this.valiFormData.email = response.data.email;
						this.valiFormData.sex = response.data.sex;
						this.valiFormData.birthday = response.data.birthday;
						this.valiFormData.nation = response.data.nation;
						this.valiFormData.politics = response.data.politics;
					}
				})
			},
			getEducationInfo() {
				educationInfo().then((res) => {
					this.educationArr = [{
						'dictLabel': '请选择',
						'dictCode': -1
					}]; // 重复调接口，避免数据不被重复push到数组中去
					this.educationArr.push(...res.data);

					if (this.resume != null) {
						for (let i = 0; i < this.educationArr.length; i++) {
							for (let j = 0; j < this.resume.educationList.length; j++) {
								if (this.educationArr[i].dictCode === this.resume.educationList[j].educationId) {
									this.resume.educationList[j].educationIndex = i;
								}
							}
						}
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			checkValiForm() {
				const checkPromise = this.$refs['valiFormData']?.validate();
				console.log('checkValiForm', checkPromise);
				return checkPromise;
			},
			checkEducationForm() {
				const checkPromise = this.$refs.educationFormData?.map(v => v.validate());
				console.log('checkEducationForm', checkPromise);
				return checkPromise || [];
			},
			checkWorkForm() {
				const checkPromise = this.$refs.workFormData?.map(v => v.validate());
				console.log('checkWorkForm', checkPromise);
				return checkPromise || [];
				// if (response.code === 200 && this.$refs.workFormData) {
				// 	const checkPromise = this.$refs.workFormData?.map(v => v.validate());
				// 	return checkPromise;
				// }
			},
			checkProjectForm() {
				const checkPromise = this.$refs.projectFormData?.map(v => v.validate());
				console.log('checkProjectForm', checkPromise);
				return checkPromise || [];
				// if (response.code === 200 && this.$refs.projectFormData) {
				// 	const checkPromise = this.$refs.projectFormData?.map(v => v.validate());
				// 	return checkPromise;
				// } 再试试
			},
			async clickToSubmit() {
				console.log('this.$refs', this.$refs);
				// let response = await this.$api.myCollect()
				const checkPromise = [
					this.checkValiForm(),
					...this.checkEducationForm(),
					...this.checkWorkForm(),
					...this.checkProjectForm()
				]
				try {
					const validationResult = await Promise.all(
						checkPromise
						// [
						// 	this.$refs['valiFormData'].validate(),
						// 	...this.$refs.educationFormData?.map(v => v.validate()),
						// 	...(this.$refs.workFormData?.map(v => v.validate()) || []),
						// 	...(this.$refs.projectFormData?.map(v => v.validate()) || []),
						// 	// this.$refs['educationFormData'].validate(),
						// 	// this.$refs['workFormData'].validate()
						// ]
					);

					if (validationResult.every((result) => result)) {
						const resumeId = this.resume ? this.resume.resumeId : null;

						const params = {
							resumeName: this.valiFormData.name,
							realName: this.valiFormData.name,
							mobile: this.valiFormData.mobile,
							sex: this.valiFormData.sex,
							email: this.valiFormData.email,
							birthday: this.valiFormData.birthday,
							nation: this.valiFormData.nation,
							politics: this.valiFormData.politics,
							educationList: this.educationFormData.educationItem,
							workList: this.workFormData.workItem,
							projectList: this.projectFormData.projectItem,
							selfAssessment: this.selfAssessment,
							awards: this.awards,
							type: '1',
							url: '',
							resumeId: resumeId
						}

						const apiFunction = this.resume ? editResume : addResume;
						const response = await apiFunction(params);

						const successMessage = this.resume ? '修改成功！' : '在线简历填写成功';
						const errorMessage = this.resume ?
							'修改失败！' :
							'在线简历填写失败，请填写在线简历';
						if (response.code === 200) {
							uni.showToast({
								title: successMessage,
								icon: 'none'
							});
							var that = this;
							setTimeout(function() {
								that.$router.go(-1);
							}, 800);
						} else {
							uni.showToast({
								title: errorMessage,
								icon: 'none',
								duration: 2000
							});
						}
					} else {
						uni.showToast({
							title: '表单验证未通过',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('请求出错', error);
					uni.showToast({
						title: '请求出错',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style>
	/deep/ .uni-date-x--border {
		border: none !important;
	}

	/deep/ .uni-forms-item__content {
		border: 1px solid #f1f1f1 !important;
		display: flex !important;
		align-items: center !important;
	}

	/deep/ .uni-input {
		margin-left: 10px !important;
		width: 200px !important;
		height: 100% !important;
		/* color: rgba(178,178,178,1); */
	}

	/* /deep/ .uni-date__x-input {
		color: rgba(178,178,178,1);
	} */
	.delete-content {
		opacity: 0.9;
		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #b2b2b2;
		margin-left: 10rpx;
	}

	.add-education {
		height: 80rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 20rpx;
		margin-top: 20rpx;
		background-color: #fff;
	}

	.add-project {
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 20rpx;
		padding-top: 20rpx;
		background-color: #fff;
		border-top: 1rpx solid rgba(0, 0, 0, 0.10);
	}

	.add-education-text {
		height: 20px;
		margin-left: 10rpx;
		font-size: 14px;
		font-family: SFProDisplay-Regular;
		text-align: left;
		line-height: 20px;
		color: #69a5fe;
	}

	.experience {
		margin-top: 32rpx;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}

	.tubiao {
		margin-top: 8rpx;
		width: 30rpx;
		height: 32rpx;
	}

	.main {
		width: 100%;
		/* height: 100vw; */
		/* background-color: #ffffff; */
	}

	.uni-easyinput__placeholder-class {
		color: rgba(0, 0, 0, .8);
	}

	/deep/ .uni-navbar__header {
		border-bottom: 1px solid #ddd !important;
	}

	/deep/ .uni-navbar__header-container {
		overflow: inherit !important;
	}

	.gongsitubiao {
		height: 30px;
		margin-left: -55px;
		z-index: 2;
		margin-top: 8px;
	}

	.company-introduction {
		margin-top: 20rpx;
		margin-bottom: 60rpx;
		background-color: #fff;
		padding: 32rpx 48rpx;
	}

	.company-introduction-text {
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #181818;
		line-height: 40rpx;
	}

	.card-box {
		width: 94%;
	}

	.title-text {
		height: 44px;
		font-size: 16px;
		font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 2.0-65 Medium;
		font-weight: normal;
		text-align: left;
		color: #181818;
		line-height: 44px;
		margin-left: 12px;
		/* border-bottom: 1px solid #ddd; */
	}

	.text-decoration {
		padding: 0 5px;
	}

	.qualifications-text {
		width: 280rpx;
		height: 98px;
		opacity: 0.5;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #000000;
		line-height: 20px;
		white-space: wrap;
	}

	.basic-info {
		/* height: 270rpx; */
	}

	.basic-info .info-top {
		width: 94%;
		height: 100rpx;
	}

	.basic-info .info-top .job-name {
		width: 80%;
		font-size: 38rpx;
		line-height: 50rpx;
	}

	.basic-info .info-top .job-salary {
		width: 20%;
		height: 100rpx;
		line-height: 100rpx;
	}

	.basic-info .place-info {
		width: 94%;
		height: 60rpx;
		line-height: 60rpx;
	}

	.basic-info .request-info {
		width: 94%;
		height: 50rpx;
		line-height: 50rpx;
		position: relative;
	}

	.basic-info .request-info text:last-of-type {
		position: absolute;
		right: 0;
	}

	.tip-title {
		width: 94%;
		height: 80rpx;
		line-height: 80rpx;
		/* border-bottom: 1px solid #f1f1f1; */

		font-size: 17px;
		font-family: PingFangSC-Regular;
		text-align: left;
		color: #000000;
	}

	.user-info {
		width: 94%;
		height: 180rpx;
	}

	.user-info .user-card {
		width: 94%;
		height: 100rpx;
	}

	.relate-request {
		height: auto;
	}

	.relate-request .request-tag-list {
		/* width: 94%; */
		height: auto;
		margin-bottom: 10rpx;
		flex-wrap: wrap;
	}

	.relate-request .request-tag-list .tag-item {
		/* height: 40rpx; */
		line-height: 40rpx;
		/* padding: 0 10rpx; */
		font-size: 12px;
		border-radius: 5rpx;
		color: #606266;
		margin-top: 10rpx;
		margin-left: 20rpx;
		white-space: nowrap;
	}

	.job-intro {
		width: 94%;
		height: auto;
		margin-bottom: 160rpx;
	}

	.job-intro .intro {
		width: 94%;
		height: auto;
		line-height: 50rpx;
		margin-bottom: 20rpx;
	}

	.container>>>.re-bottom {
		/* position: sticky; */
		margin-top: 20rpx;
		bottom: 0;
		padding-bottom: 10px;
	}

	.re-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		/* width: 100vw;
		height: 134rpx; */
		border-radius: 20rpx 20rpx 0 0;
		padding: 12rpx 48rpx;
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

	.bottom-left {
		width: 40%;
	}

	.bottom-left .home,
	.share {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 40rpx;
	}

	.bottom-left .home {
		border-right: 1px solid #f1f1f1;
		border-radius: 20rpx 0 0 0;
	}

	.bottom-left .home:active,
	.share:active {
		background-color: rgba(0, 0, 0, .1);
	}

	.bottom-right {
		width: 60%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0 20rpx 0 0;
	}

	.bottom-right:active {
		opacity: 0.9;
	}

	/deep/ .is-input-border {
		border: none !important;
	}


	.section {
		border-bottom: 0.5px solid #ccc;
	}
</style>