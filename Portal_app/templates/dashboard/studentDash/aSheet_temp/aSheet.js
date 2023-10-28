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

    $scope.getExam = (selectedExam) => {
      $scope.examId = selectedExam;
    };

    $scope.getSubject = (subject) => {
      $scope.selectedSub = subject;

      httpService
        .get("eduexam/select_paper_set/", {
          sub_id: $scope.selectedSub,
          exam_id: $scope.examId,
        })
        .then((r) => {
          sets = r.data;

          if (sets) {
            $scope.sets = sets;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getSet = (selectedSet) => {
      $scope.selectedSet = selectedSet;
      httpService
        .get("eduexam/get_question_paper/", { paper_id: selectedSet })
        .then((r) => {
          console.log(r.data);

          qPaper = r.data[0].questions;
          $scope.qPaperId = r.data[0].pk;

          if (qPaper) {
            $scope.qPaper = qPaper;
          }

          $scope.time = r.data[0].exam_type__duration__name;
          $scope.hours = Math.floor($scope.time / 60);
          $scope.min = $scope.time % 60;
          $scope.seconds = ($scope.hours * 3600 + $scope.min * 60) * 100;
        })
        .catch((e) => {
          console.log(e.data);
          alertify.error(e.data.message);
        });
    };

    let count = 0;

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

          count++;
          if (count === 3) {
            submitForm();
            hideModal("examModal");
            exitFullScreen();
          }
          return false;
        }
      });
    };

    $scope.startExam = () => {
      $scope.examState(modal);
      startCountdown($scope.hours, $scope.min, 0);
    };

    function startCountdown(hours, minutes, seconds) {
      let totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;

      let countdownInterval = setInterval(() => {
        if (totalMilliseconds <= 0) {
          clearInterval(countdownInterval);
          submitForm();
        } else {
          $scope.$apply(() => {
            totalMilliseconds -= 1000;
            $scope.remainingHours = Math.floor(totalMilliseconds / 3600000);
            $scope.remainingMin = Math.floor(
              (totalMilliseconds % 3600000) / 60000
            );
            $scope.remainingSec = Math.floor(
              (totalMilliseconds % 60000) / 1000
            );
          });
        }
      }, 1000);
    }

    submitForm = () => {
      httpService
        .post("eduexam/paper_response/", $scope.examAnswers)
        .then((r) => {
          console.log(r);
          hideModal("examModal");
          exitFullScreen();
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.updateAnswers = () => {
      $scope.examAnswers = { questions: [] };

      for (var i = 0; i < $scope.qPaper.length; i++) {
        var question = $scope.qPaper[i];
        var answerObj = {};

        answerObj.question = question.question;
        answerObj.marks = question.marks;
        answerObj.type = question.type;
        if (question.type === "subjective") {
          answerObj.answer = question.answer;
        } else if (question.type === "multChoice") {
          answerObj.choices = question.choices.map(function (choice) {
            return {
              choice: choice.choice,
              isCorrect: choice.isSelected,
            };
          });
        }
        $scope.examAnswers.questions.push(answerObj);
      }

      $scope.examAnswers.paper_id = $scope.qPaperId;
    };

    $scope.submitExam = () => {
      submitForm();
    };
  },
]);
