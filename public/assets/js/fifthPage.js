let pauseStatus = 0;
let intervalObj1 = null;
let processStatus = 1;
let timerPaused = false;  // 初始狀態為計時器運行
let intervalId = null;    // 計時器間隔的 ID
let startTime = Date.now();
let pausedTime = null

$(function () {
    // pauseEvent();
    poe();
    setupActionButtons(); // 設定開始和暫停按鈕的點擊事件
    startTimer();// 初始狀態下啟動計時器
    flashNumber();
});
let poe = function () {
    $('.btn-confirm').on('click', function () {
        var myModal = new bootstrap.Modal(document.getElementById('EOPModal'), {
            keyboard: false
        });
        myModal.show();
    });
    $('.confirmPOE').on('click', async function () {
        console.log("初始化");
        clearInterval(intervalId);
        setTimeout(function () {
            $.get("/api/start/M302", function (data) {
                console.log(data);
            });
        }, 2000); //延遲傳送(重要)
        setTimeout(function () {
            window.location.href = "/";
        }, 2500);
    });
};
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



function performAction(apiEndpoint, requiredSections) {
    if (requiredSections.every(section => $(section).hasClass('active'))) {
        $.get(apiEndpoint, function (data) {
            console.log(data);
        });
    }
}

function setupActionButtons() {
    $('#start').click(function () {
        console.log("Pause button play");
        if ($('#start').hasClass('active')) {
            // 其他操作，例如觸發開始 API 端點
            $('#start').removeClass('active')
            setTimeout(function () {
                $.get("/api/start/M300", function (data) {
                    console.log(data);
                    $('#pause').addClass('active')
                    timerPaused = false;
                    startTimer();
                });
            }, 1000);

        }
    });

    $('#pause').click(function () {
        console.log("Pause button clicked");
        if ($('#pause').hasClass('active')) {
            // 從元素中移除 "active" 類別
            $('#pause').removeClass('active');

            // 暫停計時器（如果適用）
            timerPaused = true;
            clearInterval(intervalId);

            // 使用 setTimeout 進行延遲的 API 請求
            setTimeout(function () {
                $.get("/api/start/M301", function (data) {
                    console.log(data);
                    $('#start').addClass('active');
                });
            }, 4000); //延遲傳送(重要)
        }
    });
}

function startTimer() {
    intervalId = setInterval(function () {
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
            }
        });
        flashNumber();
    }, 1000);
}
