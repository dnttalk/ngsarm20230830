$(function () {
    checkUser()
    $('#btn-logout').click(function () {
        $.removeCookie("user");
        location.href = '/login'
    })
    getCurrentlyModel()
});

let checkUser = function () {
    if (typeof user != 'undefined') {
        if (user) {
            $.cookie("user", user, { expires: 1, path: '/' });
            if (typeof $.cookie('user') == 'undefined') {

                location.href = '/login'
            } else {
                $('#btn-login').text('User:' + $.cookie('user'))
                $('#btn-login').prop('disabled', true)
            }
        } else {
            if (typeof $.cookie('user') == 'undefined') {
                location.href = '/login'
            } else {
                $('#btn-login').text('User:' + $.cookie('user'))
                $('#btn-login').prop('disabled', true)
            }
        }
    } else {
        if (typeof $.cookie('user') == 'undefined') {
            location.href = '/login'
        } else {
            $('#btn-login').text('User:' + $.cookie('user'))
            $('#btn-login').prop('disabled', true)
        }
    }
}

let getCurrentlyModel = function () {
    let id = getUrlParameter('id')

    fetch('/assets/data/sample.json')
        .then((response) => response.json())
        .then((json) => {
            Object.keys(json).forEach(function (k) {

                if (k.toLocaleLowerCase() == id) {
                    $('#currentlyModelName').text(k)
                    $('#modelImage1').attr('src', json[k].img1); // 這裡讀取並設定img1值
                    $('#modelImage2').attr('src', json[k].img2);
                }
            });
        });
}


let getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};