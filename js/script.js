var textList = "";
var arrayListas_ = document.querySelector("#showList_");
var actualList = "";
var itemTocheck = "";
var itensTitle = document.querySelector("#itensTitle");
var completeItensList = [];
var arrayItens = document.querySelector("#showItens");

import { addToList } from "./utils.js";

//Geral
const regex = /[0-9]|[\W]/;

function saveItens (){
    localStorage.setItem (`${actualList}`, completeItensList);
}

function retrieveStorageListNameData() {
    actualList = localStorage.getItem("listNameData");
}

function retrieveItens () {
    var storageToArray = localStorage.getItem(`${actualList}`);
    if (storageToArray !== null) {
        completeItensList = storageToArray.split(",");
    } else {
        completeItensList = [];
    }
    console.log (completeItensList)

    if(completeItensList !== null) {
        console.log("Lista recuperada");
    }else{
        console.log("Nada a recuperar.");
        completeItensList = [];
    }
}

function attachEditItensButtons () {
    var editItensButtons = [];
    editItensButtons = document.querySelectorAll(".editItenBtn");
    editItensButtons.forEach(function (item, index){
        item.addEventListener("click", function(){
            var shownIndex = index + 1
            var editing = prompt("Editando o item número:" + shownIndex);
            if(editing.length>15 || regex.test(editing) === true || editing === null){
                alert("Entrada inválida");
            }else{
                completeItensList.splice(index, 1, editing);
                saveItens();
                refreshItensDisplay();
            }
        });
    })
}
function attachDelItensButtons (){
    var delItensButton = [];
    delItensButton = document.querySelectorAll(".delItenBtn");
    delItensButton.forEach(function (item, index){
        var shownIndex = index + 1;
        item.addEventListener("click", function(){
            completeItensList.splice(index, 1);
            alert("Item número " + shownIndex + " excluído");
            refreshItensDisplay();
            saveItens();
        })
    })
}

function refreshItensDisplay () {
    textList = "";
    completeItensList.forEach(function (item, index) {
        if (item != ""){
            var shownIndex = index + 1
            textList += `<span>${shownIndex} - ${item}  </span><button class="editItenBtn"><img id="editImg" src="../Images/editBtn.png"></button><button class="delItenBtn"><img id="delImg" src="../Images/delBtn.png"></button><br>`
        }else{
            completeItensList.splice(index,1);
        }
    })
    arrayItens.innerHTML = textList;
    attachEditItensButtons();
    attachDelItensButtons();
}


retrieveStorageListNameData();
retrieveItens();
itensTitle.innerHTML = `Itens da lista ${actualList}:`;
refreshItensDisplay();

document.addEventListener("DOMContentLoaded", function () {
    
    // Variáveis da lista de itens
    var inputItem = document.querySelector("#itemList");
    var clearButton = document.querySelector("#clear");

    document.querySelector("#send").addEventListener("click", function () {

        var actualItem = inputItem.value;
        console.log(actualItem);

        if(completeItensList.includes(actualItem)){
            alert ("Item já existente!")
        }else{
            if(actualList !== ""){
                addToList(actualItem, completeItensList);
                refreshItensDisplay();
                saveItens();
            }else{
                alert ("Crie uma lista primeiro!");
            }
        }
      
        console.log(completeItensList);

        console.log(textList);
    });
    
    retrieveItens();

    // Itens data management


    clearButton.addEventListener("click", function(){
        completeItensList = [];
        saveItens();
        refreshItensDisplay();
    });
});