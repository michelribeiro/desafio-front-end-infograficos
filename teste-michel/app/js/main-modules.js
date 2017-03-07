// Initialize the application's namespace.
var Infoglobo = {};
Infoglobo.Pages = {};

$(function(){
  // Initialize an application instance.
  // I must receive the body element as the container.
  var app = new Infoglobo.ModuleInitializer(
    $('[data-module]'),
    document.body
  );

  // Just start the application.
  app.init();
});