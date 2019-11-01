import _ from 'lodash';

import directiveTemplate from './md-select-data.directive.html';

export default class mdSelectData {
    constructor() {
        this.restrict = 'E';
        this.template = directiveTemplate;
        this.scope = {
            ngModel: '=',
            ngRequired: '=',
            ngDisabled: '=?',
            formatSelected: '=?',
            formatResult: '=?',
            multiple: '=?',
            enumOptions: '=?',
            label: '@?',
            ngChange: '&?'
        };
        this.controller = DirectiveController;
        this.controllerAs = 'vm';
        this.bindToController = true;
    }

    compile(tElement, tAttrs) {
        if (angular.isDefined(tAttrs.multiple)) {
            tElement.children('md-select').attr('multiple', true);
        }

        return {
            post: this.link
        };
    }

    link(scope, element, attrs, controller) {
        if (angular.isDefined(attrs.multiple)) {
            controller.multiple = true;
        }

        scope.$watch('vm.ngModel', (newValue, oldValue) => {
            if (newValue === oldValue) {
                return;
            }
            (controller.ngChange || angular.noop)();
        });
    }
}

class DirectiveController {
    constructor($scope) {
        this.$scope = $scope;

        this.findSelected = this.findSelected.bind(this);
        this.defaultFormat = this.defaultFormat.bind(this);
    }

    /**
     * Function that wraps the formatSelected function. If we have no model selected, then return the label passed.
     * This will create the placeholder. If we have a model selected, then call formatSelected. If formatSelected is
     * not provided, then return the model itself.
     *
     * @returns {*} the formatted value
     */
    mdSelectedText() {
        if (_.isEmpty(this.ngModel)) {
            return this.label;
        }
        const selected = this.findSelected(this.enumOptions, this.ngModel);

        if (_.isFunction(this.formatSelected)) {
            return this.formatSelected(selected);
        }
        return this.defaultFormat(selected);
    }

    /**
     * This function finds the selected object in the array of options
     * @param opts options of the select
     * @param model selected model
     * @returns {Array} selected item in the array
     */
    findSelected(opts, model) {
        if (this.multiple) {
            return _.filter(opts, (opt) => {
                return _.includes(model, opt.id);
            });
        }
        return _.find(opts, {'id': model});
    }

    /**
     * Default format function.
     *
     * @param selected select object or an array containing the selected objetcs when it's multiple
     * @returns {*} description property. When it is multiple, it returns the concatenation of all descriptions,
     * using comma as seperator
     */
    defaultFormat(selected) {
        if (this.multiple) {
            return _.map(selected, 'description').join(', ');
        }
        return _.get(selected, 'description');
    }

    /**
     * This function will be called to format every option in the select.
     * If formatResult is not provided, then return the model itself.
     * @param option
     * @returns {*}
     */
    formatOption(option) {
        if (_.isFunction(this.formatResult)) {
            return this.formatResult(option);
        }

        return _.get(option, 'description');
    }
}

DirectiveController.$inject = [
    '$scope'
];