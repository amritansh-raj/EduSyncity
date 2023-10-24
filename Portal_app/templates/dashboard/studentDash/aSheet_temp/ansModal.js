myApp.controller("ansModalContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.submitExam = () => {
      subAns = $scope.answer;
      multAns = $scope.chooosen;
      console.log($scope.chooosen, $scope.answer);
      exitFullScreen(modal);
      hideModal("examModal");
    };

    $scope.getAns = (ans) => {
      console.log(ans);
    };

    $scope.getMult = (answ) => {
      console.log(answ);
    };
  },
]);
