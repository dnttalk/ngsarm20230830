// 流程狀態變數(之後請以API去改變status)
let processStatus = 1

$(function () {
    // 狀態改變
    ChangeStatus()
    // flashNumber()
});


let flashNumber = async function () {
    let count = 0
    while (count < 5) {
        if (processStatus == 1) {
            $('#oe1').fadeOut(100).fadeIn(100)
            $('#oe1').promise().done(function () {
                $('#oe1').addClass('active')
            });
        } else if (processStatus == 2) {
            $('#oe2').fadeOut(100).fadeIn(100)
            $('#oe2').promise().done(function () {
                $('#oe2').addClass('active')
            });
        } else if (processStatus == 3) {
            $('#oe3').fadeOut(100).fadeIn(100)
            $('#oe3').promise().done(function () {
                $('#oe3').addClass('active')
            });
        } else if (processStatus == 4) {
            $('#oe4').fadeOut(100).fadeIn(100)
            $('#oe4').promise().done(function () {
                $('#oe4').addClass('active')
            });
        } else if (processStatus == 5) {
            $('#oe5').fadeOut(100).fadeIn(100)
            $('#oe5').promise().done(function () {
                $('#oe5').addClass('active')
            });
        }
        count++
    }
}

let ChangeStatus = function () {
    let cStatus = setInterval(async function () {
        await flashNumber()
        if (processStatus < 6) {
            processStatus++

        } else {
            processStatus++
            clearInterval(cStatus)
            $('#popMessage').text('Finish...')
            setTimeout(function () {
                window.location.href = "/";
            }, 1000)

        }
    }, 5000)
}
