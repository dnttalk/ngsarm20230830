$(function () {
    exportCSV()
    initCookieData()
});

const initCookieData = function () {
    let reportTable = $.cookie("reportTable")
    reportTable = reportTable.replace(/,tdFirst_/g, '$')
    reportTable = reportTable.replace('tdFirst_', '')
    let arr1 = reportTable.split('$')
    for (let i = 0; i < arr1.length; i++) {
        let arr2 = arr1[i].split(',')
        $(`#tdFirst_${arr2[0]}`).text(arr2[1])
        $(`#tdSecond_${arr2[0]}`).text(arr2[2] + ',' + arr2[3])
    }
}

const getCsv = function () {
    // "\r\n"
    // 生成第一行
    let string = ''
    string = ',Samples,,,Index,,\r\n'
    // 生成第二行
    string = string + ',1,2,3,4,5,6\r\n'

    let rows = document.getElementById("reportTable").rows;
    for (let i = 2; i < rows.length; i++) {
        for (let j = 0; j < rows[i].cells.length; j++) {
            if (rows[i].cells[j].textContent.length != 0) {
                if (rows[i].cells[j].textContent.indexOf(',') >= 0) {
                    string = string + "\"" + rows[i].cells[j].textContent + "\"" + ','
                } else {
                    string = string + rows[i].cells[j].textContent + ','
                }

            } else {
                string = string + ','
            }
        }
        string = string + '\r\n'
    }
    return string
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
        // Export to csv
        let csv = getCsv();
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