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
export const fields = [
  {
    label: '#',
    key: 'bookingId',
    sortable: true
  },
  {
    label: 'Customer Name',
    key: 'location',
    sortable: false
  },
  {
    label: 'Email',
    key: 'contactPersonName',
    sortable: true
  },
  {
    label: 'Phone',
    key: 'noOfRooms',
    sortable: false
  },
  {
    label: 'Destination',
    key: 'bookingPhone',
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

export const optionsBar = {
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
  colors: ['#3fca97', '#C12727'],
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
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const userField = [
  {
    label: 'Full Name',
    key: 'name',
    sortable: false
  },
  {
    label: 'Email',
    key: 'email',
    sortable: false
  },
  {
    label: 'Phone',
    key: 'phone',
    sortable: false
  }
]
export const hotelFields = [
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
    label: 'Contact Person Phone',
    key: 'contactPersonPhone',
    sortable: false
  },
  {
    label: 'Address',
    key: 'propertyAddress',
    sortable: false
  }
]
