# Ellie Mae Experience 2020 - Plugin Sample Code
This repository provides the code that was included as part of the **Personalizing the LO Experience**
session at the Ellie Mae Virtual Experience 2020. The code is broken into multiple "tasks" that represent
the different steps taken during the demo as the code evolved. The full, completed code version
can be found in the "final" folder.

This demo relied on a simple web service called the **Diff Service**, the code for which is also included
as part of this repo. To run the Diff Service, you will need to have [NodeJS](https://nodejs.org/en/) installed
on your system. Once installed, download the code from the "diffsvc" folder to your local machine and
run it as follows:

```
PROMPT> cd <your_project_root>\exp20-plugin-demo\diffsvc
PROMPT> npm install
PROMPT> node diffsvc.js
```

By default, the Diff Service will run on port 8080. You can modify this by updating the port number
in the `diffsvc.js` file.

The plugin also relies on a web server to serve the `validate_payment.html` page that's found in the
"final" folder. The plugin assumes this is accessible at the URL `https://localhost/dev/exp20-plugin-demo/task4/validate_payment.html`.
You can change this location within the exp20_demo_plugin.js file as needed.
