// 20230718修改================================
//載入過場頁面
let loadingPage = async (req, res) => {
    res.render('loadingPage')
}
//第一頁(主頁)
let firstPage = async (req, res) => {
    res.render('firstPage')
}
//第二層
let secondPage = async (req, res) => {
    if (req.query.id == 'leukemia' || req.query.id == 'mpn' || req.query.id == 'tp53') {
        res.render('secondPage', { id: req.query.id })
    } else {
        res.redirect('/');
    }
}
//第二層檢查
let secondCheckPage = async (req, res) => {
    if (req.query.id == 'leukemia' || req.query.id == 'mpn' || req.query.id == 'tp53') {
        res.render('secondCheckPage', { id: req.query.id })
    } else {
        res.redirect('/');
    }
}
//第三層(勾選層)
let thirdPage = async (req, res) => {
    res.render('thirdPage')
}
//第四層(確認層)
let forthPage = async (req, res) => {
    res.render('forthPage')
}
//第五層(進度層)
let fifthPage = async (req, res) => {
    res.render('fifthPage')
}
//自我診斷頁面
let selfCheckPage = async (req, res) => {
    res.render('selfCheckPage')
}
//報告頁面
let reportPage = async (req, res) => {
    res.render('reportPage')
}
//紀錄頁面
let historyPage = async (req, res) => {
    res.render('historyPage')
}
//登入頁面
let loginPage = async (req, res) => {
    res.render('login')
}

module.exports = {
    loadingPage: loadingPage,
    firstPage: firstPage,
    secondPage: secondPage,
    secondCheckPage: secondCheckPage,
    thirdPage: thirdPage,
    forthPage: forthPage,
    fifthPage: fifthPage,
    selfCheckPage: selfCheckPage,
    reportPage: reportPage,
    historyPage: historyPage,
    loginPage: loginPage,
}
// 20230718修改================================