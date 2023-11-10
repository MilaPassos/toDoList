var listSet_ = [];
var textList_ = "";
var arrayListas_ = document.querySelector("#showList_");
var actualListId = "";
var actualList = "";
var itemTocheck = "";
var itensTitle = document.querySelector("#itensTitle");

//Geral
const regex = /[0-9]|[\W]/;



//Save functions to lists
function saveLists () {
    localStorage.setItem("storageLists", listSet_);
    console.log("Listas salvas");
}
function saveStorageCheckedId() {
    actualListId = document.querySelector("input[name=radioList]:checked").id;
    localStorage.setItem("listIdData", actualListId);
}


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


function refreshListsDisplay () {
    textList_ = "";
    listSet_.forEach(function (item, index) {
        var indexAt = index + 1
        textList_ += `<input type="radio" name="radioList" class="radioList" id=${index} value=${item}> <span>${indexAt} - ${item} <button class="editListBtn"><img id="editImg" src="../Images/editBtn.png"></button><button class="delListBtn"><img id="delImg" src="../Images/delBtn.png"></button> </span><br>`
    })
    arrayListas_.innerHTML = textList_;
    itensTitle.innerHTML = `Itens da lista ${actualList}:`;
    attachDelListButtons();
    attachEditListButtons();
}

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

loadListsStorage();
itensTitle.innerHTML = `Itens da lista ${actualList}:`;

function retrieveStorageCheckedData() {
    actualListId = localStorage.getItem("listIdData");
    actualList = localStorage.getItem("listNameData")
    console.log(actualListId);
    itemTocheck = document.getElementById(`${actualListId}`);
    if (itemTocheck){
    itemTocheck.checked = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    
    // Variáveis da lista de itens
    var inputItem = document.querySelector("#itemList");
    var arrayItens = document.querySelector("#showItens");
    var clearButton = document.querySelector("#clear");
    var completeItensList = [];
    var textList = "";

    // Variáveis da lista de listas
    var inputNameLists_ = document.querySelector("#inputList_");


    document.querySelector("#send").addEventListener("click", function () {

        var actualItem = inputItem.value;
        console.log(actualItem);

        if(completeItensList.includes(actualItem)){
            alert ("Item já existente!")
        }else{
            if(actualListId !== ""){
                addToList(actualItem, completeItensList);
                refreshItensDisplay();
                saveItens();
            }else{
                alert ("Crie uma lista primeiro!");
            }
        }
      
        console.log(completeItensList);
        console.log(completeItensList.length);

        console.log(textList);
    });
    
    retrieveItens();

    //Itens display functions
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

    // Itens data management
    function saveItens (){
        localStorage.setItem (`${actualList}`, completeItensList);
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
    clearButton.addEventListener("click", function(){
        completeItensList = [];
        saveItens();
        refreshItensDisplay();
    });



    // Add an item to an List
    function addToList (item, lista){
        lista.push(item)
    };


    // Submit button for create lists
    document.querySelector("#send_").addEventListener("click", function (event) {
        event.preventDefault();

        var newListInput = inputNameLists_.value;

        if(listSet_.includes(newListInput)){
            alert ("Já existe uma lista com esse nome!")
        }else{
            addToList(newListInput, listSet_);
            refreshListsDisplay();
            saveLists();
            saveItens();
            retrieveStorageCheckedData();
        }

        console.log(listSet_);
    });
    
    // On click the lists radio buttons 
    document.listForm.onclick = function(){
        actualList = document.querySelector('input[name = radioList]:checked').value;
        actualListId = document.querySelector('input[name = radioList]:checked').id;
        localStorage.setItem("listIdData", actualListId);
        localStorage.setItem("listNameData", actualList);
        itensTitle.innerHTML = `Itens da lista ${actualList}:`;
        retrieveItens();
        refreshItensDisplay();
    }

})