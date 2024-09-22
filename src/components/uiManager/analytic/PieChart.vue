<template>
  <AnalyticsBlock
    :title="$t('analytics.users-age')"
  >
    <div class="pieChart" ref="chartdiv"></div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
import AnalyticsBlock from '@/components/uiManager/analytic/AnalyticsBlock.vue'

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

import { IAnalyticsAgeDemographics } from '@/types/analytics';
import { getAgeDemographics } from '@/actions/uiManager/analytics';

const { t } = useI18n()

const ageData = ref<IAnalyticsAgeDemographics>();

onMounted(async () => {
  const response = await getAgeDemographics();
  
  if (response) {
    ageData.value = response.data;

    const pieChart : any = document.querySelector('.pieChart');
    let root = am5.Root.new(pieChart);
  
    root._logo!.dispose();
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
  
    // Create chart
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      layout: root.horizontalLayout,
    }));
  
    var data = [
      {
        value: ageData.value.under_18,
        category: t('analytics.under_18'),
        fill: am5.color(0x0194EB)
      },
      {
        value: ageData.value.age_18_25,
        category: t('analytics.age_18_25'),
        fill: am5.color(0xFB8832)
      },
      {
        value: ageData.value.age_26_35,
        category: t('analytics.age_26_35'),
        fill: am5.color(0x944CEE)
      },
      {
        value: ageData.value.age_36_45,
        category: t('analytics.age_36_45'),
        fill: am5.color(0x55DCE7)
      },
      {
        value: ageData.value.over_45,
        category: t('analytics.over_45'),
        fill: am5.color(0x05AB48)
      },
    ];
  
    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "category",
        fillField: "fill",
        legendLabelText: "[#818FA7]{category}[/]",
        legendValueText: "[medium #000]{value}[/] [medium #c1c6ce]({valuePercentTotal.formatNumber('0.')}%)[/]"
      })
    );
  
    // Set up adapters for variable slice radius
    series.data.setAll(data);
    series.labels.template.set("forceHidden", true);
    series.ticks.template.set("forceHidden", true);

    // Custom Tooltip
    let tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      getStrokeFromSprite: true,
      autoTextColor: false,
      getLabelFillFromSprite: true,
      labelText: "[bold #000]{value.format('0')}"
    });
  
    tooltip.get("background").setAll({
      fill: am5.color(0xffffff),
      fillOpacity: 1,
    });
  
    series.set("tooltip", tooltip);
  
    // Add legend
    var legend = chart.children.push( 
      am5.Legend.new(root, {
        maxWidth: 300,
        minWidth: 260,
        centerY: am5.percent(50),
        y: am5.percent(50),
        layout: am5.GridLayout.new(root, {
          maxColumns: 1,
          fixedWidthGrid: true
        })
      })
    );
  
    legend.labels.template.setAll({
      paddingBottom: 6,
      paddingLeft: 20,
      paddingTop: 6,
    });
  
    legend.markers.template.setAll({
      width: 10,
      height: 10,
    });
  
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10
    });
  
    legend.data.setAll(series.dataItems);
  
    return { root };
  }
})
</script>

<style scoped lang="scss">
.pieChart {
  width: 100%;
  height: 320px;
}
</style>