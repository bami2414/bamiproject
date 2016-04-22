(function() {
    var storesController = angular.module("myApp").controller("storesController",function($scope,storesService,homeService,geoLocService) {
        function chunk1(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
        function chunk2(arr,size) {
            var newArr = [];
            for(var i = 0; i < size; i++) {
                newArr.push(arr[i]);
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
        
        $scope.getNearByStores = function() {
            geoLocService.getCurrentLoc().then(function(position) {
                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
                homeService.getNearByStores($scope.lat,$scope.lon).then(function(data) {
                    $scope.showNearby = 'true';
                    $scope.nearByStores = data;
                    $scope.nearByStoresBySize = chunk2($scope.nearByStores,4);
                }, function(data) {
                    $scope.nearByStoresError = data;
                })
            },function(err) {
                $scope.dontShowNearby = 'true';
            })
        }
        
        $scope.getAllStores = function() {
            storesService.getAllStores().then(function(data) {
                $scope.storesData = data;
                $scope.stores = chunk1($scope.storesData,3);
            }, function(data) {
                $scope.storesError = data;
            })
        }
        
        $scope.getAllStores();
        $scope.getNearByStores();
        $scope.getPopularBrands();
    })
})();