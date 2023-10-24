import {
	addResume,
	deleteResume,
	uploadFile
} from '../../../network/user';

export async function uploadResume(progressCallback) {
	try {
		const res = await chooseFile();
		const file = validateFile(res);

		// Create a promise for the upload process
		return new Promise(async (resolve, reject) => {
			try {
				const uploadResponse = await uploadFile(
					file.path,
					file.name,
					(progress) => {
						if (progressCallback) {
							progressCallback(progress);
						}
					}
				);
				if (uploadResponse.code === 200) {
					const params = {
						resumeName: uploadResponse.data.name,
						url: uploadResponse.data.url,
						type: '2',
					};
					const addResponse = await onAddResume(params);
					if (addResponse.code === 200) {
						resolve('简历上传成功！');
					} else {
						reject(addResponse.msg);
					}
				} else {
					reject(uploadResponse.msg);
				}
			} catch (error) {
				reject(error.message);
			}
		});
	} catch (error) {
		return Promise.reject(error.message);
	}
}

function onAddResume(params) {
	return addResume(params, true);
}

export function chooseFile() {
	return new Promise((resolve, reject) => {
		uni.chooseMessageFile({
			count: 1,
			success: (res) => resolve(res),
			fail: (err) => reject(err),
		});
	});
}

export function validateFile(res) {
	const file = res.tempFiles[0];
	const fileExtension = file.name.split('.').pop();

	const supportedExtensions = ['jpg', 'jpeg', 'png', 'doc', 'docx', 'pdf'];
	const maxSize = 20 * 1024 * 1024; // 20MB

	if (!supportedExtensions.includes(fileExtension)) {
		throw new Error('上传文件格式不支持');
	}

	if (file.size > maxSize) {
		throw new Error('附件简历不能超过20MB');
	}

	return file;
}