import { onMounted, watch, onUnmounted } from 'vue';
import echarts from 'echarts';

export function useECharts<T extends {option: echarts.EChartOption}>(props: T, el: string) {
    let chartProxy: echarts.ECharts | null;

    onMounted(() => {
        const chart = echarts.init(document.getElementById(el) as HTMLDivElement);
        chart.setOption(props.option);

        chartProxy = new Proxy(chart, {
            get(target, property) {
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

    onUnmounted(() => {
        chartProxy.dispose();
        chartProxy = null;
    });

    function manipulateChart(property: string, ...args: any[]): any {
        return chartProxy ? chartProxy[property](...args) : null;
    }

    watch(() => props.option, (newOption) => {
        manipulateChart('setOption', newOption)
    });

    return {
        manipulateChart
    };
}