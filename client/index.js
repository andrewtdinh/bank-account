'use strict';

angular.module('bank-account', ['firebase'])
.run(['$rootScope', function($rootScope){
  $rootScope.balance = 10000;
  $rootScope.name = 'Bob Smith';
}])
.controller('master', ['$rootScope', '$scope', function($rootScope, $scope){
  $scope.deposits = [];
  $scope.withdraws = [];
  $scope.fees = [];

  $scope.deposit = function(){
    $rootScope.balance += $scope.amount;
    $scope.deposits.push({amount:$scope.amount, date:new Date()});
  };
  $scope.withdraw = function(){
    var fee = 0;
    if($rootScope.balance >= 0 && ($rootScope.balance - $scope.amount < 0)){
      fee = 50;
      $scope.fees.push({amount:50, date:new Date()});
    }

    $rootScope.balance -= $scope.amount + fee;
    $scope.withdraws.push({amount:$scope.amount, date:new Date()});
  };
}]);
