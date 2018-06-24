import angular from 'angular';

import './md-select-data.css';

import mdSelectData from './md-select-data.directive';

const MODULE_NAME = 'md-select-data';

angular.module(MODULE_NAME, [])
    .directive('mdSelectData', () => new mdSelectData);

export default MODULE_NAME;