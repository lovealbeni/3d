const path = require('path');

module.exports = {
    // entry: './src/index.js',
    entry:{
        'start':'./src/index.js',
        'fly': './src/fly.js'
    },
    mode: 'development',
    devServer:{
        contentBase:'./dist'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    }
};