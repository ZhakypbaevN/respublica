<template>
  <AnalyticsBlock
    title="Возраст пользователя"
  >
    <div class="pieChart" ref="chartdiv"></div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
import AnalyticsBlock from './analyticsBlock.vue'

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { onMounted } from 'vue';

onMounted(() => {
  const pieChart = document.querySelector('.pieChart');
  let root = am5.Root.new(pieChart);

  root._logo!.dispose();
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    layout: root.horizontalLayout
  }));

  var data = [
    {
      value: 25,
      category: "до 18 лет",
      fill: am5.color(0x0194EB)
    },
    {
      value: 18,
      category: "18-25 лет",
      fill: am5.color(0xFB8832)
    },
    {
      value: 42,
      category: "25-35 лет",
      fill: am5.color(0x944CEE)
    },
    {
      value: 11,
      category: "35-45 лет",
      fill: am5.color(0x55DCE7)
    },
    {
      value: 5,
      category: "Старше 45 лет",
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
      legendValueText: "  [medium #000]{valuePercentTotal.formatNumber('0.')}%"
    })
  );

  // Set up adapters for variable slice radius
  // series.slices.template.adapters.add("radius", function (radius, target) {
  //   var dataItem = target.dataItem;
  //   var high = series.getPrivate("valueHigh");

  //   if (dataItem) {
  //     var value = target.dataItem.get("valueWorking", 0);
  //     return radius * value / high
  //   }
  //   return radius;
  // });

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

//   series.slices.template.setAll({
//     strokeWidth: 3,
//     stroke: am5.color(0xffffff)
//   });

  return { root };
})
</script>

<style scoped lang="scss">
.pieChart {
  width: 100%;
  height: 320px;
}
</style>