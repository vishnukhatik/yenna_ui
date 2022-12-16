export const chartOptions = {
  chart: {
    type: 'line',
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
export const fields = [
  {
    label: 'Hotel Name',
    key: 'propertyName',
    sortable: true
  },
  {
    label: 'Contact Person Name',
    key: 'contactPersonName',
    sortable: false
  },
  {
    label: 'Phone',
    key: 'contactPersonPhone',
    sortable: false
  },
  {
    label: 'Address',
    key: 'propertyAddress',
    sortable: false
  },
  {
    label: 'City',
    key: 'propertyCity',
    sortable: false
  },
  {
    label: 'Property Type',
    key: 'propertyType',
    sortable: false
  },
  {
    label: 'Star Rating',
    key: 'starRating',
    sortable: true
  },
  {
    label: 'Status',
    key: 'status',
    sortable: false
  },
  {
    label: 'Actions',
    key: 'actions',
    sortable: false
  }
]
