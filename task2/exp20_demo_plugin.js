// Subscribe to the open and precommit events on the loan
elli.script.subscribe("loan", "open", onLoanOpen);
elli.script.subscribe("loan", "precommit", onLoanPrecommit);

// Global variable to store some state in
var validatedPayment;

// The loan.open event handler
async function onLoanOpen(args) {
    // Fetch loan object from the host application
    let loan = await elli.script.getObject("loan");

    // Read the value of the monthly payment
    validatedPayment = await loan.getField("5");
    console.log('Initial payment: ' + validatedPayment);
}

// Listen for the pre-commit event
async function onLoanPrecommit(args) {
    // Read the latest monthly payment from the loan
    let loan = await elli.script.getObject("loan");
    let monthlyPayment = await loan.getField("5");

    if (monthlyPayment != validatedPayment) {
        // Make a web service call
        let http = await elli.script.getObject("http");
        let resp = await http.get(
            `http://localhost:8080/diff?v1=${validatedPayment}&v2=${monthlyPayment}&delay=3000`
        );

        if (resp.body && resp.body.diff) {
            // Notify the user
            var userResp = confirm(`The monthly payment has been modified by $${resp.body.diff}.
                Ok to save the loan with these changes?`);

            // Update the validated amount
            if (userResp) {
                validatedPayment = monthlyPayment;
            }

            return userResp;
        }
    }

    return true;
}

