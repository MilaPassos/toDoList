document.addEventListener("DOMContentLoaded", function () {
    var itemLista = document.querySelector("#itemList");
    var exibDiv = document.querySelector("#exibLista");
    var saveBut = document.querySelector("#save");
    var retrBut = document.querySelector("#retrieve");
    var textoLista = "";
  
    document.querySelector("form").addEventListener("submit", function (event) {

        event.preventDefault();

        var itemAdc = itemLista.value;
        console.log(itemAdc);

        if(listaComp.includes(itemAdc)){
            alert ("Item já existente!")
        }else{
            adicionarLista(itemAdc);
            var texto = itemAdc;
            textoLista += texto + "<br>"
        }

        // for (i=0; i < listaComp.length; i++) {
        // var texto = listaComp[i];
        // textoLista += texto + "</br>";
        // }

        exibDiv.innerHTML = textoLista;
      
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

        for (i=0; i < listaComp.length; i++) {
        var texto = listaComp[i];
        textoLista += texto + "</br>";
        }

        exibDiv.innerHTML = textoLista;
    })

    var listaComp = []

    function adicionarLista (item){
    listaComp.push(item)
    }
})