const form = document.getElementById("replaceForm");
const serverUrlInput = document.getElementById("serverUrl");

function updateAction() {
    const url = serverUrlInput.value.replace(/\/$/, ""); // remove trailing slash
    form.action = `${url}/motionboard/rest/datasource/replace?tenant=system`;
}

serverUrlInput.addEventListener("input", updateAction);
updateAction();

document.getElementById("downloadJsonBtn").addEventListener("click", function () {
    const path = document.getElementById("path").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    const jsonData = {
        path: `/${path}`,
        replacePairs: [{ from: from, to: to }],
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uploadFile.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});