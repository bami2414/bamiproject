(function () {
    var navController = angular.module("myApp").controller("navController",function ($scope,$location,navService,auth,store) {
        $scope.view = "/templates/navbar.html";
        $scope.getAllBrandAndStore = function() {
            navService.getAllBrandAndStore().then(function(data) {
                $scope.data = data;
            },function(data) {
                $scope.dataError = data;
            })
        }
        $scope.search = function(selected) {
            var url;
            console.log(selected);
            if(selected.type == "B") {
                url = "/brands/"+selected.id;
            } else if(selected.type == "S") {
                url = "/stores/"+selected.id;
            } else {
                url = $location.url();
            }
            $location.path(url);
        }
        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
        }
        $scope.getAllBrandAndStore();
        $scope.auth = auth;
    })
})();