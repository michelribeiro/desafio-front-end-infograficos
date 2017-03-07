var Infoglobo = {};

Infoglobo.Pages = {}, $(function() {
    new Infoglobo.ModuleInitializer($("[data-module]"), document.body).init();
}), Infoglobo.ModuleInitializer = function() {
    function ModuleInitializer(modules, container) {
        this.modules = modules, this.container = $(container);
    }
    return ModuleInitializer.fn = ModuleInitializer.prototype, ModuleInitializer.fn.init = function() {
        this.modulesInit(this.container);
    }, ModuleInitializer.fn.modulesInit = function(container) {
        this.modules.each(function() {
            for (var countModules = $(this).data("module").split(" "), i = 0; i < countModules.length; i++) {
                var module = window.Infoglobo[countModules[i]];
                if ("function" == typeof module) {
                    new module($(this), container).run();
                }
            }
        });
    }, ModuleInitializer;
}(), Infoglobo.Alerta = function() {
    function Alerta(element) {
        this.element = element;
    }
    return Alerta.fn = Alerta.prototype, Alerta.fn.run = function() {
        this.element.on("click", $.proxy(this, "click"));
    }, Alerta.fn.click = function() {
        console.log("gravou");
    }, Alerta;
}();