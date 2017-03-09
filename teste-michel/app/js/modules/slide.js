function setaImagem(){
    var settings = {
        primeiraImg: function(){
            elemento = $("#slider a:first-child").addClass("ativo");

        },
 
        slide: function(){
            elemento = $(".ativo").find();
 
            if(elemento.nextElementSibling){
                elemento.nextElementSibling.classList.add("ativo");
                elemento.classList.remove("ativo");
            }else{
                elemento.classList.remove("ativo");
                settings.primeiraImg();
            }
        },
        proximo: function(){
            elemento = document.querySelector(".ativo");
            if(elemento.nextElementSibling){
                elemento.nextElementSibling.classList.add("ativo");
                elemento.classList.remove("ativo");
            }else{
                elemento.classList.remove("ativo");
                settings.primeiraImg();
            }
        },
        anterior: function(){
            elemento = document.querySelector(".ativo");
            if(elemento.previousElementSibling){
                elemento.previousElementSibling.classList.add("ativo");
                elemento.classList.remove("ativo");
            }else{
                elemento.classList.remove("ativo");
                elemento = document.querySelector("a:last-child");
                elemento.classList.add("ativo");
            }
        },
    }
    //chama o slide
    settings.primeiraImg();
    document.querySelector(".next").addEventListener("click",settings.proximo,false);
    document.querySelector(".prev").addEventListener("click",settings.anterior,false);
}
window.addEventListener("load",setaImagem,false);
