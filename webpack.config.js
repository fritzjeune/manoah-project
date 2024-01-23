module.exports = {
    entry: './src/your-entry-file.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    // ... other webpack configuration options ...
    resolve: {
        fallback: {
            "path": false
        }
    }
};