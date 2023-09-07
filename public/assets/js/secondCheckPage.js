let arr1 = [];
let arr2 = [];
$(function () {
    initData()
    nextPageEvent()
    prevPageEvent()
    tdEvent()
});

let initData = function () {
    let scount = getUrlParameter('scount')
    console.log(scount)
    $('#sampleNumberInput').val(scount)
    resetSAIColor()
    let id = getUrlParameter('id')
    fetch('../assets/data/sample.json')
        .then((response) => response.json())
        .then((json) => {
            let tmp_key = null
            for (const key in json) {
                if (key.toLocaleLowerCase() == id.toLocaleLowerCase()) {
                    tmp_key = key
                }
            }
            $('.samplenumberContainer').append(`
                <h1>Samples: <input type="number" pattern="\d*" max="${json[tmp_key]['SampleLimit']}" min="1" value="1" id="sampleNumberInput" oninput="if(value<=0)value=1;if(value>${json[tmp_key]['SampleLimit']})value=${json[tmp_key]['SampleLimit']};" inputmode="numeric" /></h1>
            `)
            arr1 = json[tmp_key]['primer1']
            arr2 = json[tmp_key]['primer2']
            for (let i = 0; i < arr1.length; i++) {
                arr1[i] = arr1[i].replace(' Primer', '')
            }
            for (let i = 0; i < arr2.length; i++) {
                arr2[i] = arr2[i].replace(' Primer', '')
            }
        });
}

// resetSampleAndIndexColor
let resetSAIColor = function () {
    for (let i = 1; i <= parseInt($('#sampleNumberInput').val()); i++) {
        $(`#tdFirst_${i}`).css('background-color', 'rgb(125, 194, 251)')
        $(`#tdSecond_${i}`).css('background-color', 'rgb(125, 194, 251)')
    }
}

// 下一頁允許事件
let nextPageEvent = function () {
    $('.nextPage').click(function () {
        let check = 1
        let checksn = []
        let checks1s2 = []
        for (let i = 1; i <= 24; i++) {
            if (i <= $('#sampleNumberInput').val()) {
                let attr = $(`#tdFirst_${i}`).attr('sn');
                if (typeof attr !== 'undefined' && attr !== false) {
                } else {
                    check = 0
                }
                if (checksn.includes($(`#tdFirst_${i}`).attr('sn'))) {
                    check = 0
                } else {
                    checksn.push($(`#tdFirst_${i}`).attr('sn'))
                }
                if (checks1s2.includes($(`#tdSecond_${i}`).text())) {
                    check = 0
                } else {
                    checks1s2.push($(`#tdSecond_${i}`).text())
                }
            }
        }
        if (check) {
            let history = []
            for (let i = 1; i <= 24; i++) {
                if (i <= $('#sampleNumberInput').val()) {
                    history.push([$(`#tdFirst_${i}`).attr('id'), $(`#tdFirst_${i}`).attr('sn'), $(`#tdFirst_${i}`).attr('s1'), $(`#tdFirst_${i}`).attr('s2')])
                }
            }
            $.cookie("reportTable", history, { path: '/' });
            let id = getUrlParameter('id')
            window.location.href = "/third?id=" + id;
        } else {
            showCenteredAlert('Please Complate Sample&Index Setting!')
        }

    })
}
// 上一頁事件
let prevPageEvent = function () {
    $('.prevPage').click(function () {
        let id = getUrlParameter('id')
        window.location.href = "/second?id=" + id;
    })
}

let checkEvent = function () {
    let check = 1
    let checksn = []
    let checks1s2 = []
    for (let i = 1; i <= 24; i++) {
        if (i <= $('#sampleNumberInput').val()) {
            let attr = $(`#tdFirst_${i}`).attr('sn');
            if (typeof attr !== 'undefined' && attr !== false) {
            } else {
                check = 0
            }
            if (checksn.includes($(`#tdFirst_${i}`).attr('sn'))) {
                check = 0
            } else {
                checksn.push($(`#tdFirst_${i}`).attr('sn'))
            }
            if (checks1s2.includes($(`#tdSecond_${i}`).text())) {
                check = 0
            } else {
                checks1s2.push($(`#tdSecond_${i}`).text())
            }
        }
    }
    if (check) {
        $('.nextPage').css('cursor', 'pointer')
        $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
        $('.nextPage').css('color', 'white')
    } else {
        $('.nextPage').css('cursor', 'not-allowed')
        $('.nextPage').css('background-color', '#d8d8d8')
        $('.nextPage').css('color', 'rgb(0, 176, 240)')
    }
}

