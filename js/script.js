document.addEventListener("DOMContentLoaded", function () {
    var itemLista = document.querySelector("#itemList");
    var exibDiv = document.querySelector("#exibLista");
  
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        var itemAdc = itemLista.value;
        console.log(itemAdc);

        adicionarLista(itemAdc);

        console.log(listaComp);


        var textoLista = "";

        for (i=0; i < listaComp.length; i++) {
        var texto = listaComp[i];
        textoLista += texto + "</br>";
        }

        exibDiv.innerHTML = textoLista;
      
      });

    });

    var listaComp = [];

    

    function adicionarLista (item){
        listaComp.push(item)
    };
  
  
  
  
  
  