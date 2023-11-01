myApp.controller("qPaperController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.questions = [];
    $scope.choices = [];
    $scope.exam = {};

    httpService
      .get("eduexam/department_course/")
      .then((r) => {
        courses = r.data;

        if (courses) {
          $scope.courses = courses;
        }
      })
      .catch((e) => {
        console.log(e);
      });

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
      .get("educore/Set")
      .then((r) => {
        sets = r.data;
        if (sets) {
          $scope.sets = sets;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.getSubject = (course) => {
      httpService
        .get("eduexam/subject_year/", { dept_id: course })
        .then((r) => {
          subjects = r.data.flat();
          console.log(subjects);

          if (subjects) {
            $scope.subjects = subjects;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.selectedSub = (subject) => {
      $scope.selectedSubject = subject;
    };

    $scope.getSet = (selectedSet) => {
      $scope.selectedSet = selectedSet;
    };

    $scope.getExam = (selectedExam) => {
      $scope.selectedExam = selectedExam;
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

    $scope.toggleSubDisplay = () => {
      $scope.subDisplay = !$scope.subDisplay;
      $scope.question = "";
      $scope.marks = "";
    };

    $scope.toggleMcqDisplay = () => {
      $scope.mcqDisplay = !$scope.mcqDisplay;
      $scope.question = "";
      $scope.marks = "";
      $scope.choices = [];
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
      if ($scope.choice) {
        $scope.choices.push({
          choice: $scope.choice,
          choosen: false,
        });
      }
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

    $scope.delQ = (index) => {
      $scope.questions.splice(index, 1);
    };

    $scope.openModal = (option, index) => {
      console.log(option, index);
      $scope.selectedOption = option;
      $scope.selectedQ = $scope.selectedOption.question;
      $scope.selectedM = $scope.selectedOption.marks;
      if (option.type === "multChoice") {
        if ($scope.selectedOption.choices.length) {
          $scope.selectedChoices = $scope.selectedOption.choices;
        }
      }
      $scope.index = index;
    };

    $scope.editQ = () => {
      $scope.questions[$scope.index].question = $scope.selectedQ;
      $scope.questions[$scope.index].marks = $scope.selectedM;
    };

    $scope.delChoice = (index) => {
      if ($scope.selectedChoices.length > 2) {
        $scope.selectedChoices.splice(index, 1);
      } else {
        alertify.error("Choices cannot be less than two");
      }
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
      } else {
        $scope.exam.questions = $scope.questions;
        $scope.exam.department = $scope.selectedCourse;
        $scope.exam.subject = $scope.selectedSubject;
        $scope.exam.exam_type = $scope.selectedExam;
        $scope.exam.set = $scope.selectedSet;
        console.log($scope.exam);
        httpService
          .post("eduexam/question_paper/", $scope.exam)
          .then((r) => {
            alertify.success(r.data.message);
            $scope.questions = [];
            $scope.choices = [];
            $scope.exam = {};
            $scope.selectedCourse = "";
            $scope.subject = "";
            $scope.selectedSet = "";
            $scope.selectedExam = "";
            $scope.hours = "";
            $scope.min = "";
            console.log(r);
          })
          .catch((e) => {
            console.log(e);
            $scope.questions = [];
            $scope.choices = [];
            $scope.exam = {};
            $scope.selectedCourse = "";
            $scope.subject = "";
            $scope.selectedSet = "";
            $scope.selectedExam = "";
            $scope.hours = "";
            $scope.min = "";
            alertify.error(e.data.message);
          });
      }
    };
  },
]);
