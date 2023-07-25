function displayAddJob() {
    var addJobDiv = document.getElementById("add-job");
    addJobDiv.style.display = "block";
    var addJobButton = document.getElementById("add-job-button");
    addJobButton.style.display = "none";
}

function cancelJob() {
    var addJobDiv = document.getElementById("add-job");
    addJobDiv.style.display = "none";
    var addJobButton = document.getElementById("add-job-button");
    addJobButton.style.display = "block";

    document.getElementById("jtitle").value = "";
    document.getElementById("jemployer").value = "";
    document.getElementById("jstart").value = "";
    document.getElementById("jend").value = "";
    document.getElementById("jlocation").value = "";
    document.getElementById("jdescrip").value = "";
}

function createEDButtons(buttonCell, numRow) {
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.id = "edit" + numRow;
    editButton.addEventListener("click", () => {
        editJob(editButton.id);
    });
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.id = "delete" + numRow;
    deleteButton.addEventListener("click", () => {
        deleteJob(deleteButton.id);
    });
    buttonCell.appendChild(editButton);
    buttonCell.appendChild(deleteButton);
}

function addJob() {
    var details = [];
    details[0] = document.getElementById("jtitle").value;
    details[1] = document.getElementById("jemployer").value;
    details[2] = document.getElementById("jstart").value + " - " + document.getElementById("jend").value;
    details[3] = document.getElementById("jlocation").value;
    details[4] = document.getElementById("jdescrip").value;

    const table = document.getElementById("work-exp-table");
    const numRow = table.rows.length;
    var row = table.insertRow(numRow);
    for(let i = 0; i <= 4; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = details[i];
    }
    var buttonCell = row.insertCell(5);
    createEDButtons(buttonCell, numRow);
    cancelJob();
}

function editJob(clickid) {
    const numRow = clickid.substring(4);
    const num = Number(numRow);
    const table = document.getElementById("work-exp-table");
    var row = table.rows[num].cells;
    
    var prev = [];
    for(let i = 0; i <= 4; i++) {
        prev[i] = row[i].innerHTML;
    }
    table.deleteRow(num);
    
    var newRow = table.insertRow(num);
    for(let i = 0; i <= 4; i++) {
        var cell = newRow.insertCell(i);
        var text = document.createElement("input");
        text.id = num + "text" + i;
        text.type = "text";
        text.value = prev[i];
        cell.appendChild(text);
    }

    var buttonCell = newRow.insertCell(5);
    var saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.id = "save" + num;
    saveButton.addEventListener("click", () => {
        saveJob(saveButton.id);
    });
    buttonCell.appendChild(saveButton);
    var cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.id = "cancel" + num;
    cancelButton.addEventListener("click", () => {
        cancelEdit(cancelButton.id, prev);
    });
    buttonCell.appendChild(cancelButton);
}

function saveJob(clickid) {
    const numRow = clickid.substring(4);
    const num = Number(numRow);
    const table = document.getElementById("work-exp-table");
    var row = table.rows[num].cells;
    
    var prev = [];
    for(let i = 0; i <= 4; i++) {
        var cellId = num + "text" + i;
        var cell = document.getElementById(cellId);
        prev[i] = cell.value;
    }
    table.deleteRow(num);

    var newRow = table.insertRow(num);
    for(let i = 0; i <= 4; i++) {
        var cell = newRow.insertCell(i);
        cell.innerHTML = prev[i];
    }
    var buttonCell = newRow.insertCell(5);
    createEDButtons(buttonCell, num);
}

function cancelEdit(clickid, prev) {
    const numRow = clickid.substring(6);
    const num = Number(numRow);
    const table = document.getElementById("work-exp-table");
    table.deleteRow(num)

    var row = table.insertRow(num);
    for(let i = 0; i <= 4; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = prev[i];
    }
    var buttonCell = row.insertCell(5);
    createEDButtons(buttonCell, num);
}

function deleteJob(clickid) {
    if(window.confirm("Are you sure you want to delete this job?")) {
        const numRow = Number(clickid.substring(6));
        document.getElementById("work-exp-table").deleteRow(numRow);

        for(let i = 1; i < document.getElementById("work-exp-table").rows.length; i++) {
            const row = document.getElementById("work-exp-table").rows[i].cells;
            row[5].firstChild.id = "edit" + i;
            row[5].lastChild.id = "delete" + i;
        }
    }
}
