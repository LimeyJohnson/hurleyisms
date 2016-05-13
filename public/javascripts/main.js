angular.module('hurleyisms', [])
  .controller('MainController', ['$scope', '$http', function ($scope, $http) {
      $scope.Lines = [];
      $scope.GetLines = function () {
          $http.get('admin/data').then(function (data) {
              $scope.Lines = data.data;
          });
      }
      $scope.GetLines();
  }]);