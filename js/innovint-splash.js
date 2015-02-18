
var splash = angular.module('splash',["ngResource", "ui.bootstrap", "ngCookies"]);

splash.run(function($document){

    $document.ready(function(){
        var images = ['cow.jpg', 'cow.jpg', 'cow.jpg', 'cow.jpg'];
        angular.element('#fullscreen').css({'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'});
    });

});


splash.service("InterestService", function($resource){

    var interest = $resource("/interest", {}, {
        express : {
            method : "POST"
        }
    });

    var _user = {};
    _user.expressed = false;

    this.user = function() {
        return _user;
    }

    this.express = function( user, onSuccess, onError ) {
      interest.express(user, function(success){
        _user = user;
        _user.expressed = true;
        if ( angular.isFunction(onSuccess) ) {
            onSuccess(success);
        }
      }, function(error){
        if ( angular.isFunction(onError) ) {
            onError(error);
        }
      });
    };

});


splash.controller("Interest", function($scope, $resource, InterestService){

    $scope.user = {};
    $scope.error = false;

    $scope.express = function(user){
        InterestService.express(user, function(){
            $scope.user = InterestService.user();
            $scope.error = false;
        }, function(error){
            $scope.error = "Please enter a valid email.";
        });
    };

});