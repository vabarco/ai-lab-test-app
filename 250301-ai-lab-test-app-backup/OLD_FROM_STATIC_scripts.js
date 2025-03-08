document.getElementById("file-input").addEventListener("change", displayFileName);

function displayFileName() {
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = "Selected File: " + fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = "";
    }
}

async function loginWithGoogle() {
    window.location.href = "/login/google";
}

async function logoutUser() {
    window.location.href = "/logout";
}

async function checkLoginStatus() {
    const response = await fetch("/is_authenticated");
    const data = await response.json();

    if (data.authenticated) {
        document.getElementById("signin-btn").style.display = "none";
        document.getElementById("signup-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "inline-block";
    } else {
        document.getElementById("logout-btn").style.display = "none";
    }
}

window.onload = checkLoginStatus;

async function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const resultsDiv = document.getElementById('results');
    const analysisContent = document.getElementById('analysis-content');
    const downloadLink = document.getElementById('download-link');
    const loader = document.getElementById('loader');
    const processingText = document.getElementById('processing-text');

    if (!fileInput.files.length) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    loader.style.display = "block";
    processingText.style.display = "block";
    resultsDiv.style.display = "none";

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();

        loader.style.display = "none";
        processingText.style.display = "none";
        resultsDiv.style.display = "block";

        if (result.error) {
            analysisContent.innerHTML = `<p style='color: red;'>Error: ${result.error}</p>`;
        } else {
            const formattedResponse = result.analysis.replace(/\n/g, "<br>");
            analysisContent.innerHTML = `<div class="section-content">${formattedResponse}</div>`;
            downloadLink.href = result.download_link;
            downloadLink.style.display = "inline-block";
        }
    } catch (error) {
        loader.style.display = "none";
        processingText.style.display = "none";
        alert(`An error occurred: ${error.message}`);
    }
}
