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
        })
        .catch((e) => {
          console.log(e);
        });
    };

    $scope.getChild = (id) => {
      $scope.parentId = id;
      console.log($scope.parentId);
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
      var childName = document.querySelector("input[name=child]").value;
      httpService
        .post("eduadmin/dropdown/", { id: $scope.parentId, name: childName })
        .then((r) => {
          $scope.getChild($scope.parentId);
          $scope.adding = false;
          console.log(r);
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.openModal = (child) => {
      console.log(child);
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
          $scope.getChild($scope.parentId);
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };

    $scope.delete = (selectedChild, modalId) => {
      showLoader();

      httpService
        .delete("eduadmin/dropdown/", { id: selectedChild.id })
        .then((r) => {
          console.log(r);
          $scope.getChild($scope.parentId);
          hideModal(String(modalId));
          alertify.success(r.data.message);
        })
        .catch((e) => {
          console.log(e);
          alertify.error(e.data.message);
        });
    };
  },
]);
