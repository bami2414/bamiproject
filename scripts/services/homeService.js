(function() {
    var homeService = angular.module("myApp").service("homeService",function($http,$q) {
        var baseurl = "http://bami-2414.appspot.com/webapi/";
        this.getPopularBrands = function() {
            var durl = "http://localhost:8888/webapi/brands/popularbrands";
            var url = baseurl+"brands/popularbrands";
            var defered = $q.defer();
            $http.get(url).then(function(response){
                defered.resolve(response.data);
            }, function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getPopularStores = function() {
            var durl = "http://localhost:8888/webapi/stores/popularstores";
            var url = baseurl+"stores/popularstores";
            var defered = $q.defer();
            $http.get(url).then(function(respose){
                defered.resolve(respose.data);
            }, function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getNearByStores = function(lat,lon) {
            var durl = "http://localhost:8888/webapi/stores/nearby?lat="+lat+"&lon="+lon;
            var url = baseurl+"stores/nearby?lat="+lat+"&lon="+lon;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            }, function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
    })
})();