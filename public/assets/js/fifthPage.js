const app = {
    pauseStatus: 0,
    intervalObj1: null,
    processStatus: 1,
    timerPaused: false,
    intervalId: null,
    startTime: Date.now(),
    pausedTime: null,
};

function showSpinner() {
    $('.spinner-wrapper').fadeIn(500);
}

function hideSpinner() {
    $('.spinner-wrapper').fadeOut(500);
}

function loading() {
    setTimeout(() => {
        hideSpinner();
    }, 3000);
}

function poe() {
    $('.btn-confirm').on('click', () => {
        const myModal = new bootstrap.Modal(document.getElementById('EOPModal'), {
            keyboard: false,
        });
        myModal.show();
    });

    $('.confirmPOE').on('click', async () => {
        console.log("Initializing");
        showSpinner();
        clearInterval(app.intervalId);

        setTimeout(() => {
            $.get("/api/start/M302", (data) => {
                console.log(data);
            });
        }, 2000);

        setTimeout(() => {
            window.location.href = "/";
        }, 2500);
    });
}

function flashNumber() {
    const elements = ['#step1', '#step2', '#step3', '#step4', '#step5', '#pcText'];

    if (app.processStatus >= 1 && app.processStatus <= elements.length) {
        const elementId = elements[app.processStatus - 1];
        $(elementId).fadeOut(500).fadeIn(500);
    }
}

function performAction(apiEndpoint, requiredSections) {
    if (requiredSections.every(section => $(section).hasClass('active'))) {
        $.get(apiEndpoint, (data) => {
            console.log(data);
        });
    }
}

function setupActionButtons() {
    $('#start').click(() => {
        console.log("Start button clicked");
        if ($('#start').hasClass('active')) {
            showSpinner();
            $('#start').removeClass('active');

            setTimeout(() => {
                $.get("/api/start/M300", (data) => {
                    console.log(data);
                    $('#pause').addClass('active');
                    app.timerPaused = false;
                    startTimer();
                });
            }, 1000);

            setTimeout(() => {
                hideSpinner();
            }, 1500);
        }
    });

    $('#pause').click(() => {
        console.log("Pause button clicked");
        if ($('#pause').hasClass('active')) {
            showSpinner();
            $('#pause').removeClass('active');

            app.timerPaused = true;
            clearInterval(app.intervalId);

            setTimeout(() => {
                $.get("/api/start/M301", (data) => {
                    console.log(data);
                    $('#start').addClass('active');
                });
            }, 4000);

            setTimeout(() => {
                hideSpinner();
            }, 4500);
        }
    });
}

function startTimer() {
    app.intervalId = setInterval(() => {
        $.get("/api/start/process", (data) => {
            if (data.status) {
                app.processStatus = parseInt(data.status);
                console.log(data);
            }
            if (app.processStatus === 20) {
                const id = getUrlParameter('id');
                if (id) {
                    window.location.href = "/report?id=" + id;
                }
            }
            flashNumber();
        });
    }, 1000);
}

$(function () {
    loading();
    poe();
    setupActionButtons();
    startTimer();
    flashNumber();
});