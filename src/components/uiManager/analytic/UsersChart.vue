<template>
  <AnalyticsBlock :title="$t('page.users')">
    <template v-slot:actions>
      <div class="periodControls">
        <Button
          :name="$t('button.the-whole-period')"
          class="periodControls-btn"
          :type="!showPeriodFilter ? 'default' : 'default-grey'"
          @click="() => showPeriodFilter = false"
        />
        <Button
          :name="$t('button.period')"
          class="periodControls-btn"
          :type="showPeriodFilter ? 'default' : 'default-grey'"
          @click="() => showPeriodFilter = true"
        />
      </div>
    </template>

      <Transition>
        <div
          v-if="showPeriodFilter"
          v-collapse
        >
          <div class="usersChart-filter">
            <div class="usersChart-filter-period">
              <Input
                type="date"
                placeholder="От"
              />
              <Input
                type="date"
                placeholder="До"
              />
            </div>
          </div>
        </div>
      </Transition>
      
      <div class="usersChart" ref="chartdiv"></div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
import AnalyticsBlock from '@/components/uiManager/analytic/AnalyticsBlock.vue'

import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { IAnalyticsMonthlyStats } from '@/types/analytics';
import { getMonthlyStatsList } from '@/actions/uiManager/analytics';

const { t } = useI18n()

const monthlyData = ref<IAnalyticsMonthlyStats[]>();
const showPeriodFilter = ref(false)

onMounted(async () => {
  const response = await getMonthlyStatsList(null);
  
  if (response) {
    monthlyData.value = response;

    const usersChart: any = document.querySelector('.usersChart');
    let root = am5.Root.new(usersChart);
  
    root._logo!.dispose();
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
  
    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        paddingTop: 80,
      })
    );
  
    // Define data
    let data = [];

    monthlyData.value.forEach((month) => {
      data.push({
        category: month.month,
        value1: month.registered_users,
        value2: month.joined_memberships,
        value3: month.approved_resignations,
        titleColor: am5.color(0x818FA7),
        tooltipColor: am5.color(0x000)
      })
    })
  
    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
  
    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category",
      })
    );
    xAxis.data.setAll(data);
  
    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: t('analytics.registered'),
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category",
        fill: am5.color(0x0FBC40),
        tooltip: am5.Tooltip.new(root, {
          getFillFromSprite: false,
          getStrokeFromSprite: true,
          autoTextColor: false,
          getLabelFillFromSprite: true,
          labelText: "[bold #000]{value1.format('0')}"
        }),
        legendLabelText: "[#818FA7]{name}[/]\n [bold #000]{valueY}[/]",
        legendRangeLabelText: "[#818FA7]{name}[/]",
      })
    );
    series1.data.setAll(data);
  
    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: t('analytics.joined-the-party'),
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category",
        fill: am5.color(0x4A78EC),
        tooltip: am5.Tooltip.new(root, {
          getFillFromSprite: false,
          getStrokeFromSprite: true,
          autoTextColor: false,
          getLabelFillFromSprite: true,
          labelText: "[bold #000]{value2.format('0')}"
        }),
        legendLabelText: "[#818FA7]{name}[/]\n [bold #000]{valueY}[/]",
        legendRangeLabelText: "[#818FA7]{name}[/]",
      })
    );
    series2.data.setAll(data);
  
    let series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: t('analytics.they-left-the-parties'),
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value3",
        categoryXField: "category",
        fill: am5.color(0xFF0036),
        tooltip: am5.Tooltip.new(root, {
          getFillFromSprite: false,
          getStrokeFromSprite: true,
          autoTextColor: false,
          getLabelFillFromSprite: true,
          labelText: "[bold #000]{value3.format('0')}"
        }),
        legendLabelText: "[#818FA7]{name}[/]\n [bold #000]{valueY}[/]",
        legendRangeLabelText: "[#818FA7]{name}[/]",
      })
    );
    series3.data.setAll(data);
  
  
    // Add legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        y: 0,
        x: 0,
        layout: am5.GridLayout.new(root, {
          maxColumns: 3,
          fixedWidthGrid: true
        })
      })
    );
  
    legend.labels.template.setAll({
      paddingBottom: 6,
      paddingLeft: 8,
      lineHeight: 1.6,
      fontSize: 14,
      maxWidth: 100
    });
  
    legend.markers.template.setAll({
      width: 12,
      height: 12,
    });
  
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10
    });
  
    legend.data.setAll(chart.series.values);
  
    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
  
    return { root };
  }
})
</script>

<style scoped lang="scss">
  .usersChart {
    width: 100%;
    height: 400px;

    &-filter {
      padding-bottom: 20px;

      &-period {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }
    }
  }

  .periodControls {
    display: flex;
    grid-gap: 14px;

    &-btn {
      padding: 4px 20px;
      border-radius: 3px;
    }
  }
</style>
<style >
  .periodControls-btn span {
    font-weight: 400 !important;
    font-size: 16px !important;
  }
</style>