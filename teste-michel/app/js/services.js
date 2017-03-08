
ig.factory('ig', ['$http', function($http) {
    return $http.get('data/slide.json',
        {header : {'Content-Type' : 'application/json; charset=UTF-8'}
    }).success(function(data) {
        return data;
    })
    .error(function(err) {
        return err;
    });
}]);