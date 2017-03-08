
var ig = angular.module('ig', ['ngRoute']);

ig.config(function($routeProvider) {

	$routeProvider
	.when('/', {
        templateUrl: 'views/listnews.html',
        controller: 'homeCtrl'
    })
    .otherwise({ redirectTo: '/' });

});