let tdEvent = function () {
    $('td').click(function () {
        if (parseInt($(this).attr('id').split('Second_')[1]) <= $('#sampleNumberInput').val()) {
            $(`#tdFirst_${$(this).attr('id').split('Second_')[1]}`).click()
        }
        if (parseInt($(this).attr('id').split('First_')[1]) <= $('#sampleNumberInput').val()) {
            $('#cancleChoose2').attr('dataNumber', $(this).attr('id').split('First_')[1])
            $('#doneChoose2').attr('dataNumber', $(this).attr('id').split('First_')[1])
            $('#showSampleIndexCell').text($(this).attr('rowName') + '-' + $(this).attr('colName'))
            $('.siBtnContainer').empty()
            $('#sName').val('')
            for (let i = 0; i < arr1.length; i++) {
                $('.siBtnContainer').append(`
                    <div class="col-3">
                        <button class="selectionBtn1">${arr1[i]}</button>
                    </div>
                `)
            }
            for (let i = 0; i < arr2.length; i++) {
                $('.siBtnContainer').append(`
                    <div class="col-3">
                        <button class="selectionBtn2">${arr2[i]}</button>
                    </div>
                `)
            }
            let attr1 = $(this).attr('sn');
            let attr2 = $(this).attr('s1');
            let attr3 = $(this).attr('s2');
            if (typeof attr1 !== 'undefined' && attr1 !== false) {
                $('#sName').val(attr1)
            }
            if (typeof attr2 !== 'undefined' && attr2 !== false) {
                $(".selectionBtn1").each(function (index) {
                    if ($(this).text() == attr2) {
                        $(this).addClass('active')
                    }
                })
            }
            if (typeof attr3 !== 'undefined' && attr3 !== false) {
                $(".selectionBtn2").each(function (index) {
                    if ($(this).text() == attr3) {
                        $(this).addClass('active')
                    }
                })
            }
            let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop2'), {
                keyboard: true
            });
            myModal.show();
        }

    })
    $(document).on('click', '.selectionBtn1', async function (e) {
        if (arr1.includes($(this).text()) && arr2.includes($('.selectionBtn2.active').text())) {
            $('.selectionBtn1').removeClass('active')
            $(this).addClass('active')
        } else {
            $('.selectionBtn1').removeClass('active')
            $(this).addClass('active')
        }

    })
    $(document).on('click', '.selectionBtn2', async function (e) {
        if (arr1.includes($('.selectionBtn1.active').text()) && arr2.includes($(this).text())) {

            $('.selectionBtn2').removeClass('active')
            $(this).addClass('active')

        } else {
            $('.selectionBtn2').removeClass('active')
            $(this).addClass('active')
        }

    })
    $('#cancleChoose2').click(function () {
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).removeAttr('sn')
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).removeAttr('s1')
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).removeAttr('s2')
        $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).text('')
        $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).text('')
        checkEvent()
    })
    $('#doneChoose2').click(function () {
        resetSAIColor()
        if ($('#sName').val() != '' && arr1.includes($('.selectionBtn1.active').text()) && arr2.includes($('.selectionBtn2.active').text())) {

            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).attr('sn', $('#sName').val())
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).attr('s1', $('.selectionBtn1.active').text())
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).attr('s2', $('.selectionBtn2.active').text())
            $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).text($('#sName').val())
            $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).text($('.selectionBtn1.active').text() + '   ' + $('.selectionBtn2.active').text())
            let check1 = 0
            let check2 = 0
            let getSameID = 0
            for (let i = 1; i <= 24; i++) {
                if (i != parseInt($('#doneChoose2').attr('dataNumber'))) {
                    if ($(`#tdFirst_${i}`).attr('sn') == $('#sName').val()) {
                        check1 = 1
                        getSameID = i
                    }
                    if ($(`#tdFirst_${i}`).attr('s1') == $('.selectionBtn1.active').text() && $(`#tdFirst_${i}`).attr('s2') == $('.selectionBtn2.active').text()) {
                        check2 = 1
                        getSameID = i
                    }
                }

            }
            if (check1) {
                $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'red')
                // $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'red')
                $(`#tdFirst_${getSameID}`).css('background-color', 'red')
                // $(`#tdSecond_${getSameID}`).css('background-color', 'red')
            } else {
                $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'rgb(125, 194, 251)')
                // $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'rgb(125, 194, 251)')
                $(`#tdFirst_${getSameID}`).css('background-color', 'rgb(125, 194, 251)')
                // $(`#tdSecond_${getSameID}`).css('background-color', 'rgb(125, 194, 251)')
            }
            if (check2) {
                // $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'red')
                $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'red')
                // $(`#tdFirst_${getSameID}`).css('background-color', 'red')
                $(`#tdSecond_${getSameID}`).css('background-color', 'red')
            } else {
                // $(`#tdFirst_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'rgb(125, 194, 251)')
                $(`#tdSecond_${$('#doneChoose2').attr('dataNumber')}`).css('background-color', 'rgb(125, 194, 251)')
                // $(`#tdFirst_${getSameID}`).css('background-color', 'rgb(125, 194, 251)')
                $(`#tdSecond_${getSameID}`).css('background-color', 'rgb(125, 194, 251)')
            }
            checkEvent()
        } else {
            showCenteredAlert('Please Check Sample Number and Selection !')
        }
    })
}
let curryInput = '#sName'
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

function handleNumbers() {
    let currentLayout = keyboard.options.layoutName;
    let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

    keyboard.setOptions({
        layoutName: numbersToggle
    });
}
$(".input").click(function () {
    curryInput = '#' + $(this).attr('id')
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
function onChange(input) {

}
function onKeyPress(button) {
    const maxInputLength = 10; // 设置最大输入字符数量
    const inputElement = document.querySelector(curryInput);

    if (button === '{backspace}') {
        inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
    } else if (button === '{space}') {
        inputElement.value += ' ';
    } else if (button !== '{shift}' && button !== '{ent}' && button !== '{enter}' && button !== '{numbers}' && button !== '{abc}') {
        if (inputElement.value.length < maxInputLength) {
            inputElement.value += button;
        }
    }

    console.log("Button pressed", button);

    if (button === "{numbers}" || button === "{abc}") {
        handleNumbers();
    }

    if (button === "{shift}" || button === "{lock}") {
        handleShift();
    }
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
function showCenteredAlert(message) {
    var alertContainer = $('<div>').addClass('alert-container');
    var alertBox = $('<div>').addClass('alert-box').text(message);
    alertContainer.append(alertBox);
    $('body').append(alertContainer);
    setTimeout(function () {
        alertContainer.remove();
    }, 2000);
}
