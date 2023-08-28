const axios = require("axios");
const fs = require("fs");
const { isExitDir, sleep } = require("./utils/utils");
// 爬取多少页
const pageTotal = 30;

/************
 * 爬情侣头像用的脚本
 ************/

// 执行入口，传入一个时间(单位:ms)控制爬取速度，建议不要太快
getList();

/**
 * 获取不同页面的数据，默认获取30页
 * @param waitTime 爬取一个页面的间隔时间，默认 2s
 */
async function getList(waitTime = 2000) {
  for (let i = 2; i < pageTotal; i++) {
    // 爬慢点
    await sleep(waitTime * i);
    getPage();
  }
}

// 获取页面内容
async function getPage() {
  const {
    data: { title: mainTitle, img: imgUrls },
  } = await axios.get("http://jiuli.xiaoapi.cn/i/img/mnyjs.php");
  let realTitle = mainTitle.split("-")[0];
  isExitDir("taotuImg");
  fs.mkdir("./taotuImg/" + realTitle, () => {
    console.log("成功创建目录：" + "./taotuImg/" + realTitle);
  });
  getImg(imgUrls, realTitle);
}

// 用来获取图片的链接
async function getImg(imgUrls, mainTitle) {
  imgUrls.map(async (item) => {
    const title = item.substring(item.lastIndexOf("/") + 1);
    await download(item, mainTitle, title);
  });
}

// 拿到链接之后通过文件流下载
async function download(pageImgUrl, mainTitle, title) {
  const res = await axios.get(pageImgUrl, { responseType: "stream" });
  const ws = fs.createWriteStream(`./taotuImg/${mainTitle}/${title}.jpg`);
  res.data.pipe(ws);
  console.log("正在下载" + title);
  res.data.on("close", async () => {
    console.log("下载完成" + title);
    ws.close();
  });
}
