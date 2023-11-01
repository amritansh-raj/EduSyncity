myApp.controller("studentmarksController", [
  "$scope",
  "$http",
  "httpService",
  function ($scope, $http, httpService) {
    httpService
      .get("educore/loggedin/")
      .then((r) => {
        $scope.user_name = r.data.username;
        $scope.letter = $scope.user_name.charAt(0).toUpperCase();
      })
      .catch((e) => {
        console.log(e);
        if ((e.status = 401)) {
          $state.go("login");
        }
      });

    httpService
      .get("eduexam/exam_type_for_marks/")
      .then((r) => {
        exam = r.data;
        if (exam) {
          $scope.exam = exam;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.Exam = (examtype) => {
      $scope.examId = examtype;
      httpService
        .get("eduexam/student_marks/", { exam_id: examtype })
        .then((r) => {
          marks = r.data[0];
          $scope.marks = marks;
          console.log($scope.marks);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
