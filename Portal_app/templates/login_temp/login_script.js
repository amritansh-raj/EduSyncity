myApp.controller("loginController", [
  "$scope",
  "$http",
  "$state",
  "httpService",
  function ($scope, $http, $state, httpService) {
    $scope.login = function () {
      showLoader();
      username = $scope.username;
      pass = $scope.password;
      console.log(username);
      console.log(pass);

      if (!validatePass(pass)) {
        $scope.loginForm.password.$setValidity("password", false);
        hideLoader();
      } else {
        $scope.loginForm.password.$setValidity("password", true);
        hideLoader();
      }

      postData = {
        username: username,
        password: pass,
      };

      httpService
        .post("login_user/", postData)
        .then(function (response) {
          console.log(response);
          role = response.data[0].role;
          console.log(role);
          if(role === 1){
            $state.go("dashBoard");
          }
          alertify.success("Ok");
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          hideLoader();
        });

      // $http({
      //   method : "POST",
      //   url : "https://10.21.85.67:8000/demoadmin/login_user/",
      //   data : postData,
      //   withCredentials : true
      // })
      //   .then(function(response){
      //     console.log(response)
      //   })
      //   .catch(function(error){
      //     console.log(error)
      //   })
    };
  },
]);
