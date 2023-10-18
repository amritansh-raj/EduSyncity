myApp.controller("masterController", [
  "$scope",
  "httpService",
  "$state",
  function ($scope, httpService, $state) {
    display = () => {
      showLoader();

      httpService
        .get("educore/parents/")
        .then((r) => {
          options = r.data;

          if (options) {
            $scope.options = options;
          }

          console.log($scope.options);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getChild = (id) => {
      showLoader();
      httpService
        .get("educore/childs/", { parent_id: id })
        .then((r) => {
          childs = r.data;

          if (childs) {
            $scope.childs = childs;
          }

          console.log($scope.childs);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    display();

    $scope.showInput = () => {
      $scope.adding = true;
    };

    $scope.addChild = () => {
      var child = document.querySelector("input[name=child]").value;
      console.log(child);

      $scope.adding = false;
    };

    $scope.openModal = (child) => {
      $scope.selectedChild = child;
    };

    $scope.edit = () => {
      $scope.editing = true;
      document.getElementById("editInputField").removeAttribute("disabled");
    };

    $scope.notEditing = () => {
      $scope.editing = false;
      document.getElementById("editInputField").setAttribute("disabled", "");
    };

    $scope.save = (selectedChild) => {
      showLoader();

      childData = {
        id: selectedChild.id,
        new_name: $scope.childName,
      };

      httpService
        .put("eduadmin/dropdown/", childData)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.delete = (selectedChild, modalId) => {
      showLoader();

      httpService
        .delete("eduadmin/dropdown/", { id: selectedChild.id })
        .then((r) => {
          console.log(r);
          hideModal(String(modalId));
        })
        .catch((e) => {
          console.log(e);
        });
    };
  },
]);
