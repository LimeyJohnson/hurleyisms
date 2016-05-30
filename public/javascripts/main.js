var hurleyApp = angular.module('hurleyisms', []);

hurleyApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.Lines = [];
    $scope.CurrentLines = [];
    /*****************************************
                   DataAccess 
    *****************************************/
    function updateCache(callback) {
        $.getJSON('/data/' + $scope.audience + '/' + $scope.profanity, function (data) {
            $scope.Lines = data;
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
    $scope.toggleProfanity = function (caller) {
        $scope.profanity = !$scope.profanity;
    }
    $scope.changeView = function (viewNum) {
        $scope.View = viewNum;
    }
    $scope.start = function (type) {
        $scope.audience = type;
        updateCache(function () {
            updateLines();
        });
    }
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (/* function */ callback, /* DOMElement */ element) {
              window.setTimeout(callback, 1000 / 60);
          };
    })();
    var lineIndex = 0;
    var lineSize = 5;
    function updateLines() {
        $scope.$apply(function () {
            $scope.changeView(3);
            $scope.CurrentLines = $scope.Lines.slice(lineIndex, lineIndex + lineSize);
            lineIndex += lineSize;
        });
        startProgressBar();
    }
    var totalTime = 5 * 1000;
    var $progressBarFill = $("#progress-bar__fill");
    var progressBarStartTime;
    function startProgressBar() {
        progressBarStartTime = new Date();
        animateProgressBar();
        $progressBarFill.width(0);
    }

    function animateProgressBar() {
        var elapsedTime = new Date() - progressBarStartTime;
        if (elapsedTime <= totalTime) {
            requestAnimFrame(animateProgressBar);
            drawProgressBar(elapsedTime);
        }
        else {
            updateLines();
        }
    }
    function drawProgressBar(elapsedTime) {
        var percentage = ((elapsedTime / totalTime) * 100) + "%";
        $progressBarFill.css("width", percentage)
    }

}]);