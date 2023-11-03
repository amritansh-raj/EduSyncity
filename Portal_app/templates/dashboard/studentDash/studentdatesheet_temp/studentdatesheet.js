myApp.controller("studentdatesheetController", [
    "$scope",
    "$state",
    "httpService",
    function ($scope, $state, httpService) {
        httpService
        .get("eduexam/show_examtype_to_student/")
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
          .get("eduexam/show_datesheet/", { id: examtype })
          .then((r) => {
            datesheet = r.data;
            $scope.datesheet= datesheet;
            console.log($scope.datesheet);
          })
          .catch((e) => {
            console.log(e);
          });
      };

    }])