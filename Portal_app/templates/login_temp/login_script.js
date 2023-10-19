myApp.controller("loginController", [
  "$scope",
  "$state",
  "httpService",
  function ($scope, $state, httpService) {
    $scope.login = function () {
      showLoader();
      username = $scope.username;
      pass = $scope.password;

      var postData = {
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
          .then((r) => {
            console.log(r);
            $state.go("dashBoard");
            alertify.set("notifier", "position", "top-right");
            alertify.success("logged in succesfully!!");
          })
          .catch((e) => {
            console.e(e);
          });
      }
    };

    $scope.showForm = () => {
      $scope.show = $scope.show ? false : true;
    };

    $scope.changePassword = function () {
      var data = {
        username: $scope.fusername,
        old_password: $scope.oldPassword,
        new_password: $scope.newPassword,
      };

      console.log(data);

      httpService
        .post("eduadmin/forgot_password/", data)
        .then((r) => {
          console.log(r);
          $scope.showForm();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.e(e.data.message);
        });
    };
  },
]);
