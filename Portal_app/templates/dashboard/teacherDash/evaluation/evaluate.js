myApp.controller("evalController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
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
      httpService
        .post("")
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
