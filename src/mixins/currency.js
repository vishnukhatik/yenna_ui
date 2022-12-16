
export default {
  methods: {
    priceInWords (price) {
      var sglDigit = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'],
        dblDigit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'],
        tensPlace = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'],
        // eslint-disable-next-line camelcase
        handle_tens = function (dgt, prevDgt) {
          // eslint-disable-next-line eqeqeq
          return dgt == 0 ? '' : ' ' + (dgt == 1 ? dblDigit[prevDgt] : tensPlace[dgt])
        },
        // eslint-disable-next-line camelcase
        handle_utlc = function (dgt, nxtDgt, denom) {
          // eslint-disable-next-line eqeqeq
          return (dgt != 0 && nxtDgt != 1 ? ' ' + sglDigit[dgt] : '') + (nxtDgt != 0 || dgt > 0 ? ' ' + denom : '')
        }

      var str = '',
        digitIdx = 0,
        digit = 0,
        nxtDigit = 0,
        words = []
      // eslint-disable-next-line no-sequences
      if (price += '', isNaN(parseInt(price))) str = ''
      else if (parseInt(price) > 0 && price.length <= 10) {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) {
          // eslint-disable-next-line no-sequences
          switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
            case 0:
              words.push(handle_utlc(digit, nxtDigit, ''))
              break
            case 1:
              words.push(handle_tens(digit, price[digitIdx + 1]))
              break
            case 2:
              // eslint-disable-next-line eqeqeq
              words.push(digit !== 0 ? ' ' + sglDigit[digit] + ' Hundred' + (price[digitIdx + 1] != 0 && price[digitIdx + 2] != 0 ? ' and' : '') : '')
              break
            case 3:
              words.push(handle_utlc(digit, nxtDigit, 'Thousand'))
              break
            case 4:
              words.push(handle_tens(digit, price[digitIdx + 1]))
              break
            case 5:
              words.push(handle_utlc(digit, nxtDigit, 'Lakh'))
              break
            case 6:
              words.push(handle_tens(digit, price[digitIdx + 1]))
              break
            case 7:
              words.push(handle_utlc(digit, nxtDigit, 'Crore'))
              break
            case 8:
              words.push(handle_tens(digit, price[digitIdx + 1]))
              break
            case 9:
              // eslint-disable-next-line eqeqeq
              words.push(digit != 0 ? ' ' + sglDigit[digit] + ' Hundred' + (price[digitIdx + 1] != 0 || price[digitIdx + 2] != 0 ? ' and' : ' Crore') : '')
          }
        }
        str = words.reverse().join('')
      } else str = ''
      return str
    },
    currency (money, currency) {
      return (Number(money)).toLocaleString('en', { style: 'currency', currency: currency || 'INR', minimumFractionDigits: 0 })
    },
    IsJsonString (str) {
      try {
        JSON.parse(str)
      } catch {
        return false
      }
      return true
    }
  }
}
