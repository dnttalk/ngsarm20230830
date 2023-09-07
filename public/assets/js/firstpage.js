let status = 0;
const statusArr = ['PCR Open', 'PCR Opening', 'PCR Close', 'PCR Closing'];
const $pcrBtn = $('#pcrBtn'); // Cache the button element

$(function () {
    resetCookie();
    btnAnimation();
    // 選擇事件
    loadAllSampleBtn();
    btnChooseEvent();
});

let loadAllSampleBtn = function () {
    fetch('/assets/data/sample.json')
        .then((response) => response.json())
        .then((json) => {
            Object.keys(json).forEach(function (k) {
                $('.chooseContainer').append(`
                <div class="col-3 mx-3">
                    <button id="${k.toLocaleLowerCase()}" class="fsbtn btn btn-primary border-5">${k}</button>
                </div>
                `)
            });
        });

    let rStatus = getUrlParameter('rediret')
    if (rStatus == 'true') {
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal2'), {
            keyboard: true
        });
        myModal.show();
    }
}

let resetCookie = function () {
    $.removeCookie("sname");
    $.removeCookie("lotnumber");
    $.removeCookie("cmodelname");
    $.removeCookie("reportTable");
}

async function statusEvent() {
    status = (status + 1) % 4;
    $pcrBtn.text(statusArr[status]);

    if (statusArr[status] === 'PCR opening') {
        try {
            const response = await $.get("/api/pcrlib/open");
            console.log(response);
        } catch (error) {
            console.error("Error opening PCR:", error);
        }
    }

    if (statusArr[status] === 'PCR closing') {
        try {
            const response = await $.get("/api/pcrlib/close");
            console.log(response);
        } catch (error) {
            console.error("Error closing PCR:", error);
        }
    }
}

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

function fadeAnimation($element, duration) {
    return new Promise((resolve) => {
        $element.fadeOut(duration, () => {
            $element.fadeIn(duration, resolve);
        });
    });
}
let curryInput = '#sName';
let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    mergeDisplay: true,
    layoutName: "default",
    layout: {
        default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{shift} z x c v b n m {backspace}",
            "{numbers} {space} {ent}"
        ],
        shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{shift} Z X C V B N M {backspace}",
            "{numbers} {space} {ent}"
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]

    },
    display: {
        "{numbers}": "123",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC"
    }
});



// 处理数字按钮切换
function handleNumbers() {
    let currentLayout = keyboard.options.layoutName;
    let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

    keyboard.setOptions({
        layoutName: numbersToggle
    });
}

// 在输入框点击时显示虚拟键盘
$(".input").click(function () {
    curryInput = '#' + $(this).attr('id');
    document.querySelector(curryInput).addEventListener("input", event => {
        keyboard.setInput(event.target.value);
    });
    // 显示虚拟键盘
    document.querySelector(".simple-keyboard").style.display = "block";
})
// 添加点击事件监听器到 document
document.addEventListener("click", function (event) {
    // 获取点击的元素
    const clickedElement = event.target;

    // 获取虚拟键盘元素
    const keyboardElement = document.querySelector(".simple-keyboard");

    // 获取所有具有 input 类的元素
    const inputElements = document.querySelectorAll(".input");

    // 检查点击的元素是否是输入元素之外的区域
    if (!keyboardElement.contains(clickedElement) && !isInputElement(clickedElement, inputElements)) {
        // 隐藏虚拟键盘
        keyboardElement.style.display = "none";
    }
});

// 辅助函数：检查元素是否是输入元素
function isInputElement(element, inputElements) {
    for (const inputElement of inputElements) {
        if (inputElement.contains(element)) {
            return true;
        }
    }
    return false;
}

function onKeyPress(button) {
    const maxInputLength = 10; // 设置最大输入字符数量
    const currentInput = document.querySelector(curryInput).value;
    if (button == '{backspace}') {
        document.querySelector(curryInput).value = document.querySelector(curryInput).value.substring(0, document.querySelector(curryInput).value.length - 1);
    } else if (button == '{backspace}' || button == '{shift}' || button == '{ent}' || button == '{enter}' || button == '{numbers}' || button == '{abc}') {

    } else if (button == '{space}') {
        if (currentInput.length < maxInputLength) {
            document.querySelector(curryInput).value = currentInput + ' ';
        }
    } else {
        if (currentInput.length < maxInputLength) {
            document.querySelector(curryInput).value = currentInput + button;
        }
    }
    console.log("Button pressed", button);

    if (button === "{numbers}" || button === "{abc}") handleNumbers();
    if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
    let currentLayout = keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    keyboard.setOptions({
        layoutName: shiftToggle,
        physicalKeyboardHighlight: true, // 可以高亮显示与物理键盘相对应的虚拟键
        debug: true // 启用调试模式，方便调试样式和位置
    });
}
function handleNumbers() {
    let currentLayout = keyboard.options.layoutName;
    let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

    keyboard.setOptions({
        layoutName: numbersToggle
    });
}
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
    })
    $('#exampleModal2').on('hide.bs.modal', function (e) {
        // 检查输入字段的值。
        if ($('#sName').val().length == 0 || $('#lotnumber').val().length == 0) {
            // 如果任何一个输入字段为空，阻止模态框关闭。
            e.preventDefault();
            e.stopPropagation();
            // 可选择添加更多逻辑，以显示错误消息或更改输入框的边框以指示问题。
        }
    });
}

function showCenteredAlert(message) {
    var alertContainer = $('<div>').addClass('alert-container');
    var alertBox = $('<div>').addClass('alert-box').text(message);
    alertContainer.append(alertBox);
    $('body').append(alertContainer);

    // Remove the alert after a certain time
    setTimeout(function () {
        alertContainer.remove();
    }, 3000); // Remove after 2 seconds
}
$(document).ready(function () {
    $("#existBtn").click(function () {
        $("#exampleModal").modal("show");
    });
    btnChooseEvent();
})