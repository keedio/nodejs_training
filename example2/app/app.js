
'use strict';

var app = angular.module("logsApp",
    ['ngResource', 'ngRoute', 'logsComponent']) ;

app.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.
        when('/', {
            template: '<logs-component></logs-component>'
        }).
        otherwise('/');
    }
]);

app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:8888');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});