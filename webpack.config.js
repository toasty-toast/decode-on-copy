const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
const Package = require('./package.json');

module.exports = env => {
	const isFirefox = env.TARGET == 'firefox';

	return {
		mode: 'production',
		output: {
			filename: 'index.js'
		},
		plugins: [
			new Webpack.ProgressPlugin(),
			new CleanWebpackPlugin(),
			new CopyWebpackPlugin([
				{
					from: 'icons',
					to: 'icons',
					ignore: ['*.svg']
				},
				{
					from: 'manifest.json',
					transform: (content, path) => {
						manifest = {
							...JSON.parse(content.toString()),
							description: Package.description,
							version: Package.version
						};

						// "applications" must be in the manifest for a Firefox addon, but cannot be in the manifest for a chrome extension.
						if (isFirefox) {
							manifest.applications = {
								gecko: {
									id: "decodeandcopy@decodeandcopy.com"
								}
							};
						}
						return Buffer.from(JSON.stringify(manifest));
					}
				}
			])
		]
	};
};
