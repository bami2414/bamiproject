(function() {
    var storeController = angular.module("myApp").controller("storeController",function($scope,$routeParams,homeService,storeService,geoLocService) {
        $scope.storeId = $routeParams.storeId;
        $scope.weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
        function checkDay(offDay) {
            var d = new Date();
            var n = d.getDay();
            if($scope.weekday[n] == offDay.toUpperCase())
                return true;
            else
                return false;
        }
        function chunk2(arr, size) {
            var newArr = [];
            for (var i = 0; i < size; i++) {
                newArr.push(arr[i]);
            }
            return newArr;
        }
        
        function initializeMap(lat,lon) {
            var latLon = {lat:lat,lng:lon};
            var mapProp = {
                center:latLon,
                zoom:17,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),mapProp);
            var marker = new google.maps.Marker({
                position: latLon,
                map: map
            });
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
        
        $scope.getStoreLocation = function() {
            storeService.getStoreLocation($scope.storeId).then(function(data) {
                $scope.storeLocation = data;
                //console.log($scope.storeLocation);
                initializeMap($scope.storeLocation.lat,$scope.storeLocation.lon);
            },function(data) {
                $scope.storeLocationError = data;
            })
        }
        
        $scope.getStoreOffer = function() {
            storeService.getStoreOffer($scope.storeId).then(function(data) {
                $scope.offer = data;
            },function(data) {
                $scope.offerError = data;
            })
        }
        
        $scope.getStoreDetail = function() {
            storeService.getStoreDetail($scope.storeId).then(function(data) {
                $scope.storeDetail = data;
            },function(data) {
                $scope.storeDetailError = data;
            })
        }
        
        $scope.getStoreWorkingHour = function() {
            storeService.getStoreWorkingHour($scope.storeId).then(function(data) {
                $scope.storeWorkingHour = data;
                if(checkDay($scope.storeWorkingHour.offDay)) {
                    $scope.label = "label-danger";
                    $scope.today = "CLOSED";
                } else {
                    $scope.label = "label-success";
                    $scope.today = "OPEN"
                }
            },function(data) {
                $scope.storeWorkingHourError = data;
            })
        }
        
        $scope.getStoreContentDetails = function() {
            storeService.getStoreContentDetails($scope.storeId).then(function(data) {
                $scope.storeContentDetails = data;
            },function(data) {
                $scope.storeContentDetailsError = data;
            })
        }
        
        $scope.getStoreContentDetails();
        $scope.getStoreLocation();
        $scope.getNearByStores();
        $scope.getPopularStores();
        $scope.getStoreOffer();
        $scope.getStoreDetail();
        $scope.getStoreWorkingHour();
    })
})();