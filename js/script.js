document.addEventListener("DOMContentLoaded", function () {
    
    // Variáveis da lista de itens
    var inputItem = document.querySelector("#itemList");
    var arrayItens = document.querySelector("#showItens");
    var saveButton = document.querySelector("#save");
    var retrButton = document.querySelector("#retrieve");
    var clearButton = document.querySelector("#clear");
    var completeItensList = [];
    var textList = "";

    // Variáveis da lista de listas
    var inpuNameLists_ = document.querySelector("#inputList_");
    var arrayListas_ = document.querySelector("#showList_");
    var listSet_ = [];
    var textList_ = "";

    //Geral
    const regex = /[0-9]|[\W]/;
    var actualList = "";

    document.querySelector("#send").addEventListener("click", function () {

        var actualItem = inputItem.value;
        console.log(actualItem);

        if(completeItensList.includes(actualItem)){
            alert ("Item já existente!")
        }else{
            if(actualList !== ""){
                addToList(actualItem, completeItensList);
                refreshItensDisplay();
                attachEditBtns();
                attachDelBtns();
                localStorage.setItem (actualList, completeItensList);
            }else{
                alert ("Crie uma lista primeiro!");
            }
        }
      
        console.log(completeItensList);

        console.log(textList);
    });

    saveButton.addEventListener("click", function(){
        localStorage.setItem ("savedArray", completeItensList);
    });

    retrButton.addEventListener("click", function (){
        storageToArray = localStorage.getItem("savedArray");
        completeItensList = storageToArray.split(",")
        console.log (completeItensList)

        if(completeItensList !== null) {
            alert("Lista recuperada");
        }else{
            alert("Nada a recuperar.")
        }
        
        refreshItensDisplay();
        attachEditBtns();
        attachDelBtns();

    });

    clearButton.addEventListener("click", function(){
        completeItensList = [];
        refreshItensDisplay();
    });
    
    function addToList (item, lista){
    lista.push(item)
    }

    function refreshItensDisplay () {
        textList = "";
        completeItensList.forEach(function (item, index) {
            var indexAt = index + 1
            textList += `<span>${indexAt} - ${item}  </span><button class="editBtn"><img id="editImg" src="../Images/editBtn.png"></button><button class="delBtn"><img id="delImg" src="../Images/delBtn.png"></button><br>`
        })
        arrayItens.innerHTML = textList;
    }

    function attachEditBtns () {
        var editBtns = [];
        editBtns = document.querySelectorAll(".editBtn");
        editBtns.forEach(function (item, index){
            item.addEventListener("click", function(){
                var shownIndex = index + 1
                var editing = prompt("Editando o item número:" + shownIndex);
                if(editing.length>15 || regex.test(editing) === true || editing === null){
                    alert("Entrada inválida");
                }else{
                    completeItensList.splice(index, 1, editing);
                    refreshItensDisplay();
                    attachEditBtns();
                    attachDelBtns();
                }
            });

                // if(editing !== null){

        })
    }

    function attachDelBtns (){
        var delBtns = [];
        delBtns = document.querySelectorAll(".delBtn");
        delBtns.forEach(function (item, index){
            var shownIndex = index + 1;
            item.addEventListener("click", function(){
                completeItensList.splice(index, 1);
                alert("Item número " + shownIndex + "excluído");
                refreshItensDisplay();
                attachEditBtns();
                attachDelBtns();
            })
        })
    }



    document.querySelector(".listas_").addEventListener("submit", function (event) {
        event.preventDefault();

        var listaAdc = inpuNameLists_.value;

        if(listSet_.includes(listaAdc)){
            alert ("Já existe uma lista com esse nome!")
        }else{
            addToList(listaAdc, listSet_);
            atualizaDisplayLista();
        }

        console.log(listSet_);
    });
    
    document.listForm.onclick = function(){
        actualList = document.querySelector('input[name = radioList]:checked').value;
        console.log(actualList)
    }

    function atualizaDisplayLista () {
        textList_ = "";
        listSet_.forEach(function (item, index) {
            var indexAt = index + 1
            textList_ += `<input type="radio" name="radioList" id=${item} value=${item}> <span>${indexAt} - ${item}  </span><br>`
        })
        arrayListas_.innerHTML = textList_;

        var value = $("input:radio[name=radioList]:checked").val()

        if (value == null) {
            $("input:radio[name=radioList]:first").prop("checked", true);
            actualList = document.querySelector('input[name = radioList]:checked').value;
            console.log(actualList)
        }

    }

})