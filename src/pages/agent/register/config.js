export const propertyTypeArr = ['Hotel', 'Villa', 'Resort', 'Motel', 'Condo', 'Hostel', 'Guest House', ' Home Stay', 'Cottage']
export const starRatingArr = ['1', '2', '3', '4', '5', '6', '7']
export const addressProofTypeArr = ['Voter Card', 'Passport', 'Electricity Bill', 'Aadhar Card', 'Other']
export const amenitiesArr = ['WIFI', 'Parking', '24Hr Reseption', '24Hr Doctor', 'Room Service', 'Valet Parking', 'Airpot Pickup/Drop', 'Safe', 'Bath Tub', 'Swimming Pool', 'Gym', 'Restaurent']
export const roomAmenitiesArr = ['AC', 'TV', 'Free Breakfast', '2 Course Meal', '3 Course Meal', 'Ironer', 'Bath Tub', 'Electronic Safe', 'Electric Kettle', '24Hr Room Service']
export const bedTypeArr = ['Single', 'Double', 'Triple', 'King', 'Queen']
export const measureTypeArr = ['Sq ft', 'Sq yd', 'Sq inch']
export const inclusionsArr = ['Breakfast', 'Breakfast Buffet', 'Two Course Meal', 'Three Course Meal', 'None']
// export const cancellationPolicyArr = ['Cancellation allowed upto one week', 'Cancellation allowed upto two weeks', 'Cancellation allowed upto three weeks', 'No Cancellation']
export const roomTypeArr = ['Single', 'Double', 'King', 'Twin Room', 'Luxury, Deluxe', 'Super Deluxe', 'Lake Front', 'Mountain View', 'Beach Front', 'Suite, Presidential Suite', 'Executive Suite', 'Village View', 'Farm View', 'Forest View']
export const contactPersonRoleArr = ['Owner', 'Manager', 'Staff']
export const policyDuration = ['6 Hr', '12 Hr', '1 Day', '2 Days', '1 Week', '2 Weeks', '15 Days', 'Others']
export const currencyArr = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYI', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XFU', 'XOF', 'XPD', 'XPF', 'XPT', 'XTS', 'XXX', 'YER', 'ZAR', 'ZMW']
export const cancellationPolicyObj = {
  charges: '',
  duration: '',
  label: ''
}
export const propertyRooms = {
  roomType: 'Single',
  bedType: 'Triple',
  roomSize: '',
  measureType: 'Sq ft',
  price: '',

  numberOfBeds: '3',
  cancelPolicy: '0',
  cancelPolicyDetails: '',
  inclusions: 'Breakfast',
  roomDescription: '',
  roomAmentiies: ['Free Breakfast'],

  categoryType: 'Luxury',
  currency: 'INR',
  totalRoom: '',
  typeOfMeal: '',
  imageFiles: [],
  policys: []
}

export const languageArr = [
  'Hindi', 'English', 'Gujarati', 'Assamese', 'Bengali',
  'Bodo', 'Dogri', 'Kannada', 'Kashmiri', 'Konkani',
  'Maithili', 'Malayalam', 'Meitei', 'Marathi', 'Nepali', 'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Urdu'
]

export const hotalModel = {
  // step 1
  propertyId: new Date().valueOf(),
  checkInTime: '2:00 PM',
  checkOutTime: '11:00 PM',
  hotelStartingPrice: '',
  commercialId: '',
  password: '',
  status: 'New',
  isInvestor: true,
  contactPersonName: '',
  contactPersonPhone: '',
  contactPersonEmail: '',
  contactPersonRole: 'Owner',
  language: ['Hindi', 'English', 'Gujarati'],
  propertyType: 'Hotel',
  propertyName: '',
  noOfRooms: '',
  website: '',
  location: '',
  locationId: { lat: 18.3850, lng: 78.4867 },
  cityInfo: null,
  propertyCountry: '',
  propertyPostalCode: '',
  propertyAddress: '',
  propertyCity: '',
  starRating: '3',
  bookingEmail: '',
  bookingPhone: '',
  propertyState: '',
  Landline: '',
  hotelDescription: '',
  hotelStatus: 'enabled',
  taxInfo: 'GST',
  referralBonus: '',
  offers: '',
  refundability: '',
  others: '',
  accountDetails: {
    bankAccountOwner: '',
    bankAccountNumber: '',
    currency: 'INR',
    bankName: '',
    IFSCNumber: ''
  },
  commercialDetails: {
    gstNumber: '',
    panNumber: '',
    panHolderName: '',
    addressProof: 'Aadhar Card'
  },
  investmentDetails: {
    investmentAmount: '',
    investmentCurrency: '',
    investmentDate: ''
  },
  assetDetails: {
    isYrAsset: true,
    assetValue: 'string',
    contractDetails: 'string',
    timeline: 'string'
  },
  attachments: {
    officailDocs: [],
    images: [],
    videos: []
  },
  // step 2
  hotelAmenities: ['WIFI', 'Parking'],
  policies: '',
  questionAndAnswers: '',
  // step 3
  propertyRooms: []
  // step 4
}

export const hoursArr = [
  '12:00 AM', '12:30 AM',
  '1:00 AM', '1:30 AM',
  '2:00 AM', '2:30 AM',
  '3:00 AM', '3:30 AM',
  '4:00 AM', '4:30 AM',
  '5:00 AM', '5:30 AM',
  '6:00 AM', '6:30 AM',
  '7:00 AM', '7:30 AM',
  '8:00 AM', '8:30 AM',
  '9:00 AM', '9:30 AM',
  '10:00 AM', '10:10 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
  '10:00 PM', '10:30 PM',
  '11:00 PM', '11:30 PM']
export const firstStepValidator = [
  'Contact Person Role', 'Hotel Address', 'Property Type', 'City', 'State', 'Star Rating', 'Country', 'Postal Code', 'Booking Email',
  'Booking Phone', 'Landline', 'Number of Rooms', 'Website URL', 'Hotel Description', 'Upload Hotel Images'
]

export const secondStepValidator = [
  'GST Number', 'PAN Number', 'Address Proof Type', 'PAN Holder Name', 'Address Proof Scan Copy', 'PAN Card Scan Copy', 'Select Hotel Amenities', 'Policies', 'Hotel Amenities'
]

export const thirdStepValidator = [
  'Account Holder Name', 'Bank Account Number', 'Bank Name', 'IFSC Number'
]

export const hotelRoomValidator = [
  'Room Type', 'Bed Type', 'Room Size', 'Hotel Description', 'Measure Type', 'Price per Night', 'Max Number of Guests', 'Number of same rooms', 'Select Cancellation Policy',
  'Inclusions', 'Select Room Amenities', 'Cancellation Policy Details', 'Room Description', 'Upload Room Images', 'Charges', 'Duration', 'Default Cancellation Charges'
]
