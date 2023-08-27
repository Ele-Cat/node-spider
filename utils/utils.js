const fs = require("fs");
const path = require("path");

/**
 * 判断文件夹是否存在，不存在直接创建
 * @param {String} dirName 
 */
function isExitDir(dirName) {
  if (!dirName) throw Error("未传入参数");
  const absPath = path.resolve(__dirname, `../${dirName}`);
  const isExits = fs.existsSync(absPath);
  if (!isExits) {
    console.log("成功创建根目录", dirName);
    fs.mkdirSync(absPath);
  }
};

/**
 * 移除特殊字符函数
 * @param {String} s 
 * @returns 
 */
function excludeSpecial(s) {
  s = s.replace(/[\||\“,，\'\"\\\/\b\f\n\r\t]/g, "");
  s = s.replace(
    /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g,
    ""
  );
  return s;
}

/**
 * 睡眠函数
 * @param {Number} ms 
 * @returns 
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * 获取origin url
 * @param {String} urlString 
 * @returns 
 */
function getDomain(urlString) {
  const parsedUrl = new URL(urlString);
  return parsedUrl.origin;
}

module.exports = {
  isExitDir,
  excludeSpecial,
  sleep,
  getDomain,
}