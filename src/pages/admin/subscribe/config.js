export const fields = [
  {
    label: 'Email',
    key: 'emailId',
    sortable: false
  },
  {
    label: 'Create At',
    key: 'createdAt',
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
export const firstStepValidator = ['Title', 'Heading', 'Display Page Under Section', 'URL Slug', 'Content']

export const secondStepValidator = [
  'GST Number', 'PAN Number', 'Address Proof Type', 'PAN Holder Name', 'Address Proof Scan Copy', 'PAN Card Scan Copy', 'Select Hotel Amenities', 'Policies'
]
export const blackObj = {
  uuid: '',
  content_type: '',
  content_for: 'Content Page',
  title: '',
  content: '',
  heading: '',
  abstract: '',
  meta_tags: [],
  description: '',
  isPublished: true,
  relevance: ''
}

export const pageUnderSection = [
  { name: 'Company', id: 1 },
  { name: 'Support', id: 2 },
  { name: 'Content Page', id: 3 },
  { name: 'Setting', id: 4 }
]

export const toolbar = []

export const fonts = {
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}
