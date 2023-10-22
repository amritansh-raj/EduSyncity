myApp.controller("qPaperController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.todaysDate = formattedDate;

    $scope.questions = [];
    $scope.choices = [];
    $scope.exam = {};

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

    $scope.getExam = (selectedExam) => {
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

    $scope.toggleSubDisplay = () => {
      $scope.subDisplay = !$scope.subDisplay;
    };

    $scope.toggleMcqDisplay = () => {
      $scope.mcqDisplay = !$scope.mcqDisplay;
    };

    $scope.toggleDateDisplay = () => {
      $scope.dateDisplay = !$scope.dateDisplay;
    };

    $scope.addSubQ = () => {
      $scope.questions.push({
        question: $scope.question,
        marks: $scope.marks,
        type: "subjective",
      });
      $scope.question = "";
      $scope.marks = "";
      $scope.toggleSubDisplay();
    };

    $scope.addChoice = () => {
      $scope.choices.push({
        choice: $scope.choice,
      });
      console.log($scope.choices);
      $scope.choice = "";
    };

    $scope.addMcqQ = () => {
      if ($scope.choices.length === 0) {
        alertify.error("Add choices");
      } else {
        $scope.questions.push({
          question: $scope.question,
          marks: $scope.marks,
          type: "multChoice",
          choices: $scope.choices,
        });
        $scope.question = "";
        $scope.marks = "";
        $scope.choices = [];
        $scope.toggleMcqDisplay();
      }
    };

    $scope.addDateTime = () => {
      paperDate = `${$scope.date.getFullYear()}-${
        $scope.date.getMonth() + 1
      }-${$scope.date.getDate()}`;
      const time = document.getElementById("time");
      paperTime = time.value;
      $scope.exam.examDate = paperDate;
      $scope.exam.examTime = paperTime;
      $scope.toggleDateDisplay();
    };

    $scope.delQ = (index) => {
      $scope.questions.splice(index, 1);
    };

    $scope.openModal = (option, index) => {
      $scope.selectedOption = option;
      $scope.selectedQ = $scope.selectedOption.question;
      $scope.selectedM = $scope.selectedOption.marks;
      if ($scope.selectedOption.choices) {
        $scope.selectedChoices = $scope.selectedOption.choices;
      }
      console.log($scope.selectedChoices);
      $scope.index = index;
    };

    $scope.editQ = () => {
      $scope.questions[$scope.index].question = $scope.selectedQ;
      $scope.questions[$scope.index].marks = $scope.selectedM;
      console.log($scope.questions);
    };

    $scope.delChoice = (index) => {
      $scope.selectedChoices.splice(index, 1);
    };

    $scope.createExam = () => {
      sum = 0;
      $scope.questions.forEach((element) => {
        sum += element.marks;
      });

      if ($scope.maxMarks != sum) {
        alertify.error(
          "Sum of all the questions provided is not equal to max marks of the paper"
        );
      } else if (!("examDate" && "examTime" in $scope.exam)) {
        alertify.error("Please add date and time in order to submit the paper");
      } else {
        $scope.exam.questions = $scope.questions;
        console.log($scope.exam);
        // httpService
        //   .post("eduexam/paper_details/", samplejson)
        //   .then((r) => {
          // alertify.success(r.data.message);

        //     console.log(r);
        //   })
        //   .catch((e) => {
        //     console.log(e);
        // alertify.error(e.data.message);

        //   });
      }
    };
  },
]);
