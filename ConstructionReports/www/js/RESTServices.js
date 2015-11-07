angular.module('RESTConnection', [])
.constant('ENDPOINT_URL', 'https://construction-backend-zsmithssf.c9.io/api/')  
.service('UserService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
    var service = this,
    path = 'Users/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function (Users) {
        return $http.post(getUrl(), Users);
    };
    service.login = function(Users) {
        Users["ttl"] = 1209600000;
        return $http.post(getUrl()+"login",Users);
    };
    service.logout = function(token) {
        return $http({
            url: getUrl()+"logout",
            method: "POST",
            headers: {
                'Authorization': token
            }
        });
    };
}])
.service('ReportsService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
    var service = this,
    path = 'Reports/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function(Reports, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: JSON.stringify(Reports),
            headers: {
                'Authorization': token
            }
        });
    };
    service.all = function(token) {
        return $http({
            url: getUrl(),
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };
}])
.service('SeverityService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
    var service = this,
    path = 'Severity/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function(Severity, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: JSON.stringify(Severity),
            headers: {
                'Authorization': token
            }
        });
    };
    service.all = function(token) {
        return $http({
            url: getUrl(),
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };
}])
.service('JobSitesService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
    var service = this,
    path = 'JobSites/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function(JobSites, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: JSON.stringify(JobSites),
            headers: {
                'Authorization': token
            }
        });
    };
}])
.service('TradeService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
    var service = this,
    path = 'Trade/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function(Trade, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: JSON.stringify(Trade),
            headers: {
                'Authorization': token
            }
        });
    };
    service.all = function(token) {
        return $http({
            url: getUrl(),
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };
}])
.service('StatusService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
    var service = this,
    path = 'Status/';
    function getUrl() {
        return ENDPOINT_URL + path;
    }
    service.create = function(Status, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: JSON.stringify(Status),
            headers: {
                'Authorization': token
            }
        });
    };
}]);