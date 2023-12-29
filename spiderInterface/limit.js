const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const port = 3000;

// 创建一个GET请求的接口
app.get('/xianxing', async(req, res) => {
  let result = await getXianxing(req.query.name);
  res.json({ ...result });
});

// 创建一个GET请求的接口
app.get('/city', async(req, res) => {
  let result = [];
  for (const key in xianxingEnum) {
    result.push({
      key: xianxingEnum[key],
      label: key,
    })
  }
  res.json({ 
    data: result,
    code: 200, 
    msg: "查询成功"
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

async function getXianxing(name) {
  try {
    const cityName = name.replace("市", "");

    if (!cityName || !xianxingEnum[cityName]) {
      return {
        code: 500,
        msg: "未查询到该城市限号信息"
      };
    }
    let httpUrl = `http://${xianxingEnum[cityName]}.bendibao.com/news/xianxingchaxun/`;
    const res = await axios.get(httpUrl);
    const $ = cheerio.load(res.data);

    const today = solveStr($(".xianhao .flex .today .day").html());
    const tomorrow = solveStr($(".xianhao .flex .next .day").html());

    const time = solveStr($(".xianxin-time").eq(0).text()?.replace("限行时间", ""));
    const zone = solveStr($(".xianxin-time").eq(1).text()?.replace("限行区域", ""));
    const rule = solveStr($(".xianxin-rule").eq(0).text()?.replace("限行规则", ""));

    if (!today || !tomorrow || !time || !zone || !rule) {
      return {
        code: 500,
        msg: "暂无最新限行规定"
      };
    }
    
    const limitInfo = {
      today,
      tomorrow,
      other: {
        time,
        zone,
        rule,
      },
    }

    return {
      data: limitInfo,
      code: 200, 
      msg: "查询成功"
    };
  } catch (error) {
    console.log('error: ', error);
    return {
      code: 500,
      msg: "暂无最新限行规定"
    };
  }
  
}

function solveStr(str) {
  return str?.replaceAll("\n", "").replace(/\s/g, '');
}

const xianxingEnum = {
  "上海": "sh",
  "北京": "bj",
  "深圳": "sz",
  "广州": "gz",
  "重庆": "cq",
  "苏州": "suzhou",
  "成都": "cd",
  "武汉": "wh",
  "杭州": "hz",
  "天津": "tj",
  "宁波": "nb",
  "无锡": "wx",
  "青岛": "qd",
  "郑州": "zz",
  "长沙": "cs",
  "佛山": "fs",
  "泉州": "qz",
  "东莞": "dg",
  "济南": "jn",
  "合肥": "hf",
  "福州": "fz",
  "南通": "nt",
  "西安": "xa",
  "大连": "dl",
  "昆明": "km",
  "沈阳": "sy",
  "厦门": "xm",
  "长春": "cc",
  "石家庄": "sjz",
  "南昌": "nc",
  "哈尔滨": "heb",
  "南宁": "nn",
  "贵阳": "gy",
  "太原": "ty",
  "乌鲁木齐": "wlmq",
  "兰州": "lz",
  "呼和浩特": "hu",
  "银川": "yc",
  "海口": "haikou",
  "西宁": "xn",
}