/*

.directive('ngLoading', function() {
    return function(scope, element, attrs) {
        var img = angular.element('<img class="loading-icon" src="/assets/images/loading-icon.gif"/>');
        element.append(img);
        scope.$watch(attrs.ngLoading, function(isLoading) {
            if(isLoading) {
                img.removeClass('ng-hide');
                element.addClass('loading');
                element.attr('disabled', '');
            } else {
                img.addClass('ng-hide');
                element.removeClass('loading');
                element.removeAttr('disabled');
            }
        });
    };
});

*/


app.factory("Toast", function createToastFactory ($mdToast, $mdDialog) {
    return function make (newObj) {
        var hMap = {
            success : '<span class="glyphicon glyphicon-ok" aria-hidden="true">',
            danger : '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true">',
            warning : '<span class="glyphicon glyphicon-warning-sign" aria-hidden="true">',
            info : '<span class="glyphicon glyphicon-info-sign" aria-hidden="true">'
        }
        if(newObj.locals.toastIcon) {
            newObj.locals.toastIcon = hMap[newObj.locals.toastIcon];
        }
        var makeObj = Object.create(null);
        makeObj.controller = newObj.controller || 'ToastCtrl';
        makeObj.position = newObj.position || 'top right';
        makeObj.templateUrl = newObj.templateUrl || 'toast-template';
        makeObj.parent = newObj.parent || '#toast-container';
        makeObj.locals = newObj.locals || {toastText: "text", toastIcon: toastIconSuccess} ;
        makeObj.hideDelay = 4000 || newObj.hideDelay;
        $mdToast.show(makeObj);
    }
});
