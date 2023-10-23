myApp.controller("teacherregisterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    $scope.years = [];

    display = () => {
      showLoader();
      httpService
        .get("educore/title")
        .then((r) => {
          titles = r.data;

          if (titles) {
            $scope.titles = titles;
          }

          console.log(titles);
        })
        .catch((e) => {
          console.log(e);
        });

      httpService
        .get("educore/gender")
        .then((r) => {
          genders = r.data;

          if (genders) {
            $scope.genders = genders;
          }

          console.log(genders);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    display();

    $scope.register = function () {
      showLoader();

      var sendData = {
        firstname: $scope.Firstname,
        lastname: $scope.lastname,
        username: $scope.username,
        email: $scope.email,
        age: $scope.age,
        address: $scope.address,
        contact: $scope.phone,
        qualification: $scope.qualification,
        title: $scope.selectedTitle,
        gender: $scope.selectedGender,
      };

      if (!sendData.firstname) {
        alertify.error("Enter Firstname");
        hideLoader();
        return;
      } else if (!sendData.lastname) {
        alertify.error("Enter lastname");
        hideLoader();
        return;
      } else if (!sendData.username) {
        alertify.error("Enter username");
        hideLoader();
        return;
      } else if (!sendData.address) {
        alertify.error("Enter address");
        hideLoader();
        return;
      } else if (!sendData.qualification) {
        alertify.error("Enter qualification");
        hideLoader();
        return;
      } else if (!sendData.title) {
        alertify.error("Enter title");
        hideLoader();
        return;
      } else if (!sendData.gender) {
        alertify.error("Enter gender");
        hideLoader();
        return;
      }

      httpService
        .post("eduadmin/register_faculty/", sendData)
        .then((r) => {
          console.log(r.data);
          alertify.set("notifier", "position", "top-right");
          alertify.success(r.data.message);
        })
        .catch((e) => {
          alertify.set("notifier", "position", "bottom-right");
          alertify.error(e.data.message);
          console.log(e.data);
        });
    };
  },
]);
