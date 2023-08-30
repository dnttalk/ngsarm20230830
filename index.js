const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({ headless: false });

    // 打开一个新页面
    const page = await browser.newPage();

    // 导航到特定网址
    await page.goto('http://http://localhost:3000/');

    // 进入全屏模式
    await page.keyboard.press('F11');

    // 关闭浏览器时终止
    await browser.waitForTarget(() => false);
    await browser.close();
})();