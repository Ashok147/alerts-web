/**
 * Created by pavan.t on 12/01/17.
 */
function AppCtrl(AlertService,$mdToast,$scope) {

    var self = this;

    self.createAlertPromise = function (alert){
      return  AlertService.createAlert(alert);
    };

    var $ = angular.element;
    $scope.subDataS = false;
    $scope.showMetrics = false;
    var data = {};
    // callMe();

    $scope.dataSources = [
        { value: 'Druid', name: 'Druid' },
        { value: 'ElasticSearch', name: 'Elastic Search' },
        { value: 'Cosmos', name: 'Cosmos' },

    ];

    $scope.subdataSources = [
        { value: 'ExchangeDataCube', name: 'Exchange Data Cube' },
        { value: 'ONOAudienceCube', name: 'ONO Audience Cube' },
        { value: 'ONODataCube', name: 'ONO Data Cube' },

    ];

    $scope.metrics = [
        { name: 'REQUESTS' },
        { name: 'SERVED_IMPRESSIONS' },
        { name: 'LOADED_IMPRESSIONS' },
        { name: 'VIEWS' },
        { name: 'CLICKS' },
        { name: 'ACTIONS' },
        { name: 'SPENT' },
        { name: 'FILL_RATE' },
        { name: 'ACTION_RATE' },
        { name: 'VIEW_RATE' },
        { name: 'SERVING_EFFICIENCY' },

    ];

    $scope.allCheckBoxes = [
        { value:'m1' ,name: 'APPVERSION' },
        { value:2 ,name: 'CONNECTION_TYPE' },
        { value:3 ,name: 'BANNER_ID' },
        { value:4 ,name: 'CAMPAIGN_ID' },
        { value:5 ,name: 'CHANNEL' },
        { value:6 ,name: 'ZONEGROUP_ID' },
        { value:7 ,name: 'BRAND_NAME' },
        { value:8 ,name: 'CMP_CATEGORY' },
        { value:9 ,name: 'PLATFORM' },
        { value:10 ,name: 'PRICING_TYPE' },
        { value:11,name: 'ACCOUNT_ID' },
        { value:12 ,name: 'CAMPAIGN_NAME' },
        { value:13 ,name: 'ACCOUNT_NAME' },
        { value:14 ,name: 'BRAND_ID' },
        { value:15 ,name: 'SDK_VERSION' },
        { value:16 ,name: 'ZONE_ID' },
        { value:17 ,name: 'AD_FORMAT' }
    ];

    $scope.thresholdValue = "";

    $scope.intervals = [
        { name: 'all' },
        { name: 'none' },
        { name: 'second' },
        { name: 'minute' },
        { name: 'fifteen_minute' },
        { name: 'thirty_minute' },
        { name: 'hour' },
        { name: 'day' },
        { name: 'week' },

    ];

    $scope.selectTime = [
        { value:1 ,name: 'hour' },
        { value:2 ,name: 'day' },
        { value:3 ,name: 'week' },
        { value:4 ,name: 'month' },
    ];


    $scope.models =[
        { name: 'basic' }
    ];
    $scope.aggregations = [
        {name: 'longSum'}
    ];


    // $scope.checkedOrNot = function (checkValue){
    // 	  if (checkValue) {
    //                  console.log("CheckBox is checked.");
    //                  console.log(checkValue);
    //               } else {
    //                  console.log("CheckBox is not checked.");
    //                   console.log(checkValue);
    //               }

    // }

    $scope.timeCheckedOrNot = function (checkValue){
        console.log(checkValue);
        if (checkValue) {
            console.log("CheckBox is checked.");
            console.log(checkValue);
        } else {
            console.log("CheckBox is not checked.");
            console.log(checkValue);
        }
    };


    $scope.submitForm = function (){
        var overallDimension={};
        var flagForDimensions=0;
        var quickTimeValue;
        var flagForCreateAlert=1;

        if($scope.alertName != undefined){
            data.name = $scope.alertName;
        }
        else{

            flagForCreateAlert=0;
        }
        if($scope.dataSource != undefined){
            data.dataSource = $scope.dataSource;
        }
        else{
            flagForCreateAlert=0;
        }
        // if(data.name !== undefined)
        if($scope.dataSource == "Druid"){
            if($scope.subDataSource != undefined){
                data.dataSubSource = $scope.subDataSource.replace(/[\s]/g, '');
            }
            else{
                flagForCreateAlert=0;
            }
        }

        if($scope.subDataSource == "ONO Data Cube"){
            if($scope.metric != undefined){
                data.metric = $scope.metric;
            }
            else{
                flagForCreateAlert=0;
            }
        }

        angular.forEach($scope.allCheckBoxes, function(value, key) {
            if(value.model !== undefined)
            {
                console.log("loop");
                flagForDimensions=1;
                //var innerDimension={};
                var innerDimensionValues=[];
                var innerKeyForDimension =value.name;
                innerDimensionValues.push(value.model);
                overallDimension[innerKeyForDimension]=innerDimensionValues;
            }

        });
        if(flagForDimensions==1){
            overallDimension = JSON.stringify(overallDimension);
            overallDimension='('+overallDimension+')';
            data.dimensions=overallDimension;
        }

        if($scope.aggregation != undefined){
            data.aggregation=$scope.aggregation;

        }
        else{
            flagForCreateAlert=0;
        }

        if($scope.interval != undefined){
            data.interval=$scope.interval;
        }else{
            flagForCreateAlert=0;
        }


        if($scope.model != undefined){
            if($scope.thresholdValue != undefined){
                var reqModel={};
                var innerThreshold={};
                var overAllModel;
                innerThreshold.threshold = $scope.thresholdValue;
                reqModel.name=$scope.model;
                reqModel.params=innerThreshold;
                reqModel="("+JSON.stringify(reqModel)+")";
                data.model=reqModel;

                console.log(data.model);
            }
            else{
                flagForCreateAlert=0;
            }
        }else{
            flagForCreateAlert=0;
        }

        // if($scope.checkTime != undefined){
        //   data.quicktime="now-"+$scope.alertTime+$scope.checkTime;
        // }
        // else{
        //   flagForCreateAlert=0;
        // }

        if($scope.cron != undefined){
            data.cron=$scope.cron;

        }
        else{
            flagForCreateAlert=0;
        }

        if($scope.expired != undefined){
            data.expired_at=$scope.expired;
        }

        console.log(flagForCreateAlert);
        console.log(JSON.stringify(data));

        self.createAlertPromise(data).then(
            function (response) {
                console.log(response);
            },
            function (response) {
                console.log(response);
            }
        );
    }
}

