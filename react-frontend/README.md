<div align="center">
  <h1> react project template </h1>
</div>

## 1、运行配置

```bash
# install dependency
yarn install or npm install

# develop
yarn dev or npm run dev
```

## 2、打包配置

```bash
# install dependency
yarn install or npm install

# build for production environment
yarn build or npm run build
```

## 文件目录

```
├─config                        # config file
| ├─webpack.common.config.js    # webpack common config
| ├─webpack.dev.config.js       # webpack dev config
| └webpack.prod.config.js       # webpack prod config
|
├─public                        # index.html
|
├─src                           # main file
| ├─main.js                     # app entrance
| ├─settings.js                 # constant config
| ├─index.less                  # global css
| ├─views                       # pages
| | ├─viewer                    # dicom viewers
| | ├─settings                  # system setting
| | ├─login                     # login page
| | ├─exception                 # error page
| | ├─dashboard                 # dicom info list
| ├─utils                       # global utils
| ├─store                       # redux
| ├─router                      # react-router
| ├─middleware                  # middleware
| ├─layouts                     # page layout
| ├─i18n                        #Internationalized configuration
| ├─enhancers                   # redux tracker
| ├─components                  # global component
| ├─assets                      # static file
|
├─package.json                  # package manage

```
