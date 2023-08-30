$(function () {
    $('.prevPage').click(function () {
        let id = getUrlParameter('id')
        if (id) {
            window.location.href = "/third?id=" + id;
        }
    })
});
