(function(){
    var myApp = angular.module("myApp",["ngRoute","ui.bootstrap","auth0", "angular-storage", "angular-jwt"])
    .config(function ($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl: "templates/home.html",
            controller: "homeController"
        })
        .when("/brands", {
            templateUrl: "templates/brands.html",
            controller: "brandsController"
        })
        .when("/brands/:brandId", {
            templateUrl: "templates/brand.html",
            controller: "brandController"
        })
        .when("/stores", {
            templateUrl: "templates/stores.html",
            controller: "storesController"
        })
        .when("/stores/:storeId", {
            templateUrl: "templates/store.html",
            controller: "storeController"
        })
        .when("/nearByStores", {
            templateUrl: "templates/nearByStores.html",
            controller: "nearByStoresController"
        })
        .otherwise({redirectTo:"/home"});
    })
    .config(function (authProvider) {
        authProvider.init({
            domain: 'bami.auth0.com',
            clientID: 'K9sKcqAIUeAFpMctjWnwpvlzjP3FGBt8'
        });
        authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            console.log("Login Success");
            profilePromise.then(function(profile) {
                store.set('profile', profile);
                store.set('token', idToken);
            });
            $location.path('/');
        });
        authProvider.on('loginFailure', function(error) {
            // Error Callback
            $location.path('/');
        });
    })
    .run(function($rootScope, auth, store, jwtHelper, $location) {
        // This hooks al auth events to check everything as soon as the app starts
        auth.hookEvents();
        $rootScope.$on('$locationChangeStart', function() {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    // Either show the login page or use the refresh token to get a new idToken
                    $location.path('/');
                }
            }
        });
    });
})();