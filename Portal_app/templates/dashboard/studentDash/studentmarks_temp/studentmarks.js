myApp.controller("studentmarksController", [
  "$scope",
  "$http",
  "httpService",
  function ($scope, $http, httpService) {
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
