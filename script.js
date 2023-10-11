var myApp = angular.module("myApp", ["ui.router"]);
myApp.constant("apiUrl", "https://10.21.67.122:8000/eduadmin/");

myApp.service("httpService", [
  "$http",
  "apiUrl",
  function ($http, apiUrl) {
    this.get = function (url, params) {
      return $http.get(apiUrl + url, { params: params, withCredentials: true });
    };

    this.post = function (url, data) {
      return $http.post(apiUrl + url, data, { params: params, withCredentials: true });
    };
  },
]);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/EduSyncity/login");

  $stateProvider
    .state("login", {
      url: "/EduSyncity/login",
      templateUrl: "/Portal_app/templates/login_temp/login.html",
      controller: "loginController",
    })
    .state("dashBoard", {
      url: "/EduSyncity/dashBoard",
      templateUrl: "/Portal_app/templates/dashboard/dashboard.html",
      controller: "dbController",
    });
});

function showLoader() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

function validatePass(pass) {
  var passPatern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passPatern.test(pass);
}

function validateEmail(email) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}