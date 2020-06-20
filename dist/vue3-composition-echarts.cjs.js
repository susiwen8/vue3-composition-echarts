'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vue = require('vue');
var echarts = _interopDefault(require('echarts'));

function useECharts(props, el) {
    var chartProxy;
    vue.onMounted(function () {
        var chart = echarts.init(document.getElementById(el));
        chart.setOption(props.option);
        chartProxy = new Proxy(chart, {
            get: function (target, property) {
                switch (property) {
                    case 'width':
                        return target['getWidth']();
                    case 'height':
                        return target['getHeight']();
                    case 'isDisposed':
                        return target['isDisposed']();
                    case 'computedOptions':
                        return target['getOption']();
                    default:
                        return target[property];
                }
            }
        });
    });
    vue.onUnmounted(function () {
        chartProxy.dispose();
        chartProxy = null;
    });
    function manipulateChart(property) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return chartProxy ? chartProxy[property].apply(chartProxy, args) : null;
    }
    vue.watch(function () { return props.option; }, function (newOption) {
        manipulateChart('setOption', newOption);
    });
    return {
        manipulateChart: manipulateChart
    };
}

exports.useECharts = useECharts;
