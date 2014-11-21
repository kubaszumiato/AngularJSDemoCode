//Demo1

//module definition
angular.module('demo1', [])

//controller definition for first demo purpose
.controller('Demo1Controller', ['$scope',
			function ($scope) {
			    $scope.test = "more interesting value";
			    $scope.btnName = "Click Me!";
			    $scope.btnClickCount = 0;


			    //some div displays if it's true
			    $scope.showBtn = false;

			    //executed on each button click
			    $scope.count = function () {
			        $scope.btnClickCount++;
			    };
			}]
	)

.directive('myDraggable', ['$document', function ($document) {
    return function (scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;

        //let's put some easy style on the element
        element.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        });

        //start drag
        element.on('mousedown', function (event) {
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        //drag in progress :)
        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        //end drag
        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
}]);

//Second Demo
angular.module('demo2', ['demo1'])
    .controller('Demo2Controller', [
        '$scope', 'ordService', function ($scope, ordService) {
            $scope.newTest = "Binding from second module";
            $scope.orders = [];

            var getOrders = ordService.getData();
            getOrders.then(function (result) {  // this is only run after $http completes
                $scope.orders = result;
            });

            $scope.orderDetails = function(order) {
                alert("Order number: " + order.numerator + " clicked!");
            }

        }
    ])
    .factory('ordService', ['$http', function ($http) {
        var getData = function () {

            return $http({ method: "GET", url: "Home/Orders" }).then(function (result) {
                return result.data;
            });
        };
        return { getData: getData };

    }

    ]);


//Demo3
angular.module('demo3', ['demo2','demo1'])
    .controller('Demo3Controller', [
        '$scope', 'ordService', function($scope, ordService) {
            $scope.orders = [];

            var getOrders = ordService.getData();
            getOrders.then(function (result) { 
                $scope.orders = result;
            });

            $scope.addOrder = function () {
                var num = $scope.orders.length + 1;
                $scope.orders.push({ id: num, numerator: "ng: " + num, price: num + "." + num });
            }

            $scope.foo = 0;
            $scope.bar = 0;

            $scope.hello = "Hello";

            $scope.setHello = function () {
                $scope.hello = "World";
            };
        }
    ])
.directive('clickable', function () {

    return {
        restrict: "E",
        scope: {
            foo: '=',
            bar: '='
        },
        template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                scope.$apply(function() {
                    scope.foo++;
                    scope.bar++;
                });
            });
        }
    }

});