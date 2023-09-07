$(function () {
    const processStatusElement = $('#processStatus');
    const popMessageElement = $('#popMessage');

    // Function to update the process status and handle completion
    const updateProcessStatus = async () => {
        for (let processStatus = 1; processStatus <= 5; processStatus++) {
            processStatusElement.text(`Process Status: ${processStatus}`);
            await flashNumber(processStatus);
        }
        popMessageElement.text('Finish...');
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    // Function to perform visual effects based on process status
    const flashNumber = async (status) => {
        const element = $(`#oe${status}`);
        await element.fadeOut(1000).fadeIn(1000).promise();
        element.addClass('active');
    };

    // Start the process
    updateProcessStatus();
});