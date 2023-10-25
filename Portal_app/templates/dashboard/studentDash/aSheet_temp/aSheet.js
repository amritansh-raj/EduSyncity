myApp.controller("aSheetController", [
  "$scope",
  "$state",
  "httpService",
  "$window",
  function ($scope, $state, httpService, $window) {
    modal = document.getElementById("examModal");

    httpService
      .get("eduexam/examtype/")
      .then((r) => {
        exams = r.data;
        if (exams) {
          $scope.exams = exams;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    httpService
      .get("eduexam/access_question/")
      .then((r) => {
        subjects = r.data;

        if (subjects) {
          $scope.subjects = subjects;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.examState = (elem) => {
      goFullScreen(elem);

      document.addEventListener("keydown", (e) => {
        if (
          e.key === "F5" ||
          (e.ctrlKey && e.key === "r") ||
          (e.ctrlKey && e.shiftKey && e.key === "R") ||
          (e.ctrlKey && e.shiftKey && e.key === "I")
        ) {
          e.preventDefault();
          return false;
        }

        if (e.key === "Escape" || e.key === "F11") {
          showModal("staticBackdrop");
          e.preventDefault();
          return false;
        }
      });
    };

    $scope.getExam = (selectedExam) => {
      $scope.examId = selectedExam;
      httpService
        .get("eduexam/examinfo/", { id: selectedExam })
        .then((r) => {
          $scope.maxMarks = r.data[0].marks__name;
          $scope.time = r.data[0].duration__name;
          $scope.hours = Math.floor($scope.time / 60);
          $scope.min = $scope.time % 60;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getSubject = (subject) => {
      $scope.selectedSub = subject;
      httpService
        .get("eduexam/get_question_paper/", { id: 10 })
        .then((r) => {
          qPaper = r.data[0].questions;

          if (qPaper) {
            $scope.qPaper = qPaper;
          }
          console.log($scope.qPaper);
        })
        .catch((e) => {
          console.log(e.data);
        });
    };

    $scope.startExam = () => {
      $scope.examState(modal, 2);

      // if (!$window.fullScreen) {
      //   $window.alert("SAdad")
      // }
    };
  },
]);
