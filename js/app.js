angular.module('myApp', [
    'ngRoute'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/index.html'});
    $locationProvider.html5Mode(true);
}])

.controller('indexController', ['$scope', '$location', '$window', function($scope, $location, $window) {
    $scope.title = "Title";
    $scope.urlParams = $location.search();
    var code = $location.search().code;
    if(typeof code === 'undefined'){
        $window.location.href = 'https://www.clover.com/oauth/authorize?client_id=WXSGVB6YKHQKG';
    }
}]);