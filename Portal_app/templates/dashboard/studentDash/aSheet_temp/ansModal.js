myApp.controller("ansModalContoller", [
  "$scope",
  "httpService",
  function ($scope, httpService) {
    $scope.submitExam = () => {
      var examAnswers = { questions: [] };

      for (var i = 0; i < $scope.qPaper.length; i++) {
        var question = $scope.qPaper[i];
        var answerObj = {};

        answerObj.question = question.question;
        answerObj.marks = question.marks;
        answerObj.type = question.type;
        if (question.type === "subjective") {
          answerObj.answer = question.answer;
        } else if (question.type === "multChoice") {
          // answerObj.selectedChoices = question.selectedChoices;
          answerObj.choices = question.choices.map(function (choice) {
            return {
              choice: choice.choice,
              isCorrect: choice.isCorrect,
              // isSelected: question.selectedChoices.includes(choice.choice),
            };
          });
        }

        examAnswers.questions.push(answerObj);
      }

      console.log(JSON.stringify(examAnswers));
    };
  },
]);
