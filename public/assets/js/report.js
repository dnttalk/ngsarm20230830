$(function () {
    exportCSV()
});
const toCsv = function (table) {
    // Query all rows
    const rows = table.querySelectorAll('tr');

    return [].slice
        .call(rows)
        .map(function (row) {
            // Query all cells
            const cells = row.querySelectorAll('th,td');
            return [].slice
                .call(cells)
                .map(function (cell) {
                    return cell.textContent;
                })
                .join(',');
        })
        .join('\n');
};

const download = function (text, fileName) {
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
    link.setAttribute('download', fileName);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};

const exportCSV = function () {
    $('#btnETE').on('click', function () {
        let table = document.getElementById('reportTable');
        console.log('123')
        // Export to csv
        let csv = toCsv(table);

        // Download it
        download(csv, 'download.csv');
    })
}
$('#Finish').on('click', function () {
    $.get("/api/start/M301", function (data) {
        console.log(data);
    });
    $.get("/api/start/M44", function (data) {
        console.log(data);
    });
    $.get("/api/start/M45", function (data) {
        console.log(data);
    });
    window.location.href = "/";
});