let pauseStatus = 0;
let intervalObj1 = null;

// 流程狀態變數(之後請以API去改變status)
let processStatus = 1

$(function () {
    pauseEvent()
    poe()

    // 狀態改變
    ChangeStatus()
    flashNumber()

});


let flashNumber = function () {
    let count = 0
    while (count < 5) {
        if (processStatus == 1) {
            $('#statusNumber1').fadeOut(500).fadeIn(500)
        } else if (processStatus == 2) {
            $('#statusNumber2').fadeOut(500).fadeIn(500)
        } else if (processStatus == 3) {
            $('#statusNumber3').fadeOut(500).fadeIn(500)
        } else if (processStatus == 4) {
            $('#statusNumber4').fadeOut(500).fadeIn(500)
        } else if (processStatus == 5) {
            $('#statusNumber5').fadeOut(500).fadeIn(500)
        } else if (processStatus == 6) {
            $('#statusNumber6').fadeOut(500).fadeIn(500)
        }
        count++
    }

}

let ChangeStatus = function () {
    let cStatus = setInterval(function () {
        flashNumber()
        if (processStatus < 7) {
            processStatus++
        } else {
            processStatus++
            clearInterval(cStatus)
            $('#pcText').css('color', 'rgb(44, 235, 44)')
            setTimeout(function () {
                // window.location.href = "/report";
            }, 3000)
        }
    }, 5000)
}

let pauseEvent = function () {
    $('.btn-pause').on('click', function () {
        if (pauseStatus == 0) {
            pauseStatus = 1
            $('.btn-pause-text').text('Continue')
            intervalObj1 = setInterval(function () {
                $('.btn-pause').fadeIn(500).fadeOut(500);
            }, 1000);
        } else {
            $('.btn-pause-text').text('Pause')
            $('.btn-pause').delay(1000).fadeIn(500)
            clearInterval(intervalObj1);
        }
    })
}

let poe = function () {
    $('.btn-confirm').on('click', function () {
        var myModal = new bootstrap.Modal(document.getElementById('EOPModal'), {
            keyboard: false
        })
        myModal.show()
    })
    $('#confirmPOE').on('click', function () {
        window.location.href = "/";
    })
}
let start = function () {
    $('#start').click(function () {
        if (requiredSections.every(section => $(section).hasClass('active'))) {
            $.get("/api/start/M300", function (data) {
                console.log(data);
            });
        }
    });
}
let pause = function () {
    $('#pause').click(function () {
        if (requiredSections.every(section => $(section).hasClass('active'))) {
            $.get("/api/start/M301", function (data) {
                console.log(data);
            });
        }
    });
    // 开始时间（以毫秒为单位）
    let startTime = new Date().getTime();

    // 更新计时器
    function updateTimer() {
        const currentTime = new Date().getTime();
        const Remaining_Time = currentTime - startTime;

        const seconds = Math.floor((Remaining_Time / 1000) % 60);
        const minutes = Math.floor((Remaining_Time / 1000 / 60) % 60);
        const hours = Math.floor((Remaining_Time / 1000 / 60 / 60) % 24);

        const timerElement = document.getElementById('timer');
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        setTimeout(updateTimer, 1000); // 每秒更新一次
    }

    // 开始计时器
    updateTimer();
}