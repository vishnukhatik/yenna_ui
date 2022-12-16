<template>
   <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',
  components: {
    apexchart: ApexCharts
  },
  data () {
    return {
      series: [{
        name: 'Leads',
        data: [55, 40, 10, 5]
      }],
      chartOptions: {
        legend: {
          show: true
        },
        chart: {
          toolbar: {
            show: false
          }
        },
        colors: ['#FFC30D'],
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          width: 2,
          dashArray: 0
        },
        grid: {
          show: true,
          row: {
            colors: ['transparent']
          },
          xaxis: {
            lines: {
              color: '#ffff',
              show: true
            }
          },
          yaxis: {
            lines: {
              color: '#ffff',
              show: false
            },
            labels: {
              minWidth: 40,
              color: '#ffff'
            }
          }
        },
        xaxis: {
          axisBorder: {
            show: true,
            color: '#fff'
          },
          categories: ['Feb', 'Mar', 'Apr', 'May']
        },
        yaxis: {
          showForNullSeries: true,
          showAlways: true,
          min: 0,
          max: 60,
          labels: {
            minWidth: 40,
            color: '#fff'
          },
          axisBorder: {
            show: true,
            color: '#fff'
          }
        }
      }
    }
  }
}
</script>
