// 定義 PCR 狀態
const statusArr = ['PCR open', 'PCR opening', 'PCR close', 'PCR closing'];
let status = 0;

// 緩存按鈕元素
const $pcrBtn = $('#pcrBtn');

// 初始化
$(function () {
    resetCookie();
    btnAnimation();
    loadAllSampleBtn();
    btnChooseEvent();
});

// 狀態變更處理函數
async function statusEvent() {
    status = (status + 1) % 4;
    $pcrBtn.text(statusArr[status]);

    try {
        if (statusArr[status] === 'PCR opening') {
            const response = await $.get("/api/pcrlib/open");
            console.log(response);
        } else if (statusArr[status] === 'PCR closing') {
            const response = await $.get("/api/pcrlib/close");
            console.log(response);
        }
    } catch (error) {
        console.error(`Error ${statusArr[status]} PCR:`, error);
    }
}

// 按鈕點擊動畫處理
function btnAnimation() {
    $pcrBtn.on('click', async function () {
        statusEvent();
        $pcrBtn.prop('disabled', true);

        for (let count = 0; count < 5; count++) {
            await fadeAnimation($pcrBtn, 500);
        }

        statusEvent();
        $pcrBtn.prop('disabled', false);
    });
}

// 淡入淡出動畫處理函數
function fadeAnimation($element, duration) {
    return new Promise((resolve) => {
        $element.fadeOut(duration, () => {
            $element.fadeIn(duration, resolve);
        });
    });
}

// 載入所有樣本按鈕
function loadAllSampleBtn() {
    fetch('/assets/data/sample.json')
        .then((response) => response.json())
        .then((json) => {
            const chooseContainer = $('.chooseContainer');
            Object.keys(json).forEach(function (k) {
                chooseContainer.append(`
                <div class="col-3 mx-3">
                    <button id="${k.toLocaleLowerCase()}" class="fsbtn btn btn-primary border-5">${k}</button>
                </div>
                `)
            });
        });

    const rStatus = getUrlParameter('rediret');
    if (rStatus == 'true') {
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal2'), {
            keyboard: true
        });
        myModal.show();
    }
}

// 重置 cookie
function resetCookie() {
    $.removeCookie("sname");
    $.removeCookie("lotnumber");
    $.removeCookie("cmodelname");
    $.removeCookie("reportTable");
}

// 選擇按鈕事件處理
function btnChooseEvent() {
    $(document).on('click', '.fsbtn', function (e) {
        if ($('#sName').val().length == 0 || $('#lotnumber').val() == 0) {
            showCenteredAlert("Please input Sample Name and LotNumber");
            $('#sName').css('border-color', 'red');
            $('#lotnumber').css('border-color', 'red');
            e.preventDefault();

        } else {
            $('#sName').css('border-color', '');
            $('#lotnumber').css('border-color', '');
            $.cookie("sname", $('#sName').val(), { path: '/' });
            $.cookie("lotnumber", $('#lotnumber').val(), { path: '/' });
            $.cookie("cmodelname", $(this).attr('id'), { path: '/' });
            window.location.href = "/second?id=" + $(this).attr('id');
        }
    });

    $('#exampleModal2').on('hide.bs.modal', function (e) {
        if ($('#sName').val().length == 0 || $('#lotnumber').val().length == 0) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
}

// 顯示中央警告函數
function showCenteredAlert(message) {
    const alertContainer = $('<div>').addClass('alert-container');
    const alertBox = $('<div>').addClass('alert-box').text(message);
    alertContainer.append(alertBox);
    $('body').append(alertContainer);

    // 一段時間後刪除警告
    setTimeout(function () {
        alertContainer.remove();
    }, 3000); // 3 秒後刪除
}

// 虛擬鍵盤相關代碼...

// 其他事件處理...

// 文檔就緒事件處理
$(document).ready(function () {
    $("#existBtn").click(function () {
        $("#exampleModal").modal("show");
    });
    btnChooseEvent();
});