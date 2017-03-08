function setaImagem() {
    var settings = {
        primeiraImg: function() {
            elemento = document.querySelector("#slider a:first-child"), elemento.classList.add("ativo");
        },
        slide: function() {
            elemento = document.querySelector(".ativo"), elemento.nextElementSibling ? (elemento.nextElementSibling.classList.add("ativo"), 
            elemento.classList.remove("ativo")) : (elemento.classList.remove("ativo"), settings.primeiraImg());
        },
        proximo: function() {
            elemento = document.querySelector(".ativo"), elemento.nextElementSibling ? (elemento.nextElementSibling.classList.add("ativo"), 
            elemento.classList.remove("ativo")) : (elemento.classList.remove("ativo"), settings.primeiraImg());
        },
        anterior: function() {
            elemento = document.querySelector(".ativo"), elemento.previousElementSibling ? (elemento.previousElementSibling.classList.add("ativo"), 
            elemento.classList.remove("ativo")) : (elemento.classList.remove("ativo"), elemento = document.querySelector("a:last-child"), 
            elemento.classList.add("ativo"));
        }
    };
    settings.primeiraImg(), document.querySelector(".next").addEventListener("click", settings.proximo, !1), 
    document.querySelector(".prev").addEventListener("click", settings.anterior, !1);
}

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
}(), window.addEventListener("load", setaImagem, !1);

var ig = angular.module("ig", [ "ngRoute" ]);

ig.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/listnews.html",
        controller: "homeCtrl"
    }).otherwise({
        redirectTo: "/"
    });
}), ig.controller("homeCtrl", [ "$scope", "ig", function($scope, ig) {
    ig.success(function(data) {
        $scope.itemSlide = data;
    });
} ]), ig.factory("ig", [ "$http", function($http) {
    return $http.get("data/slide.json", {
        header: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).success(function(data) {
        return data;
    }).error(function(err) {
        return err;
    });
} ]);