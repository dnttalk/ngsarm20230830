$(document).ready(function () {
    const requiredSections = ['#trx1', '#96wpcrp', '#trx3', '#12wpwr', '#dwp', '#ashcan', '#erc'];

    function updateNextButtonState() {
        const allSectionsActive = requiredSections.every(section => $(section).hasClass('active'));
        const $nextPageButton = $('.nextPage');
        const buttonStyles = allSectionsActive ? { 'cursor': 'pointer', 'background-color': 'rgb(0, 0, 204)', 'color': 'white' } : { 'cursor': 'not-allowed', 'background-color': '#d8d8d8', 'color': 'rgb(0, 176, 240)' };
        $nextPageButton.css(buttonStyles);
    }

    function updateBorderColor() {
        $('.border-solid').each(function () {
            const activeBorder = $(this).find('.btn').toArray().every(btn => $(btn).hasClass('active'));
            $(this).toggleClass('active', activeBorder);
        });
    }

    $('.checkbtn').click(function () {
        const clickedId = $(this).attr('id');
        $('#cancleChoose, #doneChoose').attr('dataId', clickedId);
    });

    $('#cancleChoose, #doneChoose').click(function () {
        const dataId = $(this).attr('dataId');
        $(`#${dataId}`).toggleClass('active');
        updateNextButtonState();
        updateBorderColor();
    });

    $('.nextPage').click(function () {
        if (requiredSections.every(section => $(section).hasClass('active'))) {
            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();
        }
    });

    $('#btn-go').click(function () {
        $.get("/api/start/stepstart", function (data) {
            console.log(data);
        });
        const id = getUrlParameter('id');
        if (id) {
            window.location.href = `/fifth?id=${id}`;
        }
    });

    $('#checkcBtn').click(function () {
        const buttonText = $(this).text();
        const isAllSet = buttonText === 'All Set';

        $(this).text(isAllSet ? 'unset' : 'All Set');
        
        $('.border-solid').each(function () {
            if ($(this).find('.btn').hasClass('exception')) return;
            $(this).find('.btn').toggleClass('active', isAllSet);
            $(this).toggleClass('active', isAllSet);
        });

        updateNextButtonState();
        updateBorderColor();
    });

    $('.prevPage').click(function () {
        const id = getUrlParameter('id');
        if (id) {
            window.location.href = `/second?id=${id}`;
        }
    });

    $('.checkbtn').click(function () {
        $('#showModelName12').empty();
        const buttonText = $(this).text();

        if (buttonText.includes('12 well plate with reagent')) {
            $('#showModelName12').text('12 well plate with reagent');
            $('#showModelCount').html(`12 well plate with reagent<br><span style="color:blue;">${buttonText.split('Rack A')[1]}</span>`);
            $('#sampleImg').attr('src', '/assets/img/12_Well_Plate_with_Reagent.png');
        } else if (buttonText.includes('Tip Rack A')) {
            $('#showModelName12').text('Tip Rack A');
            $('#showModelCount').html(`Tip Rack A<br><span style="color:blue;">${buttonText.split('Rack A ')[1]}</span>`);
            $('#sampleImg').attr('src', '/assets/img/Tip_Rack_A.png');
        } else if (buttonText.includes('Tip Rack B')) {
            $('#showModelName12').text('Tip Rack B');
            $('#showModelCount').html(`Tip Rack B<br><span style="color:blue;">${buttonText.split('Rack B ')[1]}</span>`);
            $('#sampleImg').attr('src', '/assets/img/Tip_Rack_B.png');
        } else if (buttonText.includes('Deep Well Plate')) {
            $('#showModelName12').text(buttonText);
            $('#showModelCount').text(buttonText);
            $('#sampleImg').attr('src', '/assets/img/Deep_Well_Plate.png');
        } else if (buttonText.includes('Empty Racks')) {
            $('#showModelName12').text('Empty Racks Clean');
            $('#showModelCount').text('Empty Racks Clean');
            $('#sampleImg').attr('src', '/assets/img/Empty_Racks_Clean.png');
        } else {
            $('#showModelName12').text(buttonText);
            $('#showModelCount').text(buttonText);
            const replacedText = buttonText.replace(/\s+/g, '_');
            $('#sampleImg').attr('src', `/assets/img/${replacedText}.png`);
        }
    });

    // Initial state setup
    updateNextButtonState();
    updateBorderColor();
});