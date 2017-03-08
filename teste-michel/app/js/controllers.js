

var baseControllers = angular.module("base.controllers", []);

baseControllers.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {

}]);

baseControllers.controller('slideCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('data/slide.json').then(function (res) {
        $scope.itemSlides = res.data[0].imagens;
    });
}]);

