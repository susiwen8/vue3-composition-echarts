<template>
  <ECharts
    :option="data.option"
  >
  </ECharts>
  <div style="text-align: center;">
    <div @click="changeOption1" class="set-btn">setOption</div>
  </div>
  <div id="main"></div>
  <div style="text-align: center;">
    <div @click="changeOption2" class="set-btn">setOption</div>
    <div @click="dispose2" class="set-btn">dispose</div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import ECharts from './ECharts.vue';
import { useECharts } from 'vue3-composition-echarts';

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
        const { manipulateChart } = useECharts(data2, 'main');

        function changeOption1() {
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
        }
        function dispose2() {
            manipulateChart('dispose');
        }

        function changeOption2() {
            const newData = [];
            for (let i = 0; i < 6; i++) {
                newData.push(Math.ceil(Math.random() * 100)); 
            }
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
            changeOption1,
            changeOption2,
            dispose2
        }
    }
}
</script>

<style>
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
