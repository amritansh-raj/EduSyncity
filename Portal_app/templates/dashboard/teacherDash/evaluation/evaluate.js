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
      .get("eduexam/get_students_answer/")
      .then((r) => {
        console.log(r.data);
        students = r.data;

        if (students) {
          $scope.students = students;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.getCourse = (selectedCourse) => {
      $scope.selectedCourse = selectedCourse;

      httpService
        .get("", { course_id: selectedCourse })
        .then((r) => {
          exams = r.data;

          if (exams) {
            $scope.exams = exams;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    var eval = [];

    httpService
      .get("eduexam/get_student_response/")
      .then((r) => {
        students = r.data;

        if (students) {
          $scope.students = students;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.getStudent = (student) => {
      httpService
        .get("eduexam/get_question_answer/", { student_id: student })
        .then((r) => {
          console.log(r.data);
          data = r.data[0].answer;

          if (data) {
            $scope.data = data;
          }
          console.log($scope.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.evalExam = () => {
      for (var i = 0; i < $scope.data.length; i++) {
        var question = $scope.data[i];

        if ("marksObtained" in question) {
          question.marksObtained = parseInt(question.marksObtained);
        }
        eval.push(question);
      }

      totalMarks = 0;
      $scope.eval.forEach((element) => {
        totalMarks += element.marksObtainedSubjective;
      });

      console.log(eval);
      console.log(totalMarks);

      //   httpService
      //     .post("")
      //     .then((r) => {
      //       console.log(r);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    };
  },
]);
