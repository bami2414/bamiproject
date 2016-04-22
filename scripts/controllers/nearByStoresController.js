(function() {
    var nearByStoresController = angular.module("myApp").controller("nearByStoresController",function($scope,homeService,geoLocService) {
        function chunk1(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
        $scope.getPopularBrands = function() {
            homeService.getPopularBrands().then(function(data) {
                $scope.popularBrands = data;
            },function(data) {
                $scope.popularBrandsError = data;
            })
        }
        $scope.getPopularStores = function() {
            homeService.getPopularStores().then(function(data) {
                $scope.popularStores = data;
            }, function(data) {
                $scope.popularStoresError = data;
            })
        }
        $scope.getNearByStores = function() {
            geoLocService.getCurrentLoc().then(function(position) {
                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
                homeService.getNearByStores($scope.lat,$scope.lon).then(function(data) {
                    $scope.showNearby = 'true';
                    $scope.nearByStoresData = data;
                    console.log(data);
                    $scope.nearByStores = chunk1($scope.nearByStoresData,3);
                }, function(data) {
                    $scope.nearByStoresError = data;
                })
            },function(err) {
                $scope.dontShowNearby = 'true';
            })
        }
        
        $scope.getPopularBrands();
        $scope.getPopularStores();
        $scope.getNearByStores();
    })
})();