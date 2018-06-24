# md-select-data

[![Build Status](https://travis-ci.org/luanrubensf/md-select-data.svg?branch=master)](https://travis-ci.org/luanrubensf/md-select-data)

Select component for enums or simple objects, based on the AngularJs Material.
This will work perfectly for simple objects and pre-defined options.
To use with dynamic data, fetched from an API, you can use the [md-select-scroll](https://github.com/luanrubensf/md-select-scroll).

## How to import

Run the command:

```
npm i md-select-data --save
```

Then import the module into the project:

```
import mdSelectData from 'md-select-data';

angular.module(MODULE_NAME, [
    mdSelectData
]);
```


## How to use

Just put the directive in the html:

OBS: note that you need to create some functions like ```format-result``` and ```format-select``` for a specialized behavior.
```html
<md-select-data
                  format-result="vm.formatResult"
                  format-selected="vm.formatSelected"
                  ng-change="ngChange()"
                  enumOptions="vm.formasPagamento"
                  ng-model="ngModel"></md-select-data>
```

You can define the following parameters:

* ngModel: the model of the directive
* ngRequired: define if the model is required or not
* ngChange: function invoked when the model changes
* ngDisabled: defines if the select should be disabled or not
* formatSelected: the reference to a function that is used to format the select (or selecteds) itens
* formatResult: the reference to a function that is used to format each option
* multiple: define if the select is multiple or not
* label: define the label (placeholder) of the component
* enumOptions: the options list to the md-select. The component expects to receive a list as follow:

```
const options = [
    {
        id: 1,
        description: 'Item 1'
    },
    {
        id: 2,
        description: 'Item 2'
    }
];
```

It's mandatory to have an ```id``` property. The ```description``` property can be changed using the
```formatSelected```and ```formatResult``` functions.

**OBS:** This component uses md-select, from [angular-material](https://material.angularjs.org/latest/), so it's mandatory to have angular-material in your application.

Feel free to contribute or to contact me. :)
