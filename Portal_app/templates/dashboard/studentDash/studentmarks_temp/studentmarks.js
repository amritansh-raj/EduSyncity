myApp.controller("studentmarksController", [
    "$scope",
    "$http",
    "httpService",
    function ($scope, $http, httpService) {
        httpService
            .get("eduexam/exam_type_for_marks/")
            .then((r) => {
                console.log(r);
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
            console.log($scope.examId)
            httpService
              .get("eduexam/student_marks/", { exam_id:$scope.examId})
              .then((r) => {
                console.log(r.data);
                marks = r.data;
                if (marks) {
                    $scope.marks = marks;
                }
              })
              .catch((e) => {
                console.log(e);
              });
          };

    },

]);
