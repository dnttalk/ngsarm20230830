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
            let tmp_key = null
            for (const key in json) {
                if (key.toLocaleLowerCase() == id.toLocaleLowerCase()) {
                    tmp_key = key
                }
            }
            $('.samplenumberContainer').append(`
                <h1>Samples: <input type="number" pattern="\d*" max="${json[tmp_key]['SampleLimit']}" min="0" value="0" id="sampleNumberInput" oninput="if(value<0)value=0;if(value>${json[tmp_key]['SampleLimit']})value=${json[tmp_key]['SampleLimit']};" inputmode="numeric" /></h1>
            `)
            primer1 = json[tmp_key]['primer1']
            primer2 = json[tmp_key]['primer2']
            if (json[tmp_key]['Reagents'].length == 3) {
                $('#reagents1').text(json[tmp_key]['Reagents'][0].split(',')[0])
                $('#reagents2').text(json[tmp_key]['Reagents'][1].split(',')[0])
                $('#reagents6').text(json[tmp_key]['Reagents'][2].split(',')[0])
                $('#reagents1').attr('ssName', json[tmp_key]['Reagents'][0].split(',')[1])
                $('#reagents2').attr('ssName', json[tmp_key]['Reagents'][1].split(',')[1])
                $('#reagents6').attr('ssName', json[tmp_key]['Reagents'][2].split(',')[1])
            } else {
                for (let i = 0; i < json[tmp_key]['Reagents'].length; i++) {
                    $(`#reagents${i + 1}`).text(json[tmp_key]['Reagents'][i].split(',')[0])
                    $(`#reagents${i + 1}`).attr('ssName', json[tmp_key]['Reagents'][i].split(',')[1])
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
        $(".showModelName").children().text($(this).attr('ssName'))
        $('.contentInner').empty()
        // $('#currentlyModelName')
        for (const key in formula) {
            if ($(this).attr('ssName').indexOf(key) >= 0) {
                let showData = null
                formula[key].forEach((cell) => {
                    if (cell['Name'] == $(this).attr('ssName')) {
                        showData = cell
                    }
                })
                // 如果有total
                if (showData['total'] == true) {
                    let total = 0
                    let appendText = ''
                    appendText = appendText + '<div class="row"><table style="height:60px" class="mb-5"><tbody>'
                    for (let keyc in showData) {
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
                                appendText = appendText + (`
                                    <tr>
                                        <td class="text-start" style="font-size:18px;font-weight:bold;">${keyc}</td>
                                        <td class="text-start" style="font-size:18px;font-weight:bold;">:</td>
                                        <td class="text-end" style="font-size:18px;font-weight:bold;">${count.toString()}</td>
                                        <td class="text-start" style="font-size:18px;font-weight:bold;">µl</td>
                                    </tr>
                                `)
                            } else {
                                if (keyc == 'iNA_Leukemia_Primer_Pool') {
                                    let tmp_keyc = null
                                    tmp_keyc = keyc.replace('Leukemia', $('#currentlyModelName').text())
                                    appendText = appendText + (`
                                        <tr>
                                            <td class="text-start" style="font-size:18px;font-weight:bold;">${tmp_keyc}</td>
                                            <td class="text-start" style="font-size:18px;font-weight:bold;">:</td>
                                            <td class="text-end" style="font-size:18px;font-weight:bold;">${count.toString()}</td>
                                            <td class="text-start" style="font-size:18px;font-weight:bold;">µl</td>
                                        </tr>
                                    `)
                                } else {
                                    appendText = appendText + (`
                                        <tr>
                                            <td class="text-start" style="font-size:18px;font-weight:bold;">${keyc}</td>
                                            <td class="text-start" style="font-size:18px;font-weight:bold;">:</td>
                                            <td class="text-end" style="font-size:18px;font-weight:bold;">${count.toString()}</td>
                                            <td class="text-start" style="font-size:18px;font-weight:bold;">µl</td>
                                        </tr>
                                    `)
                                }

                            }
                            total = total + count
                        }
                        if (keyc == 'total') {
                            appendText = appendText + (`
                                <tr><td colspan="4"><hr class="my-4"></td></tr>
                                <tr>
                                    <td class="text-start" style="font-size:18px;font-weight:bold;">Total</td>
                                    <td class="text-start" style="font-size:18px;font-weight:bold;">:</td>
                                    <td class="text-end" style="font-size:18px;font-weight:bold;">${total}</td>
                                    <td class="text-start" style="font-size:18px;font-weight:bold;">µl</td>
                                </tr>
                            `)
                        }
                    }
                    appendText = appendText + '</tbody></table></div>'
                    $('.contentInner').append(appendText)

                } else {
                    console.log($('#currentlyModelName').text())
                    let appendText = ''
                    appendText = appendText + '<div class="row"><table style="height:60px" class="mb-5"><tbody>'
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
                            appendText = appendText + (`
                                <tr>
                                    <td class="text-start" style="font-size:18px;font-weight:bold;">${keyc}</td>
                                    <td class="text-start" style="font-size:18px;font-weight:bold;">:</td>
                                    <td class="text-end" style="font-size:18px;font-weight:bold;">${count.toString()}</td>
                                    <td class="text-start" style="font-size:18px;font-weight:bold;">µl</td>
                                </tr>
                            `)

                        }
                    }
                    appendText = appendText + '</tbody></table></div>'
                    $('.contentInner').append(appendText)
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
        $('.countPopBtn').each(function () {
            if (!$(this).hasClass('disabled')) {
                $(this).removeClass('active')
            }
        })
        checkEvent()
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
