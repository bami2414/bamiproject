(function() {
    var storesService = angular.module("myApp").service("storesService",function($http,$q) {
        var baseurl = "http://bami-2414.appspot.com/webapi/";
        this.getAllStores = function() {
            var durl = "http://localhost:8888/webapi/storedetailslarge";
            var url = baseurl+"storedetailslarge";
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