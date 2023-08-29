const axios = require("axios");
const fs = require("fs");
const { isExitDir, sleep, excludeSpecial } = require("../utils/utils");
// 爬取多少页
const pageTotal = 30;

/************
 * 爬短视频接口用的脚本
 ************/

// 执行入口，传入一个时间(单位:ms)控制爬取速度，建议不要太快
getList();

/**
 * 获取不同页面的数据，默认获取30页
 * @param waitTime 爬取一个页面的间隔时间，默认 2s
 */
async function getList(waitTime = 6000) {
  for (let i = 1; i < pageTotal; i++) {
    // 爬慢点
    await sleep(waitTime);
    getPage(i);
  }
}

// 获取页面内容
async function getPage(page) {
  // 从接口拿回来数据，图片在imgUrls里
  const res = await axios.get(
    `https://api.apiopen.top/api/getMiniVideo?page=${page}&size=10`
  );
  const { list } = res.data.result;
  isExitDir("videoShort");
  getVideo(list);
}

// 用来获取提取短视频的链接
async function getVideo(list) {
  list.map(async (item) => {
    const { id, title, alias, playurl } = item;
    let realTitle = `${id}-${title}-${alias}`;
    await download(playurl, `${excludeSpecial(realTitle)}${playurl.substring(playurl.lastIndexOf('.'))}`);
  });
}

// 拿到链接之后通过文件流下载
async function download(imgUrl, title) {
  const res = await axios.get(imgUrl, { responseType: "stream" });
  const ws = fs.createWriteStream(`./videoShort/${title}`);
  res.data.pipe(ws);
  console.log("正在下载" + title);
  res.data.on("close", async () => {
    console.log("下载完成" + title);
    ws.close();
  });
}
