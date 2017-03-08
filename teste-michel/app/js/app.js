
var ig = angular.module('ig', ['ngRoute', 'base.controllers']);

ig.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
        templateUrl: 'views/listnews.html',
        controller: 'homeCtrl'
    })
    .otherwise({ redirectTo: '/' });

}]);

