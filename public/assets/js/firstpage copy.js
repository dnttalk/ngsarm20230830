// PCR狀態宣告
let status = 0 // 0:PCR open, 1:PCR opening, 2:PCR close, 3:PCR closing 
let statusArr = ['PCR open', 'PCR opening', 'PCR close', 'PCR closing']

$(function () {
    btnAnimation()
});

let statusEvent = function () {
    if (status < 3) {
        status++
        $('#pcrBtn').text(statusArr[status])
        console.log(statusArr[status])
    } else {
        status = 0
        $('#pcrBtn').text(statusArr[status])
        console.log(statusArr[status])
    }
    if (statusArr[status] == 'PCR opening') {
        $.get("/api/pcrlib/open", function (data) {
            console.log(data)
        });
    }
    if (statusArr[status] == 'PCR closing') {
        $.get("/api/pcrlib/close", function (data) {
            console.log(data)
        });
    }
}

let btnAnimation = function () {
    $('#pcrBtn').on('click', function () {
        let count = 0
        statusEvent()
        $('#pcrBtn').prop('disabled', true)
        while (count < 5) {
            $('#pcrBtn').fadeOut(500)
            $('#pcrBtn').fadeIn(500)
            count++
        }
        $('#pcrBtn').promise().done(function () {
            statusEvent()
            $('#pcrBtn').prop('disabled', false)
        });
    })
}
// 開關狀態，初始值為關閉
let isPCRStarted = false;
