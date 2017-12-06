angular.module("exampleApp", ["increment"])
.constant("baseUrl", "http://localhost:3000/api/user/")
.controller("defaultCtrl", function ($scope, $http, baseUrl) {

    $scope.displayMode = "list";
    $scope.currentProduct = null;

    $scope.listProducts = function () {
        $http.get(baseUrl).success(function (data) {
            $scope.products = data;
        });
    }

    $scope.deleteProduct = function (product) {
        $http({
            method: "delete",
            url: baseUrl + product._id
        }).success(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    $scope.createProduct = function (product) {     
		$http.post(baseUrl, product).success(function(newProduct){
			$scope.products.push(newProduct);
			$scope.displayMode = "list";
		});       
    }

    $scope.updateProduct = function (product) {
        $http({
            url: baseUrl +  product._id,
            method: "PUT",
            data: product
        }).success(function (modifiedProduct) {
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.products[i]._id == modifiedProduct._id) {
                    $scope.products[i] = modifiedProduct;
                    break;
                }
            }
            $scope.displayMode = "list";
        });
    }

    $scope.editOrCreateProduct = function (product) {
        $scope.currentProduct =
            product ? angular.copy(product) : {};
        $scope.displayMode = "edit";
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product._id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
    }

    $scope.cancelEdit = function () {
        $scope.currentProduct = {};
        $scope.displayMode = "list";
    }

    $scope.listProducts();
});
