(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('echarts')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'echarts'], factory) :
    (global = global || self, factory(global['vue3-echarts'] = {}, global.vue, global.echarts));
}(this, (function (exports, vue, echarts) { 'use strict';

    echarts = echarts && Object.prototype.hasOwnProperty.call(echarts, 'default') ? echarts['default'] : echarts;

    function useOption(props, el) {
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
        vue.watch(function () { return props.option; }, function (newOption) {
            chartProxy.setOption(newOption);
        });
        function manipulateChart(property) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return chartProxy[property].apply(chartProxy, args);
        }
        return {
            manipulateChart: manipulateChart
        };
    }

    exports.useOption = useOption;

    Object.defineProperty(exports, '__esModule', { value: true });

})));