myApp.controller("evalController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
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

    $scope.getCourse = (selectedCourse) => {
      $scope.selectedCourse = selectedCourse;

      httpService
        .get("eduexam/subject_year/", { dept_id: selectedCourse })
        .then((r) => {
          subjects = r.data;

          if (subjects) {
            $scope.subjects = subjects;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getExam = (selectedExam) => {
      $scope.selectedExam = selectedExam;
    };

    $scope.getSubject = (selectedSubject) => {
      $scope.selectedSubject = selectedSubject;
    };

    $scope.holahola = () => {
      if (
        $scope.selectedSubject &&
        $scope.selectedExam &&
        $scope.selectedCourse
      ) {
        httpService
          .get("eduexam/paper_set/", {
            dept_id: $scope.selectedCourse,
            sub_id: $scope.selectedSubject,
            exam_id: $scope.selectedExam,
          })
          .then((r) => {
            sets = r.data;
            if (sets) {
              $scope.sets = sets;
            }
          })
          .catch((e) => {
            console.log(e.data);
          });
      }
    };

    $scope.getSet = (selectedSet) => {
      $scope.selectedSet = selectedSet;
      httpService
        .get("eduexam/get_students_answer/", { paper_id: selectedSet })
        .then((r) => {
          students = r.data;
          if (students) {
            $scope.students = students;
          }
        })
        .catch((e) => {
          console.log(e.data);
        });
    };

    $scope.getAsheet = (ansSheet, modal) => {
      $scope.selectedAnsSheet = ansSheet;
      showModal(String(modal));
      httpService
        .get("eduexam/get_question_answer/", {
          student_id: ansSheet.added_by,
          subject_id: $scope.selectedSubject,
        })
        .then((r) => {
          data = r.data[0].answer;
          if (data) {
            $scope.data = data;
          }
        })
        .catch((e) => {
          console.log(e.data);
        });
    };

    $scope.evalExam = (modal) => {
      $scope.eval = [];
      for (var i = 0; i < $scope.data.length; i++) {
        var question = $scope.data[i];

        if ("marksObtained" in question) {
          question.marksObtained = parseInt(question.marksObtained);
        }
        $scope.eval.push(question);
      }

      totalMarks = 0;

      $scope.eval.forEach((element) => {
        if (element.marksObtainedSubjective) {
          totalMarks += element.marksObtainedSubjective;
        } else if (element.marksObtainedMultChoice) {
          totalMarks += element.marksObtainedMultChoice;
        }
      });

      var evaluation = {};
      Object.assign(evaluation, { evaluation: $scope.eval });
      Object.assign(evaluation, { marks_obtained: totalMarks });
      Object.assign(evaluation, {
        student_id: $scope.selectedAnsSheet.added_by,
      });

      console.log(evaluation);

      httpService
        .post("eduexam/paper_evaluation/", evaluation)
        .then((r) => {
          alertify.success(r.data.message);
          if ((r.status = 204)) {
            hideModal(String(modal));
          }
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
