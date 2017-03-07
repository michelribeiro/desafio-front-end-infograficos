Infoglobo.Alerta = (function(){
  function Alerta(element) {
    this.element = element;
  }

  Alerta.fn = Alerta.prototype;

    Alerta.fn.run = function() {
        this.element.on("click", $.proxy(this, "click"));
    };

    Alerta.fn.click = function() {
        console.log("gravou");
    };

  return Alerta;
})();