const path = require('path');
const withImages = require('next-images');
const { i18n } = require('./next-i18next.config');

// https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
const isProd = process.env.NODE_ENV === 'production';

module.exports = withImages({
    i18n,
    // basePath: '/testnextjs/out',
    // inlineImageLimit: false,
    // thêm sass :
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // webpack: (config, options) => {
    //     config.module.rules.push(
    //         // Images
    //         {
    //             loader: 'file-loader',
    //             test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$|\.ico$/,
    //             // options: {
    //             // 	// name: 'assets/images/[contenthash].[ext]',
    //             // 	// name: '/_next/[contenthash].[ext]',
    //             // },

    //             // file loader cần phải bổ sung publicPath và outputPath trong NextJs
    //             options: {
    //                 name: '[name]-[contenthash].[ext]',
    //                 publicPath: `/_next/static/images/`,
    //                 outputPath: 'static/images',
    //             },
    //             // use: [
    //             // 	{
    //             // 		loader: 'file-loader',
    //             // 	},
    //             // ],
    //         },
    //     );

    //     return config;
    // },

    // assetPrefix: isProd ? 'https://beta-sunshinetv.sunshinehomes.vn/' : '',
    assetPrefix: isProd ? 'https://sunshinetv.vn/' : '',
    // https://stackoverflow.com/questions/60212669/next-js-export-to-static-html-always-redirect-to-home-page-on-refresh
    // exportTrailingSlash: true,
    trailingSlash: true,

    // https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory
    // distDir: '_next',

    // https://github.com/vercel/next.js/issues/5602
    // https://nextjs.org/docs/api-reference/next.config.js/rewrites
    // cho build để test
    // rewrites() {
    //     return [{ source: '_next/:path*', destination: 'build/:path*' }];
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: '_next',
    //             destination: '.next',
    //         },
    //     ];
    // },
});
// module.exports = withImages({
// 	inlineImageLimit: false,
// 	// thêm sass :
// 	sassOptions: {
// 		includePaths: [path.join(__dirname, 'styles')],
// 	},
// 	webpack: (config, options) => {
// 		config.module.rules.push(
// 			// Images
// 			{
// 				loader: 'file-loader',
// 				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$|\.ico$/,
// 				options: {
// 					name: 'assets/images/[contenthash].[ext]',
// 				},
// 				// use: [
// 				// 	{
// 				// 		loader: 'file-loader',
// 				// 	},
// 				// ],
// 			},
// 			// {
// 			// 	test: /\.(png|jpg|gif|svg)$/i,
// 			// 	use: [
// 			// 		{
// 			// 			loader: 'url-loader',
// 			// 			options: {
// 			// 				limit: 8192,
// 			// 				mimetype: 'image/png/svg',
// 			// 			},
// 			// 		},
// 			// 	],
// 			// },
// 		);

// 		return config;
// 	},
// });
