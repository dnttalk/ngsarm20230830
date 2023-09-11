const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const dataPath = 'C:/NGA_workstation/user.json';

// 函數來讀取用戶數據
async function readUserData() {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

// 登錄處理
async function login(req, res) {
    try {
        const { user, pwd } = req.body;
        const users = await readUserData();

        const userObj = users.find(obj => obj.user === user);

        if (userObj && await bcrypt.compare(pwd, userObj.pwd)) {
            res.render('loadingPage', { u: user, title: 'sign in successfully' });
        } else {
            // 登錄失敗處理
        }
    } catch (err) {
        // 錯誤處理
    }
}

// 註冊處理
async function register(req, res) {
    try {
        const { ruser, rpwd, rcpwd } = req.body;
        const users = await readUserData();

        const userObj = users.find(obj => obj.user === ruser);

        if (userObj) {
            // 用戶已存在處理
        } else if (rpwd !== rcpwd) {
            // 密碼不一致處理
        } else {
            const hashedPassword = await bcrypt.hash(rpwd, 10);
            users.push({ user: ruser, pwd: hashedPassword });
            await fs.writeFile(dataPath, JSON.stringify(users));
            // 註冊成功處理
        }
    } catch (err) {
        // 錯誤處理
    }
}

module.exports = {
    login: login,
    register: register,
};