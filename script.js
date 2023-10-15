var myApp = angular.module("myApp", ["ui.router"]);
myApp.constant("apiUrl", "https://10.21.85.67:8000/demoadmin/");

myApp.service("httpService", [
  "$http",
  "apiUrl",
  function ($http, apiUrl) {
    this.get = function (url, params) {
      return $http.get(apiUrl + url, { params: params, withCredentials: true });
    };

    this.post = function (url, data) {
      return $http.post(apiUrl + url, data, {withCredentials: true });
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
    })
    .state("register", {
      url: "/EduSyncity/register",
      templateUrl: "/Portal_app/templates/register_temp/register.html",
      controller: "registerController",
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
