var hurleyApp = angular.module('hurleyisms', []);

hurleyApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.Lines = [];
    /*****************************************
                   DataAccess 
    *****************************************/
    function updateCache(callback) {
        $.getJSON('/data/' + audience + '/' + profanity, function (data) {
            cachedLines = data;
            callback();
        });
    }
    function sendLine(line, callback) {
        $.post('/add', line, function (data) {
            callback();
        });
    }
    function rate(id, rating, callback) {
        $.getJSON('/rate/' + id + '/' + rating, function (data) {
            callback();
        });
    }
    $scope.View = 1;
    $scope.profanity = false;
    $scope.toggleProfanity = function(caller) {
        $scope.profanity = !$scope.profanity;
    }
      $scope.changeView = function (viewNum) {
          $scope.View = viewNum;
      }
      $scope.start = function (type) {
          $scope.changeView(3);
      }
  }]);