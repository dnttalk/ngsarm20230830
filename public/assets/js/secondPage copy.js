
let arr1String = ''
let arr2String = ''

$(function () {
    generateArrString()
    sampleNumberUpdateEvent()
    nextPageEvent()
    checkBoxEvent()

});

let generateArrString = function () {
    for (let i = 0; i < arr1.length; i++) {
        arr1String = arr1String + `<option value="${arr1[i]}">${arr1[i]}</option>`
    }
    for (let i = 0; i < arr2.length; i++) {
        arr2String = arr2String + `<option value="${arr2[i]}">${arr2[i]}</option>`
    }
}

let checkBoxEvent = function () {
    $('input:checkbox').on('change', function () {
        if ($('#magn:checked').length > 0 && $('#pm1:checked').length > 0 && $('#pm2:checked').length > 0) {
            $('.nextPage').css('cursor', 'pointer')
            $('.nextPage').css('background-color', 'rgb(0, 0, 204)')
            $('.nextPage').css('color', 'white')
        } else {
            $('.nextPage').css('cursor', 'not-allowed')
            $('.nextPage').css('background-color', 'rgb(51, 204, 51)')
            $('.nextPage').css('color', 'black')
        }
    });
}

let nextPageEvent = function () {
    $('.nextPage').css('cursor', 'not-allowed')
    $('.nextPage').click(function () {
        if ($('#magn:checked').length > 0 && $('#pm1:checked').length > 0 && $('#pm2:checked').length > 0) {
            window.location.href = "/third";
        }
    })
}

let enableObj = function (count) {

    for (let i = 1; i <= 24; i++) {
        if (i <= count) {
            $(`#tdFirst_${i}`).removeAttr('disabled')
            if ($(`#tdSecond_${i}`).children().length == 0) {
                $(`#tdSecond_${i}`).append(`
                    <select class="select1">
                        ${arr1String}
                    </select>
                    <select class="select2">
                        ${arr2String}
                    </select>
                    `)
            }
        } else {
            $(`#tdSecond_${i}`).empty()
            $(`#tdFirst_${i}`).attr('disabled', 'disabled')
        }
    }
}

let sampleNumberUpdateEvent = function () {
    enableObj($('#sampleNumberInput').val())

    $('#sampleNumberInput').change(function () {
        enableObj($('#sampleNumberInput').val())
    })
}