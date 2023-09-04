$(document).ready(function () {
    const requiredSections = [
        '#trx1',
        //  '#reagents', '#sample', '#ipcrm',
        '#96wpcrp',
        '#trx3', '#12wpwr', '#dwp', '#ashcan', '#erc'
    ];
    function updateNextButtonState() {
        const allSectionsActive = requiredSections.every(section => $(section).hasClass('active'));
        const $nextPageButton = $('.nextPage');
        if (allSectionsActive) {
            $nextPageButton.css({
                'cursor': 'pointer',
                'background-color': 'rgb(0, 0, 204)',
                'color': 'white'
            });
        } else {
            $nextPageButton.css({
                'cursor': 'not-allowed',
                'background-color': '#d8d8d8',
                'color': 'rgb(0, 176, 240)'
            });
        }
    }
    function updateBorderColor() {
        $('.border-solid').each(function () {
            let activeBorder = 1
            $(this).find('.btn').each(function () {
                if ($(this).hasClass('active')) {
                } else {
                    activeBorder = 0
                }
            })
            if (activeBorder) {
                $(this).addClass('active')
            } else {
                $(this).removeClass('active')
            }
        })
    }

    $('.checkbtn').click(function () {
        const clickedId = $(this).attr('id');
        $('#cancleChoose, #doneChoose').attr('dataId', clickedId);
    });

    $('#cancleChoose').click(function () {
        const dataId = $(this).attr('dataId');
        $(`#${dataId}`).removeClass('active');
        updateNextButtonState();
        updateBorderColor();
    });

    $('#doneChoose').click(function () {
        const dataId = $(this).attr('dataId');
        $(`#${dataId}`).addClass('active');
        updateNextButtonState();
        updateBorderColor();
    });

    $('.nextPage').click(function () {
        if (requiredSections.every(section => $(section).hasClass('active'))) {
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'))
            modal.show()
        }
    });

    $('#btn-go').click(function () {
        $.get("/api/start/stepstart", function (data) {
            console.log(data);
        });
        let id = getUrlParameter('id')
        if (id) {
            window.location.href = "/fifth?id=" + id;
        }
    })

    $('#checkcBtn').click(function () {
        if ($(this).text() == 'All Set!') {
            $(this).text('unset!')
            $('.border-solid').each(function () {
                $(this).find('.btn').each(function () {
                    $(this).addClass('active')
                })
                $(this).addClass('active')
            })
            updateNextButtonState();
            updateBorderColor();
        } else {
            $(this).text('All Set!')
            $('.border-solid').each(function () {
                // unset時排除例外
                if ($(this).find('.btn').hasClass('exception')) {

                } else {
                    $(this).find('.btn').each(function () {
                        $(this).removeClass('active')
                    })
                    $(this).removeClass('active')
                }
            })
            updateNextButtonState();
            updateBorderColor();
        }
    })

    $('.prevPage').click(function () {
        let id = getUrlParameter('id')
        if (id) {
            window.location.href = "/second?id=" + id;
        }
    })

    $('.checkbtn').click(function () {
        $('#showModelName12').text('')
        $('#showModelCount').text('')
        if ($(this).text().indexOf('12 well plate with reagent') >= 0) {
            $('#showModelName12').text('12 well plate with reagent')
            $('#showModelCount').text($(this).text())
            $('#sampleImg').attr('src', '/assets/img/a.png')
        }
        else if ($(this).text().indexOf('Tip Rack A') >= 0) {
            $('#showModelName12').text('Tip Rack A')
            $('#showModelCount').text($(this).text())
            $('#sampleImg').attr('src', '/assets/img/Tip Rack A.png')
        } else if ($(this).text().indexOf('Tip Rack B') >= 0) {
            $('#showModelName12').text('Tip Rack B')
            $('#showModelCount').text($(this).text())
            $('#sampleImg').attr('src', '/assets/img/Tip Rack B.png')
        } else {
            $('#showModelName12').text($(this).text())
            $('#sampleImg').attr('src', '/assets/img/' + $(this).text() + '.png')
        }
    })

    // 初始狀態設定
    updateNextButtonState();
    updateBorderColor();
});