(function() {
    var homeController = angular.module("myApp").controller("homeController",function($scope,homeService,geoLocService) {
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
                    $scope.nearByStores = data;
                    $scope.nearByStoresBySize = chunk($scope.nearByStores,4);
                }, function(data) {
                    $scope.nearByStoresError = data;
                })
            },function(err) {
                $scope.dontShowNearby = 'true';
                console.log(err);
            })
        }
        
        function chunk(arr,size) {
            var newArr = [];
            for(var i = 0; i < size; i++) {
                newArr.push(arr[i]);
            }
            return newArr;
        }
        
        $scope.getPopularBrands();
        $scope.getPopularStores();
        $scope.getNearByStores();
    })
})();