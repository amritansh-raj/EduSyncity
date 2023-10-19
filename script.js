var myApp = angular.module("myApp", ["ui.router"]);
myApp.constant("apiUrl", "https://10.21.67.186:8000/");

myApp.service("httpService", [
  "$http",
  "apiUrl",
  function ($http, apiUrl) {
    this.get = function (url, params) {
      return $http
        .get(apiUrl + url, { params: params, withCredentials: true })
        .finally(() => {
          hideLoader();
        });
    };

    this.post = function (url, data) {
      return $http
        .post(apiUrl + url, data, { withCredentials: true })
        .finally(() => {
          hideLoader();
        });
    };

    this.put = function (url, data) {
      return $http
        .put(apiUrl + url, data, { withCredentials: true })
        .finally(() => {
          hideLoader();
        });
    };

    this.delete = function (url, params) {
      return $http
        .delete(apiUrl + url, { params: params, withCredentials: true })
        .finally(() => {
          hideLoader();
        });
    };
  },
]);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("EduSyncity/login");

  $stateProvider
    .state("login", {
      url: "/EduSyncity/login",
      templateUrl: "/Portal_app/templates/login_temp/login.html",
      controller: "loginController",
    })
    .state("quizz", {
      url: "/EduSyncity/quizz",
      templateUrl: "/Portal_app/templates/quizz_temp/quizz.html",
      controller: "quizzController",
    })
    .state("dashBoard", {
      url: "/EduSyncity/dashBoard",
      templateUrl: "/Portal_app/templates/dashboard/dashboard.html",
      controller: "dbController",
    })
    .state("dashBoard.masterConfig", {
      url: "/EduSyncity/config",
      templateUrl: "/Portal_app/templates/dashboard/states/master_config.html",
      controller: "masterController",
    })
    .state("dashBoard.studentregister", {
      url: "/EduSyncity/studentregister",
      templateUrl: "/Portal_app/templates/register_temp/studentregister.html",
      controller: "studentregisterController",
    })
    .state("dashBoard.teacherregister", {
      url: "/EduSyncity/teacherregister",
      templateUrl: "/Portal_app/templates/register_temp/teacherregister.html",
      controller: "teacherregisterController",
    });
});

showLoader = () => {
  document.getElementById("loader").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
};

hideLoader = () => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
};

validatePass = (pass) => {
  var passPatern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passPatern.test(pass);
};

hideModal = (modalId) => {
  const getModal = document.getElementById(modalId);
  const modal = bootstrap.Modal.getInstance(getModal);
  modal.hide();
};
