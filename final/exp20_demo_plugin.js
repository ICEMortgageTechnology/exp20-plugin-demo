// Subscribe to the open and precommit events on the loan
elli.script.subscribe("loan", "open", onLoanOpen);
elli.script.subscribe("loan", "precommit", onLoanPrecommit);

// Global variable to store some state in
var loanData = {};

// Listen for messages from other windows
window.addEventListener("message", onWinMessage);

// The loan.open event handler
async function onLoanOpen(args) {
    // Fetch loan object from the host application
    let loan = await elli.script.getObject("loan");

    // Read the value of the monthly payment
    loanData.validatedPayment = await loan.getField("5");
    console.log('Initial loan data: ' + JSON.stringify(loanData));
}

// Listen for the pre-commit event
async function onLoanPrecommit(args) {
    // Read the latest monthly payment from the loan
    let loan = await elli.script.getObject("loan");
    let monthlyPayment = await loan.getField("5");

    if (monthlyPayment != loanData.validatedPayment) {
        setTimeout(() => validatePaymentAmount(monthlyPayment), 0);
        return false;
    }

    return true;
}

// The potentially long-running validation code moved to a callback function
// and invoked by a timer
function validatePaymentAmount(monthlyPayment) {
    let popupWidth = 500, popupHeight = 400;
    let winArgs = `left=${(screen.width - popupWidth)/2},top=${(screen.height - popupHeight)/2},` +
        `width=${popupWidth},height=${popupHeight},` +
        `toolbar=0,location=0,titlebar=0,status=0,scrollbars=0`

    // Open the window, passing the amounts to validate
    window.open("https://localhost/dev/exp20-plugin-demo/task4/validate_payment.html"
        + `?newValue=${monthlyPayment}&priorValue=${loanData.validatedPayment}`,
        "ServiceWindow",
        winArgs);
}

// Listens for messages from the loaded window
async function onWinMessage(message) {
    // When the validation_result message is received, copy its value into the state variable
    if (message.data && message.data.type && message.data.type == 'validation_result') {
        console.log("Received result event from service window...");
        loanData.validatedPayment = message.data.validatedPayment;
    }
}
