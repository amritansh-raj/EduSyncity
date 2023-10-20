myApp.controller("qPaperController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    httpService
      .get("")
      .then((r) => {
        console.log(r);
        exams = r.data;
        if (exams) {
          $scope.exams = exams;
        }
        console.log($scope.exams);
      })
      .catch((e) => {
        console.log(e);
      });

    $scope.toggleSubDisplay = () => {
      $scope.subDisplay = !$scope.subDisplay;
    };

    $scope.toggleMcqDisplay = () => {
      $scope.mcqDisplay = !$scope.mcqDisplay;
    };

    $scope.questions = [];
    $scope.choices = [];

    $scope.addSubQ = () => {
      $scope.questions.push({
        question: $scope.question,
        marks: $scope.marks,
        type: "subjective",
      });
      $scope.question = "";
      $scope.marks = "";
      console.log($scope.questions);
      $scope.toggleSubDisplay();
    };

    $scope.addChoice = () => {
      $scope.choices.push({
        choice: $scope.choice,
      });
      $scope.choice = "";
      console.log($scope.choices);
    };

    $scope.addMcqQ = () => {
      $scope.questions.push({
        question: $scope.question,
        marks: $scope.marks,
        type: "multChoice",
        choices: $scope.choices,
      });
      $scope.question = "";
      $scope.marks = "";
      $scope.choices = [];
      console.log($scope.questions);
      $scope.toggleMcqDisplay();
    };
  },
]);