function NavCtrl($scope) {
    $scope.currentNavItem = 'page1';
}

function listTwoCtrl(AlertService, $scope,$location,Toast){
    var self = this;

    $scope.initStateImages = {'NONE':'', 'NORMAL':'scripts/images/pause.svg', 'PAUSED':'scripts/images/play.svg', 'COMPLETE':'', 'ERROR':'', 'BLOCKED':''}

    $scope.getImagePathOfAlertState = function(state) {
        console.log(state);
        return $scope.initStateImages[state];
    };

    $scope.selectedSize = 10;
    $scope.selected = 0;  // for using enabling and disabling the Select Size future
    $scope.listQueryForm={};
    $scope.alertsCollection = [];
    $scope.paginatorValues = {
        offset:0,
        size:10,
        page:1
    };
    $scope.hasNext = 0;
    $scope.hasPrev = 0;

    $scope.alertState = "";

    self.resetPaginatorValues = function () {
        $scope.paginatorValues = {
            offset:0,
            size:10,
            page:1
        };
    };

    self.resetPrevAndNextValues = function () {
        $scope.hasNext = 0;
        $scope.hasPrev = 0;
    };

    self.listAlertsPromise = function(pageSize,offset,fromTime,toTime) {
        return AlertService.listAlerts(pageSize, offset, fromTime, toTime);
    }

    self.deleteAlertPromise = function (id){
        return AlertService.deleteAlert(id);
    }

    self.pauseAlertPromise = function (id){
        return AlertService.pauseAlert(id);
    }

    $scope.selectedItemChanged = function(){

        if($scope.paginatorValues.page === 1 && $scope.selected === 1){
            $scope.paginatorValues.size = $scope.selectedSize;
            self.listAlertsPromise($scope.paginatorValues.size,$scope.paginatorValues.offset,$scope.listQueryForm.fromTime,$scope.listQueryForm.toTime)
                .then(
                    function (response) {
                        if(response.data.length < $scope.paginatorValues.size){
                            $scope.hasNext= 0;
                        }else{
                            $scope.hasNext = 1;
                            $scope.alertsCollection=response.data;
                        }
                    },
                    function (response) {

                    }
                );
        }
    };


    $scope.submitForAlerts = function(){

        self.resetPaginatorValues();
        self.resetPrevAndNextValues();

        $scope.alertsCollection=[];


        if($scope.listQueryForm.fromTimee == undefined){
            return false;
        }

        if($scope.listQueryForm.toTimee == undefined){
            $scope.listQueryForm.toTime = new Date().getSqlFormatCurrentDate();
        }else{
            $scope.listQueryForm.toTime = new Date($scope.listQueryForm.toTimee).getSqlFormatDate();
        }
        $scope.listQueryForm.fromTime = new Date($scope.listQueryForm.fromTimee).getSqlFormatDate();

        self.listAlertsPromise($scope.paginatorValues.size,$scope.paginatorValues.offset,$scope.listQueryForm.fromTime,$scope.listQueryForm.toTime)
            .then(
                function (response) {
                    if(response.data.length === 0){
                    }
                    else if(response.data.length <$scope.paginatorValues.size){
                        $scope.alertsCollection=response.data;
                    }else{
                        $scope.hasNext = 1;
                        $scope.alertsCollection=response.data;
                        $scope.selected = 1;
                    }
                },
                function (response) {
                    alert(response);
                }
            );

    };

    $scope.previousPage = function(){

            var tmpValues = $scope.paginatorValues;
            $scope.paginatorValues.offset = +(tmpValues.offset - 1) - +$scope.selectedSize;
            $scope.paginatorValues.size = $scope.selectedSize;
            $scope.paginatorValues.page = tmpValues.page - 1;
            self.listAlertsPromise($scope.paginatorValues.size,$scope.paginatorValues.offset,$scope.listQueryForm.fromTime,$scope.listQueryForm.toTime)
                .then(
                    function (response) {
                        $scope.alertsCollection=response.data;
                    },
                    function (response) {
                        alert("console.log");
                    }
                );
            if($scope.paginatorValues.page === 1) {
                 $scope.selected = 1;
                 $scope.hasPrev = 0;
                 $scope.hasNext = 1;
            }
    };

    $scope.nextPage = function(){
        $scope.selected = 0;
        var tmpValues = $scope.paginatorValues;
        $scope.paginatorValues.offset = +(tmpValues.offset + 1) + +$scope.selectedSize;
        $scope.paginatorValues.size = $scope.selectedSize;
        $scope.paginatorValues.page = tmpValues.page + 1;
        self.listAlertsPromise($scope.paginatorValues.size,$scope.paginatorValues.offset,$scope.listQueryForm.fromTime,$scope.listQueryForm.toTime)
            .then(
                function (response) {
                    if(response.data.length === 0){
                        $scope.hasNext = 0;
                    }
                    else if(response.data.length < $scope.paginatorValues.size  ){
                        $scope.hasNext = 0;
                        $scope.hasPrev = 1;
                        $scope.alertsCollection=response.data;
                    }else{
                        $scope.hasPrev = 1;
                        $scope.alertsCollection=response.data;
                    }
                },
                function (response) {
                    alert("console.log");
                }
            );
    };

    $scope.deleteAlert = function removeItem(alert) {

        $scope.$watch('alertsCollection',function(newValue, oldValue){
            if(newValue.length != oldValue.length){
                if(newValue.length === 0){
                    $scope.selected = 0;
                }
            }
        });

        var index = $scope.alertsCollection.indexOf(alert);
        self.deleteAlertPromise(alert.id).then(
            function(response){
                console.log(response);
                $scope.alertsCollection.splice(index, 1);
                Toast({message:"Deleted Sucessfully",type:'success'});
            },
            function (response) {

            }
        );
    };

    $scope.performAction = function pauseItem(row) {
        var index = $scope.alertsCollection.indexOf(row);
        self.pauseAlertPromise(row.id).then(
            function(response){
                row.state = "NORMAL";
                $scope.alertsCollection.splice(index, 0, row);
            },
            function(response){
                console.log(response);
            }
        );
    };

    $scope.resumeItem = function resumeItem(row,event) {
        self.resetResumed();
        var index = $scope.alertsCollection.indexOf(row);
        var alertId = event.target.id;
        self.resumeAlertPromise(alertId);
    };

    $scope.editAlert = function edit(alert){
        $location.path("/");
    };
}


function anomalyDataController(AlertService,$scope,$routeParams,Toast){
    var self = this;

    self.getAlertAnomalyDataPromise = function(alertId,fireId) {
        return AlertService.alertAnomaly(alertId,fireId);
    };

    alertId = $routeParams.alertId;
    fireId = $routeParams.fireId;

    self.getAlertAnomalyDataPromise(alertId,fireId).then(
        function(response){

            var temp = response.data.alert;

            var dimensions = temp.dimensions.slice(1,-1);
            var model = temp.model.slice(1,-1);
            temp.dimensions = JSON.parse(dimensions);
            temp.model = JSON.parse(model);
            $scope.alert = temp;

            $scope.data = JSON.parse(response.data.responseData.response);

        },
        function(response){
            Toast({message:response.status+" "+"something went wrong please try again later",type:"error"});
        }
    );

}
