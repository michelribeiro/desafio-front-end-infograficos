ig.controller('homeCtrl', ['$scope', 'ig', function($scope, ig) {
    ig.success(function(data) {
        $scope.itemSlide = data;
    });
}]);