// שמירת אובייקטים במשתנים
let fullName = document.getElementById("Full Name");
let rank = document.getElementById("Rank");
let position = document.getElementById("Position");
let platoom = document.getElementById("Platoom");
let mission = document.getElementById("MissionTime");
let statuss = document.getElementById("select");

// האזנה ללחיצה על כפתור הוספת חייל
document.getElementById("submit").addEventListener("click", addSoldier);

// פונקציית הוספת חייל
function addSoldier() {
    let personnel = {
        fullName: fullName.value,
        rank: rank.value,
        position: position.value,
        platoom: platoom.value,
        missionLength: mission.value,
        status: statuss.value
    };

    let soldierList = JSON.parse(localStorage.getItem("personnel")) || [];
    soldierList.push(personnel);
    localStorage.setItem("personnel", JSON.stringify(soldierList));

    // קריאה לפונקציה שמציגה את הטבלה
    displaySoldier(personnel);

    // ניקוי נתונים
    fullName.value = "";
    rank.value = "";
    position.value = "";
    platoom.value = "";
    mission.value = "";
}

// פונקציית טעינת כל החיילים וקריאה לפונקציית הצגה על המסך עבור כל חייך
function loadPersonnel() {
    let List = JSON.parse(localStorage.getItem("personnel")) || [];
    List.forEach(personnel => {
        displaySoldier(personnel);
    });
}

// פונקציית הצגת כל החיילים בטבלה
function displaySoldier(personnel) {
    let table = document.querySelector(".Table");
    // יצירת שורה
    let newRow = document.createElement("tr");

    // יצירת אברים שיוצגו בשורה
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td6.classList.add("allBatton");
    //הכנסת תוכן מהאובייקט לאברים שבטבלה
    td1.textContent = personnel.fullName;
    td2.textContent = personnel.rank;
    td3.textContent = personnel.position;
    td4.textContent = personnel.platoom;
    td5.textContent = personnel.status;

    // יצירת כפתורים שיהיו בתחילת באבר שבכל שורה
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.classList.add("Input");
    deleteButton.classList.add("NB");

    // האזנה לכפתור מחיקה
    deleteButton.addEventListener("click", ()  => {
        deleteSoldier(newRow, personnel.fullName);
    });


    let editButton = document.createElement("button");
    editButton.textContent = "Mission";
    editButton.classList.add("Input");
    editButton.classList.add("NB");

    let extraButton = document.createElement("button");
    extraButton.textContent = "Edit";
    extraButton.classList.add("Input");
    extraButton.classList.add("NB");

    td6.appendChild(deleteButton);
    td6.appendChild(editButton);
    td6.appendChild(extraButton);

    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);
    newRow.appendChild(td5);
    newRow.appendChild(td6);

    table.appendChild(newRow);
}

// פונקציית מחיקת חייל
function deleteSoldier(row, fullName) {
    let soldierList = JSON.parse(localStorage.getItem("personnel")) || [];

    // סינון החייל שמחקנו מהאובייקט
    soldierList = soldierList.filter(personnel => personnel.fullName !== fullName);

    localStorage.setItem("personnel", JSON.stringify(soldierList));

    // מחיקת השורה מהטבלה
    row.remove();
}


window.onload = function() {
    loadPersonnel();
};
