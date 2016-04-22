(function() {
    var navService = angular.module("myApp").service("navService",function($http,$q) {
        var baseurl = "http://bami-2414.appspot.com/webapi/";
        this.getAllBrandAndStore = function() {
            var durl = "http://localhost:8888/webapi/brandandstores";
            var url = baseurl+"brandandstores";
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