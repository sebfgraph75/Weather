function WeatherCtrl($scope, $http, GeolocationService){

    $scope.panel = 0;

    $scope.search = function(){
        var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + $scope.city + "&mode=json&units=metric&appid=cbca24b7e62386ee42a597817f55005d";
        $scope.loader = true;
        $http.get(url).success(httpSuccess).error(httpError);
    }

    $scope.expand = function(e){
        $elem = $(e.currentTarget);
        $elem.addClass('row_active').siblings().removeClass('row_active');
    }

    $scope.geolocate = function(){
        $scope.loader = true;
        GeolocationService.getCurrentPosition().then(function(position){
            $http.get("http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&mode=json&units=metric&appid=cbca24b7e62386ee42a597817f55005d").success(httpSuccess).error(httpError);
        }, function(){
            $scope.loader = false;
            alert('Impossible d\'obtenir votre position');
        })
    }

    httpSuccess = function(response){
        $scope.panel = 1;
        $scope.loader = false;
        $scope.weather = response;
    }

    httpError = function(){
        $scope.loader = false;
        alert('Impossible de récupérer les informations');
    }

    $scope.Math = Math;

}