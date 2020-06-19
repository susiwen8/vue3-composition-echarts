import { onMounted, watch } from 'vue';
import echarts from 'echarts';

export function useOption<T extends {option: echarts.EChartOption}>(props: T, el: string) {
    let chartProxy: echarts.ECharts;
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
    watch(() => props.option, (newOption) => {
        chartProxy.setOption(newOption);
    });

    function manipulateChart(property: string, ...args: any[]): any {
        return chartProxy[property](...args);
    }

    return {
        manipulateChart
    };
}