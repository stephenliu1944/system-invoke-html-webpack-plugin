# system-invoke-html-webpack-plugin
inject System.import() into HtmlWebpackPlugin template.

## Install
```
npm i -D system-invoke-html-webpack-plugin
```

## Usage
webpack.config.js
```js
...
plugins: [
  new HtmlWebpackPlugin(),
  new SystemHtmlWebpackPlugin()
  ...
]
```

## License
MIT