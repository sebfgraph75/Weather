document.addEventListener('deviceready', function(){
    navigator.splashscreen.hide();
}, false);

var app = angular.module('app', []);

app.factory('GeolocationService', function($window, $q, $rootScope){

	var geolocation = $window.navigator.geolocation;
	return {
		getCurrentPosition : function(){
			var defer = $q.defer();
			geolocation.getCurrentPosition(function(position){
				$rootScope.$apply(function(){
					defer.resolve(position);
				})
			}, function(){
				$rootScope.$apply(function(){
					defer.reject();
				})
			})
			return defer.promise;
		}
	}
})

app.config(function($routeProvider){
    $routeProvider
        .when('/home', {templateUrl: 'partials/home.html'})
        .when('/about', {templateUrl: 'partials/about.html'})
        .otherwise({redirectTo: '/home'})
})