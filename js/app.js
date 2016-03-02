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
    console.log(accessToken);

    $scope.getReceipt = function(orderId){
        $http({
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + accessToken
            },
            url: 'https://api.clover.com/v3/merchants/' + urlParams.merchant_id + '/orders/' + orderId
        }).then(function successCallback(response) {
            console.log(response);
            // mock data from cURL request
            $scope.order = {"href": "https://www.clover.com/v3/merchants/JPN99HVXZY2BT/orders/ZWT5ZMQKPZTEY", "id": "ZWT5ZMQKPZTEY", "currency": "USD", "employee": {"id": "4PCV3NDTD08H8"}, "total": 3598, "taxRemoved": false, "isVat": false, "state": "locked", "manualTransaction": false, "groupLineItems": true, "testMode": false, "payType": "FULL", "createdTime": 1456892337000, "clientCreatedTime": 1456892337000, "modifiedTime": 1456901688000, "device": {"id": "3d2b929d-bf82-4d43-ad73-f47fb50990ea"}}
            $scope.lineItems = {"elements": [ {"id": "Q05F911991502", "orderRef": {"id": "ZWT5ZMQKPZTEY"}, "item": {"id": "BB8AVRP4G6RFP"}, "name": "Cracking the Coding Interview", "price": 2499, "printed": false, "createdTime": 1456892341000, "orderClientCreatedTime": 1456892337000, "exchanged": false, "refunded": false, "isRevenue": true}, {"id": "H0DBAJWFCKGKA", "orderRef": {"id": "ZWT5ZMQKPZTEY"}, "item": {"id": "DPXYGGX5YNS66"}, "name": "The Design of Everyday Things", "alternateName": "", "price": 1099, "printed": false, "createdTime": 1456892337000, "orderClientCreatedTime": 1456892337000, "exchanged": false, "refunded": false, "isRevenue": true}], "href": "http://api.clover.com/v3/merchants/JPN99HVXZY2BT/orders/ZWT5ZMQKPZTEY/line_items?limit=100"};
        }, function errorCallback(response) {
            console.log(response);
            // mock data from cURL request
            $scope.order = {"href": "https://www.clover.com/v3/merchants/JPN99HVXZY2BT/orders/ZWT5ZMQKPZTEY", "id": "ZWT5ZMQKPZTEY", "currency": "USD", "employee": {"id": "4PCV3NDTD08H8"}, "total": 3598, "taxRemoved": false, "isVat": false, "state": "locked", "manualTransaction": false, "groupLineItems": true, "testMode": false, "payType": "FULL", "createdTime": 1456892337000, "clientCreatedTime": 1456892337000, "modifiedTime": 1456901688000, "device": {"id": "3d2b929d-bf82-4d43-ad73-f47fb50990ea"}}
            $scope.lineItems = {"elements": [ {"id": "Q05F911991502", "orderRef": {"id": "ZWT5ZMQKPZTEY"}, "item": {"id": "BB8AVRP4G6RFP"}, "name": "Cracking the Coding Interview", "price": 2499, "printed": false, "createdTime": 1456892341000, "orderClientCreatedTime": 1456892337000, "exchanged": false, "refunded": false, "isRevenue": true}, {"id": "H0DBAJWFCKGKA", "orderRef": {"id": "ZWT5ZMQKPZTEY"}, "item": {"id": "DPXYGGX5YNS66"}, "name": "The Design of Everyday Things", "alternateName": "", "price": 1099, "printed": false, "createdTime": 1456892337000, "orderClientCreatedTime": 1456892337000, "exchanged": false, "refunded": false, "isRevenue": true}], "href": "http://api.clover.com/v3/merchants/JPN99HVXZY2BT/orders/ZWT5ZMQKPZTEY/line_items?limit=100"};
        });
    };
}])

.directive('receipt', function(){
    return {
        restrict: 'E',
        scope: {
            order: '=order',
            lineItems: '=lineitems'
        },
        templateUrl: '/directiveTemplates/receipt.html'
    };
})

.filter('prettyPrice', function(){
    return function(input){
        var cents = input % 100;
        var dollars = Math.floor(input / 100);
        return '$' + dollars + '.' + cents;
    };
});
