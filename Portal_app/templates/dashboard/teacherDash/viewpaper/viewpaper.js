myApp.controller("viewPaperController", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    httpService
      .get("eduexam/view_paper/")
      .then((r) => {
        qPaper = r.data;

        if (qPaper) {
          $scope.qPaper = qPaper;
        }

        console.log($scope.qPaper);
      })
      .catch((e) => {
        console.log(e.data);
      });
  },
]);
