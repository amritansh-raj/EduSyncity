myApp.controller("loginController", [
  "$scope",
  "$http",
  "$state",
  "httpService",
  function ($scope, $http, $state, httpService) {
    $scope.login = function () {

      var emptyFields = [];
      email = $scope.email;
      pass = $scope.password;
      console.log(email);
      console.log(pass);

      if (!email) emptyFields.push("Email");
      if (!pass) emptyFields.push("Password");

      if (emptyFields.length > 0) {
        var message =
          "Please fill out the following fields: " + emptyFields.join(", ");
        alertify.error(message)
        hideLoader();
        return;
      }

      if(!validateEmail(email)){

        hideLoader();
      }

      if(!validatePass(pass)){
        
        hideLoader();
      }

      postData = {
        email: email,
        password: pass,
      };

      httpService
        .post("/endpoint", postData)
        .then(function (response) {
          console.log(response);
          alertify.success('Ok');
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          hideLoader();
        });
    };
  },
]);
