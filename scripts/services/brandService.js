(function() {
    var brandService = angular.module("myApp").service("brandService",function($http,$q) {
        var baseurl = "http://bami-2414.appspot.com/webapi/";
        this.getStoresByBrandId = function(brandId) {
            var durl = "http://localhost:8888/webapi/storedetailslarge/brandid/"+brandId;
            var url = baseurl+"storedetailslarge/brandid/"+brandId;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            },function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getBrandByBrandId = function(brandId) {
            var durl = "http://localhost:8888/webapi/brands/brandid/"+brandId;
            var url = baseurl+"brands/brandid/"+brandId;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            },function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
    })
})();