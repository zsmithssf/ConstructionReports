angular.module('starter.controllers', [])

.controller('LoginCtrl',['$scope', '$state', 'UserService', '$ionicHistory', function($scope, $state, UserService, $ionicHistory) {
    $scope.user = {};
    
    $scope.loginSubmitForm = function(form)
    {
        if(form.$valid)
        {  
            UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    //Should return a token
                    $ionicHistory.nextViewOptions({
                      historyRoot: true,
                      disableBack: true
                    });
                    $state.go('lobby');
                } else {
                    // invalid response
                    alert("Something went wrong, try again.");
                }
            }, function(response) {
                // Code 401 corresponds to Unauthorized access, in this case, the email/password combination was incorrect.
                if(response.status === 401)
                {
                    alert("Incorrect username or password");
                }else if(response.data === null) {
                    //If the data is null, it means there is no internet connection.
                    alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                }else {
                    alert("Something went wrong, try again.");
                }
            });
        }
    };
}])
.controller('RegisterCtrl',['$scope', '$state', 'UserService', '$ionicHistory', '$window',
function($scope, $state, UserService, $ionicHistory, $window) {
    $scope.user = {};
    $scope.repeatPassword = {};
    
    function loginAfterRegister()
    {
        UserService.login($scope.user)
        .then(function(response) {
            if (response.status === 200) {
                //Should return a token
                $window.localStorage["userID"] = response.data.userId;
                $window.localStorage['token'] = response.data.id;
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableBack: true
                });
                $state.go('lobby');
            } else {
                // invalid response
                $state.go('landing');
            }
            resetFields();
        }, function(response) {
            // something went wrong
            $state.go('landing');
            resetFields();
        });
    }

    $scope.registerSubmitForm = function(form)
    {
        if(form.$valid)
        {
            if($scope.user.password !== $scope.repeatPassword.password) {
                alert("Error", "Passwords do not match.");
            } else {
                UserService.create($scope.user)
                .then(function(response) {
                    if (response.status === 200) {
                        loginAfterRegister();
                        form.$setPristine(); 
                    } else {
                        // invalid response
                        alert("Error","Something went wrong, try again.");
                    }
                }, function(response) {
                    //Code 422 shows that the email is already registered.
                    if(response.status === 422) 
                    {
                        alert("Error", "Email already in use.");
                    } else if(response.data === null) {
                        //If the data is null, it means there is no internet connection.
                        alert("Error", "The connection with the server was unsuccessful, check your internet connection and try again later.");
                    } else {
                        alert("Error", "Something went wrong, try again");
                    }
                }
            )}
        }
    };
    function resetFields()
    {
        $scope.user.email = "";
        $scope.user.firstName = "";
        $scope.user.lastName = "";
        $scope.user.organization = "";
        $scope.user.password = "";
        $scope.repeatPassword.password = "";
    }
}])
.controller('ReportsCtrl',['$scope', '$window', 'ReportsService', function($scope, $window, ReportsService) {
    $scope.groups = [];
    $scope.state = -1;
    $scope.getState = function(a) {
        return $scope.state === a;
    };
    $scope.setState = function(currentState) {
        if(currentState === $scope.state) {
            $scope.state = -1;
        }
        else {
            $scope.state = currentState;
        }
    };
    $scope.reportsList = {};
    $scope.Reports = [];
    $scope.example = function() {
    ReportsService.all($window.localStorage.token, $scope.Reports)
      .then(function(response) {
            console.log(response);
            $scope.reportsList = response.data;
            for (var i=0; i<$scope.reportsList.length; i++) {
                $scope.groups[i] = {
                    name: i,
                    items: []
                };
            for (var j=0; j<3; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
          }
      });
    };
    $scope.example();
}])
.controller('CreateReportsCtrl',['$scope', '$window', 'SeverityService', 'TradeService', function($scope, $window, SeverityService, TradeService) {
    $scope.groups = [];
    $scope.state = -1;
    $scope.getState = function(a) {
        return $scope.state === a;
    };
    $scope.setState = function(currentState) {
        if(currentState === $scope.state) {
            $scope.state = -1;
        }
        else {
            $scope.state = currentState;
        }
    };
    $scope.severityList = {};
    $scope.tradeList = {};
    $scope.Severity = [];
    $scope.Trade = [];
    $scope.examplea = function() {
    SeverityService.all($window.localStorage.token, $scope.Severity)
      .then(function(response) {
            console.log(response);
            $scope.severityList = response.data;
            for (var i=0; i<$scope.severityList.length; i++) {
                $scope.groups[i] = {
                    name: i,
                    items: []
                };
            for (var j=0; j<3; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
          }
      });
    };
    $scope.examples = function() {
    TradeService.all($window.localStorage.token, $scope.Trade)
      .then(function(response) {
            console.log(response);
            $scope.tradeList = response.data;
            for (var i=0; i<$scope.tradeList.length; i++) {
                $scope.groups[i] = {
                    name: i,
                    items: []
                };
            for (var j=0; j<3; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
          }
      });
    };
    $scope.examplea();
    $scope.examples();
}]);