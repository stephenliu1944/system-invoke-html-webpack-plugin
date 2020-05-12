# system-invoke-html-webpack-plugin
Inject System.import() into HtmlWebpackPlugin template.

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

html
```html
<html>
<body>
...
<!-- systemjs lib need to be imported by your self or use 'include-assets-html-webpack-plugin' -->
<script src="/assets/js/systemjs.js"></script>
<script src="/assets/js/vendors.chunk.js"></script>
<script src="/assets/js/main.js"></script>
<!-- system-invoke-html-webpack-plugin just do this use System to import the last js -->
<script type="text/javascript">System.import("/assets/js/main.js");</script>
</body>
</html>
```

## API
```js
new SystemHtmlWebpackPlugin(name)   // default is the last js that append to body
```

## License
MIT