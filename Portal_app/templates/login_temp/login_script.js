myApp.controller("loginController", [
  "$scope",
  "$state",
  "httpService",
  function ($scope, $state, httpService) {
    $scope.inputType = "password";

    $scope.login = function () {
      showLoader();
      username = $scope.username;
      pass = $scope.password;

      var postData = {
        username: username,
        password: pass,
      };

      if (!username) {
        alertify.error("Enter username or email");
        hideLoader();
        return;
      }

      // if (pass === "Kiet@123") {
      //   alertify.error("Kindly click on forgot password to reset password");
      //   hideLoader();
      //   return;
      // }

      httpService
        .post("eduadmin/login/", postData)
        .then((r) => {
          $state.go("dashBoard");
          alertify.set("notifier", "position", "top-right");
          alertify.success("logged in succesfully!!");
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.hideShowPassword = () => {
      if ($scope.inputType == "password") {
        $scope.inputType = "text";
      } else {
        $scope.inputType = "password";
      }
    };

    $scope.showForm = () => {
      $scope.show = !$scope.show;
    };

    $scope.changePassword = function () {
      var data = {
        username: $scope.fusername,
        old_password: $scope.oldPassword,
        new_password: $scope.newPassword,
      };

      if (!data.username) {
        alertify.error("Enter username");
        return;
      }

      if (!data.old_password) {
        alertify.error("Enter old password");
        return;
      }

      if (!data.new_password) {
        alertify.error("Enter new password");
        return;
      }

      if (data.new_password != $scope.confirmNewPassword) {
        alertify.error("New password and confirm password does not match");
        return;
      }

      httpService
        .post("eduadmin/change_password/", data)
        .then((r) => {
          $scope.fusername = "";
          $scope.oldPassword = "";
          $scope.newPassword = "";
          $scope.confirmNewPassword = "";
          $scope.showForm();
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };
  },
]);
