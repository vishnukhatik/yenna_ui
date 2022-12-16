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
    label: '#',
    key: 'bookingId',
    sortable: true
  },
  {
    label: 'Customer Name',
    key: 'userName',
    sortable: false
  },
  {
    label: 'Hotel Name',
    key: 'propertyName',
    sortable: false
  },
  // {
  //   label: 'Email',
  //   key: 'email',
  //   sortable: true
  // },
  {
    label: 'Phone',
    key: 'phone',
    sortable: false
  },
  {
    label: 'Price',
    key: 'transactionAmount',
    sortable: false
  },
  {
    label: 'Booking Start Date',
    key: 'bookingStartDate',
    sortable: false
  },
  {
    label: 'Booking End Date',
    key: 'bookingEndDate',
    sortable: false
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
