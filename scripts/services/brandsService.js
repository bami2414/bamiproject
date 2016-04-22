(function() {
    var brandsService = angular.module("myApp").service("brandsService",function($q,$http){
        var baseurl = "http://bami-2414.appspot.com/webapi/";
        this.getAllBrands = function() {
            var durl = "http://localhost:8888/webapi/brands";
            var url = baseurl+"brands";
            var defered = $q.defer();
            $http.get(url).then(function(response){
                defered.resolve(response.data);
            }, function(reason) {
                defered.reject({errorMessage: "server error"});
            })
            return defered.promise;
        }
    })
})();