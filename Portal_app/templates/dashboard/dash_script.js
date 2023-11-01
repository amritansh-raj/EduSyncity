myApp.controller("dbController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    httpService
      .get("educore/loggedin/")
      .then((r) => {
        $scope.user_name = r.data.first_name;
        $scope.lastname= r.data.last_name;
        $scope.letter = $scope.user_name.charAt(0).toUpperCase();
      })
      .catch((e) => {
        console.log(e);
        if ((e.status = 401)) {
          $state.go("login");
        }
      });

    $scope.disChart = (stateName) => {
      showLoader();
      $state.go(stateName);

      httpService
        .get("eduadmin/personal_info/")
        .then((r) => {
          courses = r.data.course_name;
          deptCount = r.data.department_count;

          const data = [];

          for (i = 0; i < courses.length; i++) {
            data.push({ course: courses[i], department: deptCount[i] });
          }

          new Chart(document.getElementById("chart_div"), {
            type: "bar",
            data: {
              labels: data.map((row) => row.course),
              datasets: [
                {
                  label: "Number of departments",
                  data: data.map((row) => row.department),
                  backgroundColor: "#22d3ee",
                },
              ],
            },
          });
        })
        .catch((e) => {
          console.log(e.data);
        });
    };

    $scope.disChart();

    display = () => {
      showLoader();
      httpService
        .get("educore/sidebar/")
        .then((r) => {
          panelData = r.data;
          if (panelData) {
            $scope.panelData = panelData;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    display();

    $scope.stateChange = function (stateName) {
      $state.go(stateName);
    };

    $scope.logout = function () {
      showLoader();
      httpService
        .get("eduadmin/logout/")
        .then((r) => {
          $state.go("login");
          alertify.success("logged out succesfully!!");
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
