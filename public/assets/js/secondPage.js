let primer1 = [];
let primer2 = [];

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
        let count = parseInt($('#sampleNumberInput').val())
        $('#masterMix').text((10 * (count + 1)).toString() + 'µl')
        $('#primerPool').text((2 * (count + 1)).toString() + 'µl')
        $('#total').text(((10 * (count + 1)) + (2 * (count + 1))).toString() + 'µl')
        $('#cancleChoose').attr('dataId', $(this).attr('id'))
        $('#doneChoose').attr('dataId', $(this).attr('id'))
    })
}

// 檢查是否全部按鈕都Active
let checkEvent = function () {
    if ($('#pm1').hasClass('active') && $('#mb').hasClass('active') && $('#pm2').hasClass('active')) {
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
        if ($('#pm1').hasClass('active') && $('#mb').hasClass('active') && $('#pm2').hasClass('active')) {
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
