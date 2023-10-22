myApp.controller("dbController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    // const ctx = document.getElementById("myChart");
    // console.log(ctx);

    // new Chart(ctx, {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });

    // const data = [
    //   { year: 2010, count: 10 },
    //   { year: 2011, count: 20 },
    //   { year: 2012, count: 15 },
    //   { year: 2013, count: 25 },
    //   { year: 2014, count: 22 },
    //   { year: 2015, count: 30 },
    //   { year: 2016, count: 28 },
    // ];

    // new Chart(ctx, {
    //   type: "bar",
    //   data: {
    //     labels: data.map((row) => row.year),
    //     datasets: [
    //       {
    //         label: "Acquisitions by year",
    //         data: data.map((row) => row.count),
    //       },
    //     ],
    //   },
    // });

    httpService
      .get("educore/loggedin/")
      .then((r) => {
        $scope.user_name = r.data.username;
        $scope.letter = $scope.user_name.charAt(0).toUpperCase();
      })
      .catch((e) => {
        console.log(e);
        if ((e.status = 401)) {
          $state.go("login");
        }
      });

    display = () => {
      showLoader();
      httpService
        .get("educore/sidebar/")
        .then((r) => {
          panelData = r.data;

          if (panelData) {
            $scope.panelData = panelData;
          }

          console.log($scope.panelData);
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
          console.log(r);
          alertify.success("logged out succesfully!!");
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
