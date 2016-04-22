(function (){
    var brandController = angular.module("myApp").controller("brandController", function($scope,$routeParams,homeService,brandService,geoLocService) {
        $scope.brandId = $routeParams.brandId;
        
        function chunk1(arr,size) {
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
        
        $scope.getStoresByBrandId = function() {
            brandService.getStoresByBrandId($scope.brandId).then(function(data) {
                $scope.storeDetailsData = data;
                $scope.storeDetails = chunk1($scope.storeDetailsData,3);
            },function(data) {
                $scope.storeDetailsError = data;
            })
        }
        
        $scope.getBrandByBrandId = function() {
            brandService.getBrandByBrandId($scope.brandId).then(function(data) {
                $scope.brand = data;
            },function(data) {
                $scope.brandError = data;
            })
        }
        
        $scope.getBrandByBrandId();
        $scope.getStoresByBrandId();
        $scope.getPopularBrands();
        $scope.getNearByStores();
    })
})();