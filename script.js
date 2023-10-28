var myApp = angular.module("myApp", ["ui.router"]);
myApp.constant("apiUrl", "https://10.21.67.136:8000/");

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
    .state("dashBoard.masterConfig", {
      url: "/EduSyncity/config",
      templateUrl:
        "/Portal_app/templates/dashboard/adminDash/parent-child/master_config.html",
      controller: "masterController",
    })
    .state("dashBoard.mapping", {
      url: "/EduSyncity/mapping",
      templateUrl:
        "Portal_app/templates/dashboard/adminDash/mappingstates/mapping.html",
      controller: "mappingController",
    })
    .state("dashBoard.panel", {
      url: "/EduSyncity/panel",
      templateUrl:
        "Portal_app/templates/dashboard/adminDash/manage_panel/managePanel.html",
      controller: "panelController",
    })
    .state("dashBoard.datesheet", {
      url: "/EduSyncity/datesheet",
      templateUrl:
        "Portal_app/templates/dashboard/adminDash/examination/datesheet/datesheet.html",
      controller: "datesheetController",
    })
    .state("dashBoard.viewdatesheet", {
      url: "/EduSyncity/viewdatesheet",
      templateUrl:
        "Portal_app/templates/dashboard/adminDash/examination/viewdatesheet/viewdatesheet.html",
      controller: "viewdatesheetContoller",
    })
    .state("dashBoard.examMap", {
      url: "/EduSyncity/examMap",
      templateUrl:
        "Portal_app/templates/dashboard/adminDash/examination/exam_mapping/exam_mapping.html",
      controller: "examMappingController",
    })
    .state("dashBoard.studentregister", {
      url: "/EduSyncity/studentregister",
      templateUrl:
        "/Portal_app/templates/dashboard/adminDash/register/student/studentregister.html",
      controller: "studentregisterController",
    })
    .state("dashBoard.teacherregister", {
      url: "/EduSyncity/teacherregister",
      templateUrl:
        "/Portal_app/templates/dashboard/adminDash/register/teacher/teacherregister.html",
      controller: "teacherregisterController",
    })
    .state("dashBoard.qPaper", {
      url: "/EduSyncity/qPaper",
      templateUrl:
        "/Portal_app/templates/dashboard/teacherDash/qPaper_temp/qPaper.html",
      controller: "qPaperController",
    })
    .state("dashBoard.aSheet", {
      url: "/EduSyncity/aSheet",
      templateUrl:
        "/Portal_app/templates/dashboard/studentDash/aSheet_temp/aSheet.html",
      controller: "aSheetController",
    })
    .state("dashBoard.eval", {
      url: "/EduSyncity/eval",
      templateUrl:
        "/Portal_app/templates/dashboard/teacherDash/evaluation/evaluate.html",
      controller: "evalController",
    })
    .state("dashBoard.studentmarks", {
      url: "/EduSyncity/studentmarks",
      templateUrl:
        "/Portal_app/templates/dashboard/studentDash/studentmarks_temp/studentmarks.html",
      controller: "studentmarksController",
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

validateEmail = (email) => {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

validatePhoneNumber = (phoneNumber) => {
  var phonePattern = /^\d{10}$/;
  return phonePattern.test(phoneNumber);
};

hideModal = (modalId) => {
  const getModal = document.getElementById(modalId);
  const modal = bootstrap.Modal.getInstance(getModal);
  modal.hide();
};

showModal = (modalId) => {
  console.log(modalId);
  const getModal = document.getElementById(modalId);
  const modal = new bootstrap.Modal(getModal);
  modal.show();
};

const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
  .toString()
  .padStart(2, "0")}`;

const count = 3;

goFullScreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
};

exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
