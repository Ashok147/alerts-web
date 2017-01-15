function createToastFactory ($mdToast){

    return function make(obj){
        $mdToast.show($mdToast.simple({
            hideDelay: 2000,
            position: 'top right',
            content: obj.message,
            toastClass: obj.type
        }));
    }
}

var alertsService = function(alerturls,$http,$q){

    var alertMainPath = alerturls.mainpath;

    console.log(alertMainPath);

    function createAlert(alert){

        var deferred = $q.defer();
        deferred.reject();

        var promise =  $http({
            method: 'POST',
            url: alertMainPath+alerturls.create,
            data:alert
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    function updateAlert(alert) {

        var deferred = $q.defer();
        deferred.reject();

        $http({
            method: 'POST',
            url: alertMainPath + alerturls.update,
            data: alert
        }).then(function successCallback(response) {
            deferred.resolve(response);

        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function pauseAlert(alertId){

        var deferred = $q.defer();
        deferred.reject();

        $http({
            method: 'GET',
            url: alertMainPath+alerturls.pause+"/"+alertId,
            data:alert
        }).then(function successCallback(response) {
            deferred.resolve(response);

        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function resumeAlert(alertId){
        var deferred = $q.defer();
        deferred.reject();

        $http({
            method: 'GET',
            url: alertMainPath+alerturls.resume+"/"+alertId,
            data:alert
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function deleteAlert(alertId){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: alertMainPath+alerturls.delete+"/"+alertId

        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function listAlerts(size,offset,fromTime,toTime){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: alertMainPath+alerturls.list+"?"+"size="+size+"&offset="+offset+"&fromTime="+fromTime+"&toTime="+toTime
        }).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
             deferred.reject(response);
        });

        return deferred.promise;
    }

    function createTag(tag) {
        var deferred = $q.defer();
        deferred.reject();

        $http({
            method: 'PUT',
            url: alertMainPath + alerturls.createtag,
            data: tag
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }


    function getAlertAnomalyData(alertId,fireInstanceId){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: alerturls.alertanomaly+"?"+"alertId="+alertId+"&fireId="+fireInstanceId
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }


    function getTagsOfLike(namepattern){

        var deferred = $q.defer();
        deferred.reject();

        $http({
            method: 'GET',
            url: alertMainPath+alerturls.tagslike+"/"+"?"+"namepattern="+namepattern,
        }).then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    return {
        'createAlert':createAlert,
        'updateAlert':updateAlert,
        'pauseAlert':pauseAlert,
        'resumeAlert':resumeAlert,
        'deleteAlert':deleteAlert,
        'listAlerts':listAlerts,
        'createTag':createTag,
        'getTagsOfLike':getTagsOfLike,
        'alertAnomaly':getAlertAnomalyData
    };

};