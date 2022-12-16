export const fields = [
  {
    label: 'Display Page Under Section',
    key: 'content_for',
    sortable: false
  },
  {
    label: 'URL Slug',
    key: 'content_type',
    sortable: false
  },
  {
    label: 'Heading',
    key: 'heading',
    sortable: false
  },
  {
    label: 'Title',
    key: 'title',
    sortable: false
  },
  {
    label: 'Meta Tag',
    key: 'meta_tags[0]',
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
  'Description', 'Meta Tags'
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
