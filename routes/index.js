var express = require('express');
var router = express.Router();
var path = require('path');
const child_process = require('child_process');
// child_process promise 宣告(給/api/start/process用)
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// 20230718 修改 ==========================
// 頁面控制
var pageController = require("../controller/pageController");
var loginController = require("../controller/loginController");


// 頁面導向區塊 ===========================
//loading過場頁面
router.get('/loading', pageController.loadingPage);
//第一頁(主頁)
router.get('/', pageController.firstPage);
//第二層
router.get('/second', pageController.secondPage);
//第二層檢查
router.get('/secondCheck', pageController.secondCheckPage);
//第三層(勾選層 + 確認層)
router.get('/third', pageController.thirdPage);
//第五層(進度層)
router.get('/fifth', pageController.fifthPage);
//自我診斷頁面
router.get('/selfCheck', pageController.selfCheckPage);
//報告頁面
router.get('/report', pageController.reportPage);
//紀錄頁面
router.get('/history', pageController.historyPage);
//登入頁面
router.get('/login', pageController.loginPage);
// 頁面導向區塊 ===========================

// API區段
router.post('/api/user/register', loginController.register)
router.post('/api/user/login', loginController.login)
// 示例路由处理程序，使用 apiUrl
router.get('', (req, res) => {
    const apiUrl = req.path;
    console.log(apiUrl)
    // 使用 apiUrl 进行 API 请求
    res.send('API URL: ' + apiUrl);
    console.log(apiUrl);
});
//PCR開蓋
router.get('/api/pcrlib/open', async (req, res) => {
    console.log(path.join(__dirname, '../public/assets/js/PCR_open.js'))
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/PCR_open.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });

    await workerProcess.on('exit', function (code) {
        console.log('子行程已退出，退出碼 ' + code);
    });
    res.json({ message: 'PCR 開蓋' });
});
//PCR關蓋
router.get('/api/pcrlib/close', async (req, res) => {
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/PCR_close.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    await workerProcess.on('exit', function (code) {
        console.log('子進程已退出，退出碼 ' + code);
    });
    res.json({ message: 'PCR 關蓋' });
});

//Step start
router.get('/api/start/stepstart', async (req, res) => {
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/Step_Star.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    await workerProcess.on('exit', function (code) {
        console.log('子進程已退出，退出碼 ' + code);
    });
    res.json({ message: '機器開始' });
});
//M300
router.get('/api/start/M300', async (req, res) => {
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/M300.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    await workerProcess.on('exit', function (code) {
        console.log('子進程已退出，退出碼 ' + code);
    });
    res.json({ message: '機器開始' });
});
//M301
router.get('/api/start/M301', async (req, res) => {
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/M301.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    await workerProcess.on('exit', function (code) {
        console.log('子進程已退出，退出碼 ' + code);
    });
    res.json({ message: '機器開始' });
});
//M44
router.get('/api/start/M44', async (req, res) => {
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/M44.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    await workerProcess.on('exit', function (code) {
        console.log('子進程已退出，退出碼 ' + code);
    });
    res.json({ message: '機器開始' });
});
//M44
router.get('/api/start/M45', async (req, res) => {
    var workerProcess = child_process.exec('node ' + path.join(__dirname, '../public/assets/js/M45.js'), function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    await workerProcess.on('exit', function (code) {
        console.log('子進程已退出，退出碼 ' + code);
    });
    res.json({ message: '機器開始' });
});
//process
router.get('/api/start/process', async (req, res) => {
    let status = null
    let message = null
    try {
        let { stdout, stderr } = await exec('node ' + path.join(__dirname, '../public/assets/js/process.js'))
        if (stderr) {
            message = stderr
        } else {
            // 將 stdout 分行
            let arr1 = stdout.split(/\r?\n/);
            message = '取得狀態成功'
            // 取得stdout 第五行
            status = arr1[4].split('幾步驟: ')[1]
            // console.log(arr1)
        }
    } catch (err) {
        console.log('發生錯誤')
    }
    res.json({ status: status, message: message });
});
// router.get('/api/start/step', (req, res) => {
//     const read_head = require('../public/assets/js/read_head.js');
//     read_head.req;
//     res.json({ message: '槍頭' });
// });
module.exports = router;
