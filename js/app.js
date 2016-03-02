angular.module('myApp', [
    'ngRoute'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/index.html'});
    $locationProvider.html5Mode(true);
}])

.controller('indexController', ['$scope', '$location', '$window', '$http', function($scope, $location, $window, $http) {
    $scope.title = "Title";
    $scope.urlParams = $location.search();
    var urlParams = $location.search();
    if(typeof urlParams.merchant_id === 'undefined'){
        $window.location.href = 'https://www.clover.com/oauth/authorize?client_id=WXSGVB6YKHQKG&response_type=token';
    }
    var accessToken = $location.url().slice($location.url().indexOf("#access_token=") + "#access_token=".length);
    var orderId = '6DFFA6XAAAH58';
    $http({
        method: 'GET',
        url: 'https://api.clover.com/v3/merchants/' + urlParams.merchant_id + '/orders/' + orderId,
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        }
    }).then(function successCallback(response) {
        console.log(response);
    }, function errorCallback(response) {
        console.log(response);
    });
}]);