'use strict';

/**
 * @ngdoc function
 * @name angularTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularTestApp
 */
 angular.module('angularTestApp')
 .controller('MainCtrl', ['$scope', 'localStorageService', '$routeParams', function ($scope, localStorageService, $routeParams) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$on('$routeChangeSuccess', function () {
    	console.log($routeParams);
    	if($routeParams.filter === 'add') {
    		$scope.showAddList = true;
    	}
    });

    

    $scope.$watch('todos', function () {
      localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addList = function () {
      $scope.todos.push({name:$scope.newList, list: []});
      $scope.activeList = $scope.todos[$scope.todos.length-1];
      $scope.newList = '';
      $scope.showAddList = false;
    };


    $scope.activeList = 0;
    $scope.activeListName = $scope.todos[$scope.activeList].name;

    $scope.selectList = function(i) {
    	$scope.activeList = i;
    	console.log($scope.activeList);
    	console.log($scope.todos[$scope.activeList]);
    	$scope.activeListName = $scope.todos[$scope.activeList].name;
    };

    $scope.addTask = function (activeList) {
      $scope.todos[activeList].list.push({name:$scope.newTask, complete: false});
      console.log($scope.todos[activeList].list);
      $scope.newTask = '';
    };

    $scope.deleteTask = function (index) {
      $scope.todos[$scope.activeList].list.splice(index, 1);
    };

    $scope.listFilter = function(task) {
  		if ($scope.listFilter === "all") {
  			// console.log($scope.listFilter);
  			return true;
  		}else if(task.complete && $scope.listFilter === "completed"){
  			// console.log($scope.listFilter);
  			return true;
  		}else if(!task.complete && $scope.listFilter === "incomplete"){
  			// console.log($scope.listFilter);
  			return true;
  		}else{
  			return false;
  		}
    };


    $scope.allTasks = function() {
    	var all = 0;
    	for(var i = 0; i < $scope.todos.length; i++) {
    		all += $scope.todos[i].list.length;
    	}
    	return all;
    };

    $scope.allIncompleteTasks = function() {
    	var allIncomplete = 0;
    	for(var i = 0; i < $scope.todos.length; i++) {
    		for(var j = 0; j < $scope.todos[i].list.length; j++) {
    			if(!$scope.todos[i].list[j].complete) {
    				// console.log($scope.todos[i].list[j])
    				allIncomplete++;
    			}
    		}
    		// console.log(allIncomplete);
    	}
    	return allIncomplete;
		};
		

 }]);
