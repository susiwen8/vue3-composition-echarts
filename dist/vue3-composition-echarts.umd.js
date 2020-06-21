(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('echarts')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'echarts'], factory) :
    (global = global || self, factory(global['vue3-composition-echarts'] = {}, global.vue, global.echarts));
}(this, (function (exports, vue, echarts) { 'use strict';

    echarts = echarts && Object.prototype.hasOwnProperty.call(echarts, 'default') ? echarts['default'] : echarts;

    function useECharts(props, el, theme, opts) {
        var chartProxy;
        vue.onMounted(function () {
            var chart = echarts.init(document.getElementById(el), theme, opts);
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
        function echartsGraphicMethods(method) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = echarts.graphic)[method].apply(_a, args);
        }
        function echartsMethods(method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return echarts[method].apply(echarts, args);
        }
        return {
            manipulateChart: manipulateChart,
            echartsMethods: echartsMethods,
            echartsGraphicMethods: echartsGraphicMethods
        };
    }

    exports.useECharts = useECharts;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
