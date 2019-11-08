const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

// We are getting 'process.env.NODE_ENV' from the NPM scripts
// Remember the 'dev' script?
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    // Tells Webpack which built-in optimizations to use
    // If you leave this out, Webpack will default to 'production'
    mode: devMode ? 'development' : 'production',

    // Webpack needs to know where to start the bundling process,
    // so we define the Sass file under './Styles' directory
    // and the script file under './Scripts' directory
    entry: {
        css: './Styles/site.scss',
        site: './Scripts/site.js'
    },

    // This is where we define the path where Webpack will place
    // a bundled JS file.
    output: {
        path: path.resolve(__dirname, 'wwwroot'),

        // Specify the base path for all the styles within your
        // application. This is relative to the output path, so in
        // our case it will be ./wwwroot/css
        publicPath: '/css',

        // The name of the output bundle. Path is also relative
        // to the output path, so './wwwroot/js'
        filename: 'js/[name].js'
    },
    devtool: devMode ? 'inline-source-map' : 'source-map',
    module: {
        // Array of rules that tells Webpack how the modules (output)
        // will be created
        rules: [
            {
                // Look for JavaScript files and process them according to the
                // rules specified in the different loaders
                test: /\.(js)$/,

                // Ignore the node_modules directory
                exclude: /node_modules/,

                // Use Babel to transpile ES6+ to ES5
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // Look for Sass files and process them according to the
                // rules specified in the different loaders
                test: /\.(sa|sc)ss$/,

                // Use the following loaders from right-to-left, so it will
                // use sass-loader first and ending with MiniCssExtractPlugin
                use: [
                    {
                        // Extracts the CSS into a separate file and uses the
                        // defined configurations in the 'plugins' section
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // Interprets CSS
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        // Use PostCSS to minify and autoprefix with vendor rules
	                    // for older browser compatibility
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',

                            // We instruct PostCSS to autoprefix and minimize our 
                            // CSS when in production mode, otherwise don't do anything
                            plugins: devMode
                                ? () => []
                                : () => [
                                    postcssPresetEnv({
                                        // Compile our CSS code to support browsers 
                                        // according to the rules specified below
                                        // You can modify the target browsers according to
                                        // your needs by using supported queries.
                                        // https://github.com/browserslist/browserslist#queries
                                        //https://browserl.ist/?q=%3E0.25%25%2C+not+dead%2C+not+ie+%3C%3D+11%2C+not+op_mini+all
                                        browsers: ['>0.2%', 'not dead', 'not ie < 10', 'not op_mini all']
                                    }),
                                    require('cssnano')()
                                ]
                        }
                    },
                    {
                        // Adds support for Sass files, if using Less, then
                        // use the less-loader
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                // Adds support to load images in your CSS rules. It looks for
                // .png, .jpg, .jpeg and .gif
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // The image will be named with the original name and
                            // extension
                            name: '[name].[ext]',

                            // Indicates where the images are stored and will use
                            // this path when generating the CSS files.
                            // Example, in site.scss I could have
                            // url('../wwwroot/images/pattern.png') and when generating
                            // the CSS file, file-loader will output as
                            // url(../images/pattern.png), which is relative
                            // to '/css/site.css'
                            publicPath: '../images',

                            // When this option is 'true', the loader will emit the
                            // image to output.path. In our case we don't want this
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // Configuration options for MiniCssExtractPlugin. Here I'm only
        // indicating what the CSS output file name should be and
        // the location
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/site.css' : 'css/site.min.css'
        })
    ]
};
