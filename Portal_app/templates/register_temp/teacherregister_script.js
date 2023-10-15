myApp.controller("loginController", [
    "$scope",
    "$http",
    "$state",
    "httpService",
    function ($scope, $http, $state, httpService) {
      $scope.register = function () {
        showLoader();
        
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
            firstname : $scope.Firstname,
            lastname : $scope.lastname,
            username :$scope.username,
            email :$scope.email,
           age: $scope.age,
           address: $scope.address,
           phone: $scope.phone,
          qualification:$scope.department,
            pass : pass,
            confirmpass:$scope.cfpassword,
        };
  
        httpService
          .post("registerteacher/", postData)
          .then(function (response) {
            console.log(response);
            role = response.data[0].role;
            console.log(role);
            if(role === 1){
              $state.go("login");
            }
            alertify.success("Ok");
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
  