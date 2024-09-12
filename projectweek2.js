//שמירת אובייקטים במשתנים
let fullName = document.getElementById("Full Name")
let rank = document.getElementById("Rank")
let position = document.getElementById("Position")
let platoom = document.getElementById("Platoom")
let mission = document.getElementById("MissionTime")
let statuss = document.getElementById("select") 
// האזנה ללחיצה על כפתור הוספת חייל 
document.getElementById("submit").addEventListener("click",addSoldier); 
    
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

    // הצגת הפריט בטבלה
    displaiSolider(personnel);

// ניקוי נתונים
    fullName.value = "";
    rank.value = "";
    position.value = "";
    mission.value = "";
    platoom.value = "";
    mission.value = "";
    
}



//  פונקציית טעינת כל החיילים הקיימים וקריאה לפוקציית הצגה על נמסך עבור כל אחד
function loadPersonnel() {
    let soldierList = JSON.parse(localStorage.getItem("personnel")) || [];
    soldierList.forEach(personnel => {
        displaiSolider(personnel);
    });
}

//פונקצית הצגת כל החיילים בטבלה
function displaiSolider() {
    let table = document.querySelector(".Table");
    let newRow = document.createElement("tr");
    // הוספת תאי השורה
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let button1 = document.createElement("button")
    let button2 = document.createElement("button")
    let button3 = document.createElement("button")
    td1.textContent = fullName.value;
    td2.textContent = rank.value;
    td3.textContent = position.value;
    td4.textContent = platoom.value;
    td5.textContent = statuss.value;
    td6.appendChild(button1)
    td6.appendChild(button2)
    td6.appendChild(button3)
    newRow.appendChild(td1)
    newRow.appendChild(td2)
    newRow.appendChild(td3)
    newRow.appendChild(td1)
    newRow.appendChild(td5)
    newRow.classList.add("Table")
    table.appendChild(newRow);
    
    
}

window.onload = function() {
    loadPersonnel();
};