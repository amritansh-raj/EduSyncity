var myApp = angular.module("myApp", ['ui.router']);
var apiUrl = "";
// var apiUrl = ""

myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");

  $stateProvider.state("login", {
    url: "/login",
    templateUrl: "/Portal_app/templates/login_temp/login.html",
    controller: "loginController",
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
