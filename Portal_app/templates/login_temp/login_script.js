myApp.controller("loginController", [
  "$scope",
  "$state",
  "httpService",
  function ($scope, $state, httpService) {
    $scope.login = function () {
      showLoader();
      username = $scope.username;
      pass = $scope.password;
      console.log(username);
      console.log(pass);

      postData = {
        username: username,
        password: pass,
      };

      if (!validatePass(pass)) {
        $scope.loginForm.password.$setValidity("password", false);
        hideLoader();
      } else {
        $scope.loginForm.password.$setValidity("password", true);
        httpService
          .post("eduadmin/login/", postData)
          .then((response) => {
            console.log(response);
            role = response.data[0].role;
            console.log(role);
            if (role === 1) {
              $state.go("dashBoard");
            }
            alertify.set("notifier", "position", "top-right");
            alertify.success("logged in succesfully!!");
          })
          .catch((error) => {
            console.error(error);
          });
      }

      $scope.showForgotPasswordForm = () => {
        
      }
    };
  },
]);
