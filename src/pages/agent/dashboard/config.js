export const chartOptions = {
  chart: {
    type: 'bar',
    height: 262,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  stroke: {
    curve: 'smooth'
  },
  series: [{
    name: 'Completed',
    data: [35580, 43400, 32623, 36718, 21901, 41125]
  },
  {
    name: 'Pending',
    data: [12960, 14209, 23260, 16290, 15100, 23054]
  }],
  colors: ['#3fca97', '#C24D00'],
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    floating: true
  },
  xaxis: {
    categories: ['Feb', 'March', 'April', 'May', 'June', 'July']
  }
}
