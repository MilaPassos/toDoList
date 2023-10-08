document.addEventListener("DOMContentLoaded", function () {
    var itemLista = document.querySelector("#itemList");
    var exibDiv = document.querySelector("#exibLista");
    var saveBut = document.querySelector("#save");
    var retrBut = document.querySelector("#retrieve");
    var textoLista = "";
    const regex = /[0-9]|[\W]/;


    document.querySelector("form").addEventListener("submit", function (event) {

        event.preventDefault();

        var itemAdc = itemLista.value;
        console.log(itemAdc);

        if(listaComp.includes(itemAdc)){
            alert ("Item já existente!")
        }else{
            adicionarLista(itemAdc);
            // var texto = itemAdc;
            // var indexTexto = listaComp.indexOf(itemAdc);
            // textoLista += indexTexto + " - " + texto + "<br>"
            atualizaDisplay();
            attachEditBtns();
            attachDelBtns();
        }
        // exibDiv.innerHTML = textoLista;
      
        console.log(listaComp);

        console.log(textoLista);
    });

    saveBut.addEventListener("click", function(){
        localStorage.setItem ("arraySalvo", listaComp);
    });

    retrBut.addEventListener("click", function (){
        strgToArray = localStorage.getItem("arraySalvo");
        listaComp = strgToArray.split(",")
        console.log (listaComp)

        if(listaComp !== null) {
            alert("Lista recuperada");
        }else{
            alert("Nada a recuperar.")
        }
        
        atualizaDisplay();
        attachEditBtns();
        attachDelBtns();

        // listaComp.forEach(function (item, index) {
        //     textoLista += `<span>${index} - ${item}</span><button class="edit-button">Editar</button><br>`;
        // });
        // exibDiv.innerHTML = textoLista;
    })

    var listaComp = []

    function adicionarLista (item){
    listaComp.push(item)
    }

    function atualizaDisplay () {
        textoLista = "";
        listaComp.forEach(function (item, index) {
            var indexAt = index + 1
            textoLista += `<span>${indexAt} - ${item}  </span><button class="editBtn">Editar</button> <button class="delBtn">Excluir</button><br>`
        })
        exibDiv.innerHTML = textoLista;
    }

    function attachEditBtns () {
        var editBtns = [];
        editBtns = document.querySelectorAll(".editBtn");
        editBtns.forEach(function (item, index){
            item.addEventListener("click", function(){
                var indexplus = index + 1
                var editing = prompt("Editando o item número:" + indexplus);
                if(editing.length>15 || regex.test(editing) === true || editing === null){
                    alert("Entrada inválida");
                }else{
                    listaComp.splice(index, 1, editing);
                    atualizaDisplay();
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
            var indexplus = index + 1;
            item.addEventListener("click", function(){
                listaComp.splice(index, 1);
                alert("Item número " + indexplus + "excluído");
                atualizaDisplay();
                attachEditBtns();
                attachDelBtns();
            })
        })
    }
        
})