<template>
  <div id="echarts" />
  <div style="text-align: center;">
    <div @click="dispose" class="set-btn">dispose</div>
  </div>
</template>

<script>
import { useECharts } from 'vue3-composition-echarts';

export default {
    props: {
        option: Object
    },
    name: 'ECharts',
    setup(props) {
        const { manipulateChart } = useECharts(props, 'echarts');

        function dispose() {
            manipulateChart('dispose');
        }

        return {
            dispose
        }
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