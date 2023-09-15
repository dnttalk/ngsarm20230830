const fs = require('fs');
const path = require('path');
const dataPath = '../data/user.json';
let login = async (req, res) => {
    try {
        const { user, pwd } = req.body;

        fs.readFile(dataPath, 'utf-8', (error, data) => {
            if (error) {
                res.send("<h1 style='color:orange'>! server error</h1>" + error);
                return;
            }
            const arr = JSON.parse(data);
            const userObj = arr.find(obj => obj.user === user && obj.pwd === pwd);

            if (userObj) {
                res.render('loadingPage', { u: user, title: 'sign in suceesfully' });
            } else {
                res.send(`<h1 style='color:red'>! Login failed</h1> Login failed！After 3 seconds, it will automatically return to the login interface.....<script>setTimeout(() => {window.location = '/login';}, 3000);</script>`);
            }
        });
    } catch (err) {
        console.log(err)
        res.send(`<h1 style='color:red'>! An error occurred</h1> An error occurred！After 3 seconds, it will automatically return to the login interface.....<script>setTimeout(() => {window.location = '/login';}, 3000);</script>`);
    }
}

let register = async (req, res) => {
    try {
        fs.readFile(dataPath, 'utf-8', (error, data) => {
            let arr = JSON.parse(data)
            let userObj = arr.find(obj => obj.user === req.body.ruser)
            if (userObj) {
                res.json({ status: 2, message: 'User Exist' })
            } else {
                if (req.body.rpwd == req.body.rcpwd) {
                    arr.push({ user: req.body.ruser, pwd: req.body.rpwd })
                    let data = JSON.stringify(arr)
                    fs.writeFileSync(dataPath, data);
                    res.json({ status: 1, message: 'Register Success' })
                } else {
                    res.json({ status: 1, message: 'Confirm Password Not Same' })
                }

            }
        })
    } catch (err) {
        console.log(err)
        res.json({ status: 0, message: 'Server Error' })
    }
}

module.exports = {
    login: login,
    register: register,
}
