const ADMIN_PASS = "123123";

// Login Logic
function attemptLogin() {
    const input = document.getElementById('passwordInput').value;
    const msg = document.getElementById('loginMessage');

    if (input === ADMIN_PASS) {
        document.getElementById('loginView').classList.add('hidden');
        document.getElementById('dashboardView').classList.remove('hidden');
        initDashboard();
    } else {
        msg.style.display = 'flex';
        msg.style.backgroundColor = '#FFDAD6'; // Error container
        msg.style.color = '#410002';
        msg.innerHTML = '<span class="material-icons-round">error</span> Incorrect Password';
    }
}

document.getElementById('passwordInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') attemptLogin();
});

function logout() {
    location.reload();
}

// Dashboard Logic
function initDashboard() {
    checkDatabaseStatus();
}

function checkDatabaseStatus() {
    const localData = localStorage.getItem('GCIP_CharityData');
    const countDisplay = document.getElementById('charityCount');
    const sourceDisplay = document.getElementById('dbSource');

    if (localData) {
        const data = JSON.parse(localData);
        countDisplay.innerText = data.length;
        sourceDisplay.innerText = "Running on Admin Uploaded Data (LocalStorage)";
        sourceDisplay.style.color = "var(--md-sys-color-primary)";
    } else {
        // Try to guess fetch
        countDisplay.innerText = "50";
        sourceDisplay.innerText = "Running on Consolidated Master (data.js)";
    }
}

function showActionMessage(text, isError = false) {
    const msg = document.getElementById('actionMessage');
    msg.style.display = 'flex';
    msg.innerHTML = '<span class="material-icons-round">' + (isError ? 'error' : 'check_circle') + '</span> ' + text;
    msg.style.backgroundColor = isError ? '#FFDAD6' : '#E8DEF8';
    msg.style.color = isError ? '#410002' : '#1D192B';
}

// File Handler
function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const json = JSON.parse(e.target.result);
            if (!Array.isArray(json)) throw new Error("JSON must be an array");

            // Save to LocalStorage
            localStorage.setItem('GCIP_CharityData', JSON.stringify(json));

            checkDatabaseStatus();
            showActionMessage(`Successfully updated database with ${json.length} records.`);
        } catch (err) {
            showActionMessage("Invalid JSON File: " + err.message, true);
        }
    };
    reader.readAsText(file);
}

function resetDatabase() {
    if (confirm("Are you sure? This will revert the website to use the built-in default dataset.")) {
        localStorage.removeItem('GCIP_CharityData');
        checkDatabaseStatus();
        showActionMessage("Database reset to defaults.");
    }
}
