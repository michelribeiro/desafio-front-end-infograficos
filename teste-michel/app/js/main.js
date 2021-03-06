function setaImagem() {
    var settings = {
        primeiraImg: function() {
            elemento = $("#slider a:first-child").addClass("ativo");
        },
        slide: function() {
            elemento = $(".ativo").find(), elemento.nextElementSibling ? (elemento.nextElementSibling.classList.add("ativo"), 
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

function drawChart() {
    var data = google.visualization.arrayToDataTable([ [ "Element", "Density", {
        role: "style"
    } ], [ "Governo", 75, "#b22d30" ], [ "Carnaval", 50, "color:#000000;" ], [ "Esporte", 45, "color:#000000" ], [ "Férias", 30, "color:#000000" ], [ "Outros", 25, "color:#000000" ] ]), view = new google.visualization.DataView(data);
    view.setColumns([ 0, 1, {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
    }, 2 ]);
    var options = {
        width: 550,
        height: 400,
        bar: {
            groupWidth: "95%"
        },
        legend: {
            position: "none"
        }
    };
    new google.visualization.ColumnChart(document.getElementById("chart_div")).draw(view, options);
}

angular.module("ig", [ "ngRoute", "base.controllers" ]).config([ "$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/listnews.html",
        controller: "homeCtrl"
    }).otherwise({
        redirectTo: "/"
    });
} ]);

var baseControllers = angular.module("base.controllers", []);

baseControllers.controller("homeCtrl", [ "$scope", "$http", function($scope, $http) {
    $http.get("data/noticias.json", {
        header: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(function(res1) {
        $scope.news = res1.data[0].Editorias, angular.forEach($scope.news, function(editoria) {
            angular.forEach(editoria["Notícias"], function(noticia) {
                noticia.Editoria = editoria.Editoria;
                var dataOriginal = noticia["Data de publicação"];
                noticia.Data = dataOriginal.substr(6, 4) + dataOriginal.substr(3, 2) + dataOriginal.substr(0, 2);
            });
        }), selecionarTodas();
    }), $scope.ordenar = function(val) {
        return null == val || "recente" == val ? "-Data" : "antiga" == val ? "Data" : "'Título'";
    };
    var selecionarTodas = function() {
        var todas = [];
        angular.forEach($scope.news, function(editoria) {
            todas = todas.concat(editoria["Notícias"]);
        }), $scope.opcaoFiltroEditoria = {
            Editoria: "Todas",
            "Notícias": todas
        };
    };
    $scope.funcao = function() {
        null == $scope.opcaoFiltroEditoria && selecionarTodas();
    };
} ]), baseControllers.controller("slideCtrl", [ "$scope", "$http", function($scope, $http) {
    $http.get("data/slide.json").then(function(res) {
        $scope.itemSlides = res.data[0].imagens;
    });
} ]), $(function() {
    $.getJSON("data/slide.json", function(data) {});
}), window.addEventListener("load", setaImagem, !1), google.charts.load("current", {
    packages: [ "corechart" ]
}), google.charts.setOnLoadCallback(drawChart);