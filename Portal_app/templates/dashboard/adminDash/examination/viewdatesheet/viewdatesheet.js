myApp.controller("viewdatesheetContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.choose = []

    mapping = () => {
      httpService
        .get("eduexam/get_exam_mapping/")
        .then((r) => {
          console.log(r);
          get_exam_mapping = r.data;
          if (get_exam_mapping) {
            $scope.get_exam_mapping = get_exam_mapping;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    mapping();
    $scope.Dept = (choice) => {
      arr=$scope.choose;
      function removeDuplicates(arr) { 
        return [...new Set(arr)]; 
    } 
      
    console.log(removeDuplicates(arr));
      console.log(choice)
      $scope.choice = choice
      arr.push({
        choice: $scope.choice,
      });
      console.log($scope.choice);
    }
  },
]);