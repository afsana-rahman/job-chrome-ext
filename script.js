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

function addJob() {
    const details = [];
    details[0] = document.getElementById("jtitle").value;
    details[1] = document.getElementById("jemployer").value;
    details[2] = document.getElementById("jstart").value + " - " + document.getElementById("jend").value;
    details[3] = document.getElementById("jlocation").value;
    details[4] = document.getElementById("jdescrip").value;

    const table = document.getElementById("work-exp-table");
    var numRow = table.rows.length-1;
    var row = table.insertRow(numRow);
    for(let i = 0; i <= 4; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = details[i];
    }
    
    var cell6 = row.insertCell(5);
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.id = "edit" + numRow;
    editButton.addEventListener("click", () => {
        editJob();
    });
    var saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.id = "save" + numRow;
    saveButton.style.display = "none";
    editButton.addEventListener("click", () => {
        saveJob();
    });
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.id = "delete" + numRow;
    editButton.addEventListener("click", () => {
        deleteJob();
    });
    cell6.appendChild(editButton);
    cell6.appendChild(saveButton);
    cell6.appendChild(deleteButton);

    cancelJob();
}

function editJob() {
    var editButton = document.getElementById("edit");
    editButton.style.display = "none";
    var saveButton = document.getElementById("save");
    saveButton.style.display = "inline-block";
}

function saveJob() {
    var saveButton = document.getElementById("save");
    saveButton.style.display = "none";
    var editButton = document.getElementById("edit");
    editButton.style.display = "inline-block";
}