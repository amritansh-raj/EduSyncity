myApp.controller("aSheetController", [
  "$scope",
  "$state",
  "httpService",
  function ($scope, $state, httpService) {
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

    $scope.getExam = (selectedExam) => {
      $scope.examId = selectedExam;
      httpService
        .get("eduexam/examinfo/", { id: selectedExam })
        .then((r) => {
          console.log(r.data);
          $scope.maxMarks = r.data[0].marks__name;
          $scope.time = r.data[0].duration__name;
          console.log($scope.time);
          $scope.hours = Math.floor($scope.time / 60);
          $scope.min = $scope.time % 60;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getSubject = (subject) => {
      $scope.selectedSub = subject;
    };

    $scope.startExam = () => {
      httpService
        .get("eduexam/get_question_paper/", { id: $scope.selectedSub })
        .then((r) => {
          console.log(r.data);
          qPaper = r.data[0].questions;

          if (qPaper) {
            $scope.qPaper = qPaper;
          }

          console.log($scope.qPaper);
        })
        .catch((e) => {
          console.log(e.data);
        });
      goFullScreen(modal);
      disableKey();
    };

    $scope.submitExam = () => {
      console.log("AS");
      hideModal("examModal");
    };
  },
]);
