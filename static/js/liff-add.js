window.onload = function() {
    const useNodeJS = false; // if you are not using a node server, set this value to false
    const defaultLiffId = "1654839039-9xxV03xn"; // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent2").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

/**
 * Check if myLiffId is null. If null do not initiate liff.
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent2").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff2(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent2").classList.add('hidden');
            document.getElementById("liffInitErrorMessage2").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    registerButtonHandlers();
}

/**
 * Register event handlers for the buttons displayed in the app
 */
function registerButtonHandlers() {
    // closeWindow call
    document.getElementById('finalyoyaku').addEventListener('click', function() {
        liff.getProfile()
        .then(profile => {
          const name = profile.displayName
          const userID = profile.userId
        })

        .catch((err) => {
          console.log('error', err);
        });
        liff.sendMessages([{
                'type': 'text',
                'text': "予約"
            }]).then(function() {
                window.alert('予約しました');
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
        });
        //ajax code add
        var textData = JSON.stringify({ "userID": userID, "displayName": name });
        console.log(profile.userId)
        console.log(profile.displayName)
        $.ajax({
            type: 'POST',
            url: '/userID',
            data: textData,
            contentType: 'application/json'
        });

    });

        // closeWindow call
    document.getElementById('finalLiffClose').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    




}




/**
 * Alert the user if LIFF is opened in an external browser and unavailable buttons are tapped
 */
function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}



/**
 * Toggle specified element
 * @param {string} elementId The ID of the selected element
 */
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}
