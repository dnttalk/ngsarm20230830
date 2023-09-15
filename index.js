const puppeteer = require('puppeteer');

(async () => {
    try {
        // 啟動瀏覽器
        const browser = await puppeteer.launch({ headless: false });

        // 開啟新頁面
        const page = await browser.newPage();

        // 導航到特定網址
        await page.goto('http://localhost:3000/'); // 確保你的目標網站正在運行

        // 等待瀏覽器窗口成功打開
        await page.waitForSelector('body'); // 假設你可以找到網頁的body元素來確認頁面已經加載

        // 進入全屏模式
        await page.keyboard.press('F11');

        // 等待一段時間（例如，5秒）以保持全屏模式
        await page.waitForTimeout(5000); // 你可以根據需要調整等待時間

        // 關閉瀏覽器
        await browser.close();
    } catch (error) {
        console.error('發生錯誤:', error);
    }
})();