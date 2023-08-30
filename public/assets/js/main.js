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
            const d = new Date();
            // 一天
            // d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
            // 一小時
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
    if (id) {
        $('#currentlyModelName').text(id.toUpperCase())
    }

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