angular.module("exampleApp", ["increment", "ngResource"])
.constant("baseUrl", "http://localhost:3000/api/user/")
.controller("defaultCtrl", function ($scope, $http, $resource, baseUrl) {

    $scope.displayMode = "list";
    $scope.currentProduct = null;
	 
	// isArry: true to specifies that the response will be json (from mongodb)
    $scope.productsResource = $resource(baseUrl + ":id", { id: "@id" },
            { create: { method: "POST"}, save: { method: "PUT"}});

    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

    $scope.deleteProduct = function (product) {
	// it is important to pass in product._id
        product.$delete({id: product._id}).then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
        $scope.displayMode = "list";
    }

    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$create().then(function (newProduct) {
            $scope.products.push(newProduct);
            $scope.displayMode = "list";
        });
    }

    $scope.updateProduct = function (product) {
        product.$save({id: product._id});
        $scope.displayMode = "list";
    }

    $scope.editOrCreateProduct = function (product) {
        $scope.currentProduct = product ? product : {};
        $scope.displayMode = "edit";
    }

	// project is an object containg methods.
    $scope.saveEdit = function (product) {	
	// bear in mind that in mongodb id is "_id"
        if (angular.isDefined(product._id)) {
		// edit existent item
            $scope.updateProduct(product);
        } else {
		// new item
            $scope.createProduct(product);
        }
    }
    $scope.cancelEdit = function () {
        if ($scope.currentProduct && $scope.createProduct.$get) {
            $scope.currentProduct.$get();
        }
        $scope.currentProduct = {};
        $scope.displayMode = "list";
    }
    $scope.listProducts();
});
