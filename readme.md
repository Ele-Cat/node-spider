# node-spider

- 使用 nodejs + axios + cheerio 搭建爬取网页情侣头像、接口套图等的脚本
- [情侣头像](https://www.woyaogexing.com)
- [美女套图](http://jiuli.xiaoapi.cn/ipa.php?id=mnyjs)
- [短视频1](https://api.apiopen.top/api/getMiniVideo?page=1&size=10)

## 使用前

**仅用作代码学习使用，请勿请求频率过高！**

## 安装

```sh
npm i
```

## 运行

### 页面爬取

1. 爬取情头请运行

   ```sh
   npm run couple
   ```

   程序运行会在根目录生成`imageCouple`文件夹，图片会保存在这里

### 接口爬取

1. 爬取美女套图请运行

   ```sh
   npm run taotu
   ```

   程序运行会在根目录生成`imageTaotu`文件夹，图片会保存在这里

2. 爬取短视频请运行

   ```sh
   npm run short
   ```

   程序运行会在根目录生成`videoShort`文件夹，图片会保存在这里

### 接口爬取，并生成接口

1. 爬取尾号限行请运行

   ```sh
   npm run limit
   ```

   程序运行会启动服务，访问http://localhost:3000/xianxing?name=天津