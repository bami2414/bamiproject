(function() {
    var storeService = angular.module("myApp").service("storeService",function($http,$q) {
        var baseurl = "http://bami-2414.appspot.com/webapi/";
        this.getStoreLocation = function(storeId) {
            var durl = "http://localhost:8888/webapi/storelocations/storeid/"+storeId;
            var url = baseurl+"storelocations/storeid/"+storeId;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            },function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getStoreOffer = function(storeId) {
            var durl = "http://localhost:8888/webapi/offers/storeid/"+storeId;
            var url = baseurl+"offers/storeid/"+storeId;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            },function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getStoreWorkingHour = function(storeId) {
            var durl = "http://localhost:8888/webapi/storeworkinghours/storeid/"+storeId;
            var url = baseurl+"storeworkinghours/storeid/"+storeId;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            },function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getStoreDetail = function(storeId) {
            var durl = "http://localhost:8888/webapi/storedetails/storeid/"+storeId;
            var url = baseurl+"storedetails/storeid/"+storeId;
            var defered = $q.defer();
            $http.get(url).then(function(response) {
                defered.resolve(response.data);
            },function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
        this.getStoreContentDetails = function(storeId) {
            var durl = "http://localhost:8888/webapi/storecontents/storeid/"+storeId;
            var url = baseurl+"storecontents/storeid/"+storeId;
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