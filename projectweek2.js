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
    editButton.textContent = "Edit";
    editButton.classList.add("Input");
    editButton.classList.add("NB");

    //  האזנה לכפתור עריכה
   editButton.addEventListener("click",() => OpenWindew(personnel))

    let extraButton = document.createElement("button");
    extraButton.textContent = "Mission";
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






//  פונקציית פתיחת חלון לעריכת פרטי חייל
function OpenWindew(personnel){
    // שמירת החלון במשתנה
    let clickEdit = document.getElementById("window")
    // שמירת האינפוטים של החלון במשתנה
    let fullNameNew = document.getElementById("fullNameNew")
    let rankNew = document.getElementById("rankNew")
    let positionNew = document.getElementById("positionNew")
    let platoomNew = document.getElementById("platoomNew")
    let missionTimeNew = document.getElementById("missionTimeNew")
    // הכנסת התוכן של אותו חייל לחלון עריכה
    fullNameNew.value = personnel.fullName;
    rankNew.value = personnel.rank;
    positionNew.value = personnel.position;
    platoomNew.value = personnel.platoom;
    missionTimeNew.value =personnel.missionLength
    clickEdit.style.display ="flex"
    // שמירת לחצן אישור עריכה במשתנה
    let enterEdit = document.getElementById("editNew")
    // האזנה ללחצן אשור עריכה ושליחת פרמטר של אותו חייל שעורכים
    enterEdit.addEventListener("click",() => submitEdit(personnel))
}



// פונקציית עדכון החייל
function submitEdit(personnel){
    // תפיסת כל הערכים החדשים שהוכנסו
    let fullNameNew = document.getElementById("fullNameNew").value
    let rankNew = document.getElementById("rankNew").value
    let positionNew = document.getElementById("positionNew").value
    let platoomNew = document.getElementById("platoomNew").value
    let missionTimeNew = document.getElementById("missionTimeNew").value
    // תפיסת כל מה ששמור במשתנה
    let all = JSON.parse(localStorage.getItem("personnel") || [])
    // מציאת החייל שאנחנו עורכים 
    let indexPersonnel = all.find(p => p.fullName === personnel.fullName);
    // החלפת התנונים הישנים של החייל בחדשים
    indexPersonnel.fullName = fullNameNew;
    indexPersonnel.rank = rankNew;
    indexPersonnel.position = positionNew;
    indexPersonnel.platoom = platoomNew;
    indexPersonnel.missionLength = missionTimeNew;
    localStorage.setItem("personnel",JSON.stringify(all))
    //קריאה לפונקצייה שסוגרת את החלון עריכה
    closeWindow();
    // רענון העמוד
    location.reload();
}



// האזנה לכפתור סגירת חלון
let clickClose = document.getElementById("Exit")
clickClose.addEventListener("click",closeWindow)

// פונקציית סגירת חלון לעריכת פרטי חייל
function closeWindow() {
    let clickEdit = document.getElementById("window")
    clickEdit.style.display = "none"   
}






// פונקציית טעינת כל החיילים וקריאה לפונקציית הצגה על המסך עבור כל חייך
function loadPersonnel() {
    let List = JSON.parse(localStorage.getItem("personnel")) || [];
    List.forEach(p => {
        displaySoldier(p);
    });
}

window.onload = () => {
    loadPersonnel();
};





























function nums(ListNum) {
    let up = true;
    let down = true; 

for( i = 0; i < ListNum.length -1; i++){
    if(ListNum[i] > ListNum[i+1]){
        up = false;
    }
    if (ListNum[i] < ListNum[i+1]){
        down = false;
    } 
}
if( up == true && down == false){
    return 1;
}
else if ( up == false && down == true){
    return 2;
}
else{
    return 0;
}
}
console.log(nums([1, 2, 3, 4, 1, 0]));
