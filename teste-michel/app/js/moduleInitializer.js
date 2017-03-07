Infoglobo.ModuleInitializer = (function(){
  function ModuleInitializer(modules, container) {
    this.modules = modules;
    this.container = $(container);
  }

  ModuleInitializer.fn = ModuleInitializer.prototype;

  ModuleInitializer.fn.init = function() {
    this.modulesInit(this.container);
  };

  ModuleInitializer.fn.modulesInit = function (container) {
    this.modules.each(function(){
      var countModules = $(this).data("module").split(" ");

      for (var i = 0; i < countModules.length; i++) {

        var module = window["Infoglobo"][countModules[i]];

        if (typeof module === "function") {
          var initializer = new module(
            $(this),
            container
          );

          initializer.run();
        }
      }
    });
  };

  return ModuleInitializer;
})();