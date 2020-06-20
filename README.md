# vue3-compostion-echarts

A simple Vue3 compostion API function for ECharts

## Usage

`npm install vue3-compostion-echarts`

## Examples
App.vue
```js
<template>
  <ECharts
    :option="data.option"
  >
  </ECharts>
  <div id="main"></div>
  <div style="text-align: center;">
    <div @click="changeOption" class="set-btn">setOption</div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import ECharts from './ECharts.vue';
import { useOption } from 'vue3-composition-echarts';

export default {
    components: {
        ECharts
    },
    setup() {
        const data = reactive(
            {
                option: {
                    title: {
                    text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'line',
                            data: [5, 20, 36, 10, 10, 20]
                        }
                    ]
                }
            }
        );

        const data2 = reactive({
            option: {
                title: {
                text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            }
        });
        const { manipulateChart } = useOption(data2, 'main');

        function changeOption() {
            const newData = [];
            for (let i = 0; i < 6; i++) {
                newData.push(Math.ceil(Math.random() * 100)); 
            }
            data.option = {
                series: [
                    {
                        data: newData
                    }
                ]
            };
            data2.option = {
                series: [
                    {
                        data: newData
                    }
                ]
            };
        }

        

        return {
            data,
            changeOption
        }
    }
}
</script>

<style scoped>
#main {
    width: 40vw;
    height: 40vh;
    margin: 0 auto;
}

.set-btn {
    background: #666;
    padding: 5px 10px;
    display: inline-block;
    color: #fff;
    cursor: pointer;
}
</style>

```

ECharts.vue

```js
<template>
  <div id="echarts" />
</template>

<script>
import echarts from 'echarts';
import { useOption } from 'vue3-composition-echarts';

export default {
    props: {
        option: Object,
        theme: [String, Object],
        initOptions: Object,
        group: String,
        autoresize: Boolean,
        watchShallow: Boolean,
        manualUpdate: Boolean
    },
    name: 'ECharts',
    setup(props) {
        useOption(props, 'echarts');
    }
};
</script>

<style>
#echarts {
    width: 40vw;
    height: 40vh;
    margin: 0 auto;
}
</style>
```