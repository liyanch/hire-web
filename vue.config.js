module.exports = {
	// 基本路径
	publicPath: '/',
	// 输出目录
	outputDir: 'dist',
	// 静态资源目录
	assetsDir: 'static',
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// ...
};

module.exports = {
	// ...
	chainWebpack: config => {
		// 添加一个新的 Loader
		config.module
			.rule('foo-loader')
			.test(/\.foo$/)
			.use('foo-loader')
			.loader('foo-loader')
			.end();
	},
};

module.exports = {
	// ...
	devServer: {
		host: '0.0.0.0',
		port: '8089',
		open: true,
		proxy: {
			// detail: https://cli.vuejs.org/config/#devserver-proxy
			['/prod-api']: {
				target: `http://192.168.200.249:8080`,
				// target: `http://172.16.16.121:8080`,
				changeOrigin: true,
				pathRewrite: {
					['^' + '/prod-api']: ''
				}
			}
		},
		disableHostCheck: true
	},
};
module.exports = {
	// ...
	css: {
		loaderOptions: {
			less: {
				globalVars: {
					primaryColor: '#ff0000',
				},
			},
		},
	},
};