(function () {
    var brandsController = angular.module("myApp").controller("brandsController", function ($scope,brandsService,homeService,geoLocService) {
        function chunk1(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
        function chunk2(arr, size) {
            var newArr = [];
            for (var i = 0; i < size; i++) {
                newArr.push(arr[i]);
            }
            return newArr;
        }
        $scope.getAllBrands = function() {
            brandsService.getAllBrands().then(function(data) {
                $scope.brandData = data;
                $scope.brands = chunk1($scope.brandData, 3);
            }, function(data) {
                $scope.brandsError = data;
            })   
        }
        $scope.getNearByStores = function() {
            geoLocService.getCurrentLoc().then(function(position) {
                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
                homeService.getNearByStores($scope.lat,$scope.lon).then(function(data) {
                    $scope.showNearby = 'true';
                    $scope.nearByStores = data;
                    $scope.nearByStoresBySize = chunk2($scope.nearByStores,4);
                },function(data) {
                    $scope.nearByStoresError = data;
                })    
            },function(err) {
                $scope.dontShowNearby = 'true';
            })
        }
        
        $scope.getPopularStores = function() {
            homeService.getPopularStores().then(function(data) {
                $scope.popularStores = data;
            }, function(data) {
                $scope.popularStoresError = data;
            })
        }
        $scope.getNearByStores();
        $scope.getPopularStores();
        $scope.getAllBrands();
    })
})();