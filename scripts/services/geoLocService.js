(function() {
    var geoLocService = angular.module("myApp").service("geoLocService",function($q) {
        this.getCurrentLoc = function() {
            var defered = $q.defer();
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    defered.resolve(position);
                },function(err) {
                    defered.reject(err);
                })
            } else {
                defered.reject("Geolocation not supported");
            }
            return defered.promise;
        }
    })
})();