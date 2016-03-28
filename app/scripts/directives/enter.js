'use strict';
 angular.module('angularTestApp')
 .directive("ngEnter",function  () {
 return function  (scope,elem) {
  $(elem).keyup(function(e) {
   //enter key
   if (e.keyCode === 13) {
    scope.$apply(function  () {
   	// call the addTask method
     scope.addTask();
    });
   }
  });
 };
});