

var baseControllers = angular.module("base.controllers", []);

baseControllers.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('data/noticias.json',
        {header : {'Content-Type' : 'application/json; charset=UTF-8'}
    }).then(function (res1) {
        $scope.news = res1.data[0].Editorias;

        angular.forEach($scope.news, function(editoria) {
            angular.forEach(editoria['Notícias'], function(noticia) {
                noticia.Editoria = editoria.Editoria;
                var dataOriginal = noticia['Data de publicação'];
                noticia.Data = dataOriginal.substr(6, 4) + dataOriginal.substr(3, 2) + dataOriginal.substr(0, 2);
            });
        });
        selecionarTodas();

    });

    $scope.ordenar = function(val) {
            if(val == null || val == 'recente')
                return '-Data';

            if(val == 'antiga')
                return 'Data';

            return '\'Título\'';
    }

    var selecionarTodas =  function() {
        var todas = [];
        angular.forEach($scope.news, function(editoria) {
            todas = todas.concat(editoria['Notícias']);
        });
        $scope.opcaoFiltroEditoria = { Editoria: 'Todas', 'Notícias': todas };
    };

    $scope.funcao = function() {

        if($scope.opcaoFiltroEditoria == null) {
            selecionarTodas();
        }
    }

}]);


baseControllers.controller('slideCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('data/slide.json').then(function (res) {
        $scope.itemSlides = res.data[0].imagens;
    });

}]);

