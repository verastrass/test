function MainCtrl($scope, $http, $timeout) {
	$scope.popupShow = false;
	$scope.slideIndex = 0;
	$http.get('./text/text.json').success(function(data) {
		$scope.json = data;
		$scope.exclength = $scope.json.excerption.length;
		var newSlide = function() {
			$scope.slideIndex = ($scope.slideIndex + 1) % $scope.exclength;
			$timeout(newSlide, 3500);
		};
		$timeout(newSlide, 3500);
		$scope.overlayClick = function() {
			$scope.popupShow = false;
		};
		$scope.purchaseClick = function() {
			$scope.popupShow = true;
		};
		$scope.shareClick = function() {
			alert("You shared this page!");
		};
 		$scope.checkForm = function(email, phone) {
			$scope.popupShow = !(email && phone);
		};
		$scope.changeSlide = function(slide) {
			$scope.slideIndex = slide;
		};
	}).error(function(data, status){console.log("error", data, status);});
}

function EmailDir() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {},
		link: function(scope, elem, attr, ctrl) {
			function emailValidation(value) {
				var re = /^[A-Za-z0-9_]+@{1}[A-Za-z0-9]+\.{1}[A-Za-z]+$/;
				if (re.test(value)) {
				  ctrl.$setValidity('email', true);
				} else {
				  ctrl.$setValidity('email', false);
				}
				return value;
			  }
			  ctrl.$parsers.push(emailValidation);
		}
	};
}

function PhoneDir() {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {},
		link: function(scope, elem, attr, ctrl) {
			function phoneValidation(value) {
				var re = /^((\+7)|8)?\(?[0-9]{3}\)?[0-9]{3}\-?[0-9]{2}\-?[0-9]{2}$/;
				if (re.test(value)) {
				  ctrl.$setValidity('phone', true);
				} else {
				  ctrl.$setValidity('phone', false);
				}
				return value;
			  }
			  ctrl.$parsers.push(phoneValidation);
		}
	}
}


var app = angular.module('app',['ngRoute']);
app.controller('MainCtrl', ['$scope', '$http', '$timeout', MainCtrl]);
app.directive('emailDir', EmailDir);
app.directive('phoneDir', PhoneDir);
app.config(function Routing($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl : "main.html"
		})
		.when("/d", {
			templateUrl : "download.html"
		})
		.when("/m", {
			templateUrl : "menu.html"
		})
		.otherwise({
			redirectTo: '/'
		});
});