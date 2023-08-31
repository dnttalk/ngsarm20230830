let primer1 = [];
let primer2 = [];
let formula = null

$(function () {
    init()
    nextPageEvent()
    countPopBtnEvent()
    checkDoneEvent()
    openKeyboardEvent()
    updateSscircleBtnEvent()
});
// 初始化
let init = function () {
    let id = getUrlParameter('id')
    fetch('/assets/data/sample.json')
        .then((response) => response.json())
        .then((json) => {
            $('.samplenumberContainer').append(`
                <h1>Samples: <input type="number" pattern="\d*" max="${json[id]['SampleLimit']}" min="1" value="1" id="sampleNumberInput" oninput="if(value<=0)value=1;if(value>${json[id]['SampleLimit']})value=${json[id]['SampleLimit']};" inputmode="numeric" /></h1>
            `)
            primer1 = json[id]['primer1']
            primer2 = json[id]['primer2']
            if (json[id]['Reagents'].length == 3) {
                $('#reagents1').text(json[id]['Reagents'][0])
                $('#reagents2').text(json[id]['Reagents'][1])
                $('#reagents6').text(json[id]['Reagents'][2])
            } else {
                for (let i = 0; i < json[id]['Reagents'].length; i++) {
                    $(`#reagents${i + 1}`).text(json[id]['Reagents'][i])
                }
            }
            $('.countPopBtn').each(function () {
                if ($(this).text() == '') {
                    $(this).addClass('disabled')
                    $(this).attr('disabled', true)
                }
            })
        });
    fetch('/assets/data/formula.json')
        .then((response) => response.json())
        .then((json) => {
            formula = json
        });
}

// 檢查項
let checkDoneEvent = function () {
    $('#cancleChoose').click(function () {
        $(`#${$('#cancleChoose').attr('dataId')}`).removeClass('active')
        checkEvent()
    })
    $('#doneChoose').click(function () {
        $(`#${$('#cancleChoose').attr('dataId')}`).addClass('active')
        checkEvent()
    })
}

// 試算µl
let countPopBtnEvent = function () {
    $('.countPopBtn').click(function () {
        $(".showModelName").children().text($(this).text())
        $('.contentInner').empty()
        for (const key in formula) {
            if ($(this).text().indexOf(key) >= 0) {
                let showData = null
                formula[key].forEach((cell) => {
                    if (cell['Name'] == $(this).text()) {
                        showData = cell
                    }
                })
                // 如果有total

                if (showData['total'] == true) {
                    let total = 0
                    for (const keyc in showData) {
                        if (keyc != 'Name' && keyc != 'total') {
                            let count = parseInt($('#sampleNumberInput').val())
                            for (let i = 1; i < 5; i++) {
                                if (showData[keyc][`count${i}`]) {
                                    if (showData[keyc][`count${i}`].indexOf('+') >= 0) {
                                        count = count + parseInt(showData[keyc][`count${i}`].replace('+', ''))
                                    }
                                    if (showData[keyc][`count${i}`].indexOf('*') >= 0) {
                                        count = count * parseInt(showData[keyc][`count${i}`].replace('*', ''))
                                    }
                                }
                            }
                            if (showData['Name'] == 'Fragmen-tation Mix') {
                                $('.contentInner').append(`
                                    <div class="row">
                                        <div class="modalText" style="justify-content: space-between; padding-bottom: 2rem;">
                                            <p style="font-size:20px;">${keyc}</span>&emsp;:</p>
                                            <p style="font-size:20px;"><span id="masterMix">${count.toString() + 'µl'}</span></p>
                                        </div>
                                    </div>
                                `)
                            } else {
                                $('.contentInner').append(`
                                    <div class="row">
                                        <div class="modalText" style="display: flex; justify-content: space-between; padding-bottom: 2rem;">
                                            <p style="font-size:20px;">${keyc}</span>&emsp;:</p>
                                            <p style="font-size:20px;"><span id="masterMix">${count.toString() + 'µl'}</span></p>
                                        </div>
                                    </div>
                                `)
                            }
                            total = total + count
                        }
                        if (keyc == 'total') {
                            $('.contentInner').append(`
                            <hr class="my-4">
                            <div class="row my-4">
                                <div class="modalText" style="display: flex; justify-content: space-between;">
                                    <p style="font-size:20px">Total&emsp;:</p>
                                    <p style="font-size:20px"><span id="total">${total}µl</span></p>
                                </div>
                            </div>
                        `)
                        }
                    }
                } else {
                    for (const keyc in showData) {
                        if (keyc != 'Name' && keyc != 'total') {
                            let count = parseInt($('#sampleNumberInput').val())
                            for (let i = 1; i < 5; i++) {
                                if (showData[keyc][`count${i}`]) {
                                    if (showData[keyc][`count${i}`].indexOf('+') >= 0) {
                                        count = count + parseInt(showData[keyc][`count${i}`].replace('+', ''))
                                    }
                                    if (showData[keyc][`count${i}`].indexOf('*') >= 0) {
                                        count = count * parseInt(showData[keyc][`count${i}`].replace('*', ''))
                                    }
                                }
                            }
                            $('.contentInner').append(`
                                <div class="row">
                                    <div class="modalText" style="display: flex; justify-content: space-between; padding-bottom: 2rem;">
                                        <p style="font-size:20px;">${keyc}</span>&emsp;:</p>
                                        <p style="font-size:20px;"><span id="masterMix">${count.toString() + 'µl'}</span></p>
                                    </div>
                                </div>
                            `)

                        }
                    }
                }
            }
        }
        $('#cancleChoose').attr('dataId', $(this).attr('id'))
        $('#doneChoose').attr('dataId', $(this).attr('id'))
    })
}

// 檢查是否全部按鈕都Active
let checkEvent = function () {
    let checkAllBtnActive = true
    $('.countPopBtn').each(function () {
        if (!$(this).hasClass('disabled')) {
            if (!$(this).hasClass('active')) {
                checkAllBtnActive = false
            }
        }
    })
    if (checkAllBtnActive) {
        $('.nextPage').css('cursor', 'pointer')
        $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
        $('.nextPage').css('color', 'white')
    } else {
        $('.nextPage').css('cursor', 'not-allowed')
        $('.nextPage').css('background-color', '#d8d8d8')
        $('.nextPage').css('color', 'rgb(0, 176, 240)')
    }
}
// 下一頁允許事件
let nextPageEvent = function () {
    $('.nextPage').css('cursor', 'not-allowed')
    $('.nextPage').click(function () {
        let id = getUrlParameter('id')
        let checkAllBtnActive = true
        $('.countPopBtn').each(function () {
            if (!$(this).hasClass('disabled')) {
                if (!$(this).hasClass('active')) {
                    checkAllBtnActive = false
                }
            }
        })
        if (checkAllBtnActive) {
            window.location.href = "/secondCheck?id=" + id + "&scount=" + $('#sampleNumberInput').val();
        }
    })
}

let openKeyboardEvent = function () {
    $(document).on('click', '#sampleNumberInput', function (e) {
        $('#keyboardContainer').css('display', 'block')
    })
}

const keyboard = document.getElementById('keyboard');
const keys = document.querySelectorAll('.key');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const ok = document.getElementById('ok');

let updateSscircleBtnEvent = function () {
    for (let i = 1; i <= 24; i++) {
        if (i <= $('#sampleNumberInput').val()) {
            $(`#tdFirst_${i}`).find('.sscircle').addClass('active')
            $(`#tdSecond_${i}`).find('.sscircle').addClass('active')
        } else {
            $(`#tdFirst_${i}`).find('.sscircle').removeClass('active')
            $(`#tdSecond_${i}`).find('.sscircle').removeClass('active')
        }
    }
}

keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.textContent;
        if (value === '←') {
            if ($('#sampleNumberInput').val().slice(0, -1) == '') {
                $('#sampleNumberInput').val(1)
            } else {
                $('#sampleNumberInput').val() = $('#sampleNumberInput').val().slice(0, -1);
            }
        } else if (value === 'C') {
            $('#sampleNumberInput').val(1)
        } else if (value === 'OK') {
            $('#keyboardContainer').css('display', 'none')
        } else {
            if (parseInt($('#sampleNumberInput').val()) + parseInt(value) >= parseInt($('#sampleNumberInput').attr('max'))) {
                $('#sampleNumberInput').val(parseInt($('#sampleNumberInput').attr('max')))
            } else {
                $('#sampleNumberInput').val(parseInt($('#sampleNumberInput').val()) + parseInt(value))
            }
        }
        updateSscircleBtnEvent()
    });
});
