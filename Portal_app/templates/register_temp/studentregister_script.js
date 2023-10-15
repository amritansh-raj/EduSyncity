myApp.controller("studentregisterController", function ($scope, $http, $state, $location) {

    $scope.register = function () {

      showLoader();
      pass = $scope.password;
      console.log(pass);

      if (!validatePass(pass)) {
        $scope.registerForm.password.$setValidity("password", false);
        hideLoader();
      } else {
        $scope.registerForm.password.$setValidity("password", true);
        hideLoader();
      }

      var userData = {
        firstname : $scope.Firstname,
        lastname : $scope.lastname,
        username :$scope.username,
        email :$scope.email,
       age: $scope.age,
       address: $scope.address,
       phone: $scope.phone,
       fathername: $scope.fathername,
       mothername: $scope.mothername,
        pass : pass,
        id: $scope.selectedDepartment,
        
      };
  
      var sendData = JSON.stringify(userData);
      console.log(sendData);
  
  
  
      $http
        .post("https://10.21.81.251:8000/a", sendData, {
          headers: { 'Content-Type': undefined },
          withCredentials: true
        })
  
        .then(function (sendData) {
          var register = sendData.data;
          console.log(register);
        });
      $state.go('login');
    };
  
    $scope.coursess = [];
    $scope.departments = [];
    $scope.selectedcourses = null;
  
  
    $scope.loadDoctors = function () {
      if ($scope.selectedcourses) {
        $http.get('https://10.21.81.251:8000/c', {
          params: { coursesid: $scope.selectedcourses },
  
          headers: { 'Content-Type': undefined },
          withCredentials: true
        })
          .then(function (response) {
            console.log(response);
            $scope.departments = response.data;
  
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
  
        $scope.departments = [];
      }
    };
  
  
    $http.get('https://10.21.81.251:8000/a', {
      headers: { 'Content-Type': undefined },
      withCredentials: true
    })
  
      .then(function (response) {
        console.log(response);
        $scope.coursess = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  
  
  
  });