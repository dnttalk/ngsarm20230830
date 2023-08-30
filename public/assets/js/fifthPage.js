let pauseStatus = 0;
let intervalObj1 = null;
let processStatus = 1;
let timerPaused = false;  // 初始狀態為計時器運行
let intervalId = null;    // 計時器間隔的 ID
let startTime = Date.now();
let pausedTime = null
$(function () {
    pauseEvent();
    poe();
    setupActionButtons(); // 設定開始和暫停按鈕的點擊事件
    startTimer();// 初始狀態下啟動計時器
    flashNumber();
});

let flashNumber = function () {
    if (processStatus == 1) {
        $('#step1').fadeOut(500).fadeIn(500)
    } else if (processStatus == 2) {
        $('#step2').fadeOut(500).fadeIn(500)
    } else if (processStatus == 3) {
        $('#step3').fadeOut(500).fadeIn(500)
    } else if (processStatus == 4) {
        $('#step4').fadeOut(500).fadeIn(500)
    } else if (processStatus == 5) {
        $('#step5').fadeOut(500).fadeIn(500)
    } else if (processStatus == 6) {
        $('#pcText').fadeOut(500).fadeIn(500)
    }
}

let pauseEvent = function () {
    $('.btn-pause').on('click', function () {
        if (pauseStatus === 0) {
            pauseStatus = 1;
            $('.btn-pause-text').text('Continue');
            intervalObj1 = setInterval(function () {
                $('.btn-pause').fadeIn(500).fadeOut(500);
            }, 1000);
        } else {
            $('.btn-pause-text').text('Pause');
            $('.btn-pause').delay(1000).fadeIn(500);
            clearInterval(intervalObj1);
        }
    });
};

let poe = function () {
    $('.btn-confirm').on('click', function () {
        var myModal = new bootstrap.Modal(document.getElementById('EOPModal'), {
            keyboard: false
        });
        myModal.show();
    });
    $('#confirmPOE').on('click', function () {
        $.get("/api/start/M301", function (data) {
            console.log(data);
        });
        $.get("/api/start/M44", function (data) {
            console.log(data);
        });
        $.get("/api/start/M45", function (data) {
            console.log(data);
        });
        window.location.href = "/";
    });
};

function performAction(apiEndpoint, requiredSections) {
    if (requiredSections.every(section => $(section).hasClass('active'))) {
        $.get(apiEndpoint, function (data) {
            console.log(data);
        });
    }
}

function setupActionButtons() {
    $('#start').click(function () {
        if ($('#start').hasClass('active')) {
            $('#start').removeClass('active')
            $('#pause').addClass('active')
            timerPaused = false; // 恢復計時器
            startTime = ((startTime / 1000) * 1000) + (((Date.now() - pausedTime) / 1000) * 1000)
            startTimer();  // 重新啟動計時器
            // 其他操作，例如觸發開始 API 端點
            $.get("/api/start/M300", function (data) {
                console.log(data);
            });
        }
    });

    $('#pause').click(function () {
        if ($('#pause').hasClass('active')) {
            $('#pause').removeClass('active')
            $('#start').addClass('active')
            timerPaused = true;
            clearInterval(intervalId);  // 清除計時器間隔
            pausedTime = Date.now(); // 計算暫停的時間
            // 其他操作，例如觸發暫停 API 端點
            $.get("/api/start/M301", function (data) {
                console.log(data);
            });
        }
    });
}

function startTimer() {

    intervalId = setInterval(async function () {
        if (!timerPaused) {
            let currentTime = Date.now();
            let elapsedTime = currentTime - startTime;
            let seconds = Math.floor((elapsedTime / 1000) % 60);
            let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
            let hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24);
            let timerElement = document.getElementById('timer');
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        $.get("/api/start/process", function (data) {
            if (data.status) {
                processStatus = parseInt(data.status)
                console.log(data)
            }
            if (processStatus === 20) {
                let id = getUrlParameter('id')
                if (id) {
                    window.location.href = "/report?id=" + id;
                }
                window.location.href = "/report?id=";
            }
        });
        flashNumber();
    }, 1000);
}
