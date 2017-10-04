/**
 * Created by davidsantamaria on 16/2/17.
 */

    'use strict';
var app = angular.module('LogsService', ['ngResource']);
    app.factory('LogsService', [  '$http','$q', Service]);

    function Service($http, $q) {
        var service = {};

        service.GetTopHostNames = GetTopHostNames;
        service.GetTotalByService = GetTotalByService;

        return service;


        function GetTopHostNames() {
            return  $http({
                url: '/logs/getTopHostNames',
                method: "GET"
            }).then(handleSuccess, handleError);
        }


        function GetTotalByService() {
            return  $http({
                url: '/logs/countByService',
                method: "GET"
            }).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }


