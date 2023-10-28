myApp.controller("studentmarksController", [
    "$scope",
    "$http",
    "$state",
    "httpService",
    function ($scope, $http,httpService) {
        httpService
        .get("eduexam/examtype/")
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
        
        $scope.Exam = (selectedExam) => {
            $scope.examId = selectedExam;
            httpService
              .get("eduexam/examinfo/", { id: selectedExam })
              .then((r) => {
                console.log(r.data);
              })
              .catch((e) => {
                console.log(e);
              });
          };
    },
]);