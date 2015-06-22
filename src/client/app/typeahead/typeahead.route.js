/// <reference path="../../../../vendortypescripts/angularjs/angular.d.ts"/>
(function() {
    'use strict';

    angular
        .module('app.typeahead')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'typeahead',
                config: {
                    url: '/typeahead',
                    templateUrl: 'app/typeahead/typeahead.html',
                    controller: 'TypeaheadController',
                    controllerAs: 'vm',
                    title: 'Typeahead',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-search"></i> Typeahead'
                    }
                },
            }
        ];
    }
})();
