const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}


module.exports = [
	{
	  mode: 'development',
	  entry: {
	  	script: path.resolve(__dirname, 'assets/js/script.js'),
	  },
	  output: {
	    filename: 'js/[name].js',
	    path: path.resolve(__dirname, 'public')
	  },
	},
	{
	  mode: 'development',
	  entry: {
	  	style: path.resolve(__dirname, 'assets/scss/style.scss'),
	  },
	  output: {
	    filename: '[name].css',
	    path: path.resolve(__dirname, 'public')
	  },
	  module: {
	    rules: [
	      {
	        test: /\.(sa|sc|c)ss$/,
	        use: [
	          'style-loader',
	          {
	            loader: MiniCssExtractPlugin.loader,
	            options: {
	              publicPath: path.resolve(__dirname, 'public'),
	            }
	          },
	          'css-loader',
          	'sass-loader',
	        ]
	      },
	      {
	        test: /\.(jpg|png|gif)$/,
	        use: {
	          loader: 'file-loader',
	          options: {
	            name: './img/[name].[ext]',
	            outputPath: './',
	            publicPath: path => '.' + path
	          }
	        }
	      },
	    ]
	  },
	  plugins: [
	    new MiniCssExtractPlugin({
	      filename: "css/[name].css"
	    })
	  ],
	}
];