var sendNewList = document.querySelector("#send_");
var shownList = document.querySelector("#shownLists");
var newItem = document.querySelector("#itemList");

var textList_ = "";
var listSet_ = [];
var actualList = "";
var actualListId = "";
var itemTocheck = "";

import { addToList } from "./utils.js";



//Save functions to lists
function saveLists () {
    localStorage.setItem("storageLists", listSet_);
    console.log("Listas salvas");
}
function saveStorageActualList (lista) {
    localStorage.setItem("listNameData", lista);
};


//Lists Buttons
function attachEditListButtons () {
    var editListButtons = [];
    editListButtons = document.querySelectorAll(".editListBtn");
    editListButtons.forEach(function (item, index){
        item.addEventListener("click", function(){
            var shownIndex = index + 1
            var editingList = prompt("Editando a lista número: " + shownIndex);
            if(editingList.length>15 || regex.test(editingList) === true || editingList === null){
                alert("Entrada inválida");
            }else{
                listSet_.splice(index, 1, editingList);
                refreshListsDisplay();
                retrieveStorageCheckedData();
                saveLists();
            }
        });
    })
};
function attachDelListButtons (){
    var delListButton = [];
    delListButton = document.querySelectorAll(".delListBtn");
    delListButton.forEach(function (item, index){
        var shownIndex = index + 1;
        item.addEventListener("click", function(){
            listSet_.splice(index, 1);
            localStorage.removeItem(`${actualList}`);
            alert("Item número " + shownIndex + " excluído");
            refreshListsDisplay();
            retrieveStorageCheckedData();
            saveLists();
        })
    })
};
function attachGoToButton () {
    var goToButton = [];
    goToButton = document.querySelectorAll(".goToItensButton");
    goToButton.forEach(function (item, index){
        item.addEventListener("click", function(){
        actualList = this.id;
        saveStorageActualList(actualList);
        console.log(actualList);
        })
    })
}


function refreshListsDisplay () {
    textList_ = "";
    listSet_.forEach(function (item, index) {
        if(item != ""){
        var indexAt = index + 1
        textList_ += `<span><a href="../index.html"><button class="goToItensButton" id="${item}"><img id="listImg" src="../Images/listImg.png"></button></a> ${indexAt} - ${item} <button class="editListBtn"><img id="editImg" src="../Images/editBtn.png"></button><button class="delListBtn"><img id="delImg" src="../Images/delBtn.png"></button> </span><br>`
        }else{
            listSet_.splice(index, 1);
        }
    })
    shownList.innerHTML = textList_;
    attachDelListButtons();
    attachEditListButtons();
    attachGoToButton();
};
function loadListsStorage () {    
    var storageToArray = localStorage.getItem("storageLists");
    listSet_ = storageToArray.split(",");

    if(storageToArray !== null) {
        refreshListsDisplay();
        retrieveStorageCheckedData();
        console.log("Lista recuperada");
        console.log(listSet_);
    }else{
        alert("Não foi possível recuperar nenhuma lista.");
    }
};
function retrieveStorageCheckedData() {
    actualListId = localStorage.getItem("listIdData");
    actualList = localStorage.getItem("listNameData")
    console.log(actualListId);
    itemTocheck = document.getElementById(`${actualListId}`);
    if (itemTocheck){
    itemTocheck.checked = true;
    }
}

loadListsStorage();

document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#send_").addEventListener("click", function (event) {
        event.preventDefault();

        var newListInput = newItem.value;

        if(listSet_.includes(newListInput)){
            alert ("Já existe uma lista com esse nome!")
        }else{
            addToList(newListInput, listSet_);
            refreshListsDisplay();
            saveLists();
            retrieveStorageCheckedData();
        }

        console.log(listSet_);
    });

})