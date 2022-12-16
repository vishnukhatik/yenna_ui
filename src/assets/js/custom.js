$(Document).ready(function () {
  $('.map_pointer').click(function () {
    var sel_id = $(this).attr('id')
    $('.map_info_wrap').hide()
    $('#' + sel_id + ' .map_info_wrap').show()
  })

  // $( "#from_date" ).datepicker('option', $.datepicker.regional['de']);
  $('.datepicker').datepicker({ format: 'dd.mm.yyyy' })
  $('#reservationDate').datepicker({ format: 'dd.mm.yyyy' })

  $('.guests_toggle').click(function () {
    $('.numbr_guests').toggle()
  })

  $('.activity_wrap').click(function () {
    $(this).toggleClass('selected')
  })

  // -------- Modal script ---------
  $('.user_signin_togl').click(function () {
    $('.modal_container').fadeOut()
    $('#sign_in_form').fadeIn()
  })
  $('.user_signup_togl').click(function () {
    $('.modal_container').fadeOut()
    $('#user_reg_form').fadeIn()
  })
  $('.hotel_signup_togl').click(function () {
    $('.modal_container').fadeOut()
    $('#hotel_reg_form').fadeIn()
  })
  $('.modal_overlay, .modal_close').click(function () {
    $('.modal_container').fadeOut()
  })
})

function updateGuests () {
  var adult_number = Number(document.getElementById('num_adults').value)
  var child_number = Number(document.getElementById('num_children').value)
  var infant_number = Number(document.getElementById('num_infants').value)

  var total_guests = adult_number + child_number + infant_number

  $('#total_guests').val(total_guests)
}

$('.add_one').click(function () {
  var current_id = $(this).parent().attr('id')
  var before_val = Number($('#' + current_id + ' input').val())
  if (current_id == 'adult_counter') {
    if (before_val >= 1) {
      $('#' + current_id + ' input').val(before_val + 1)
    }
  } else {
    if (before_val >= 0) {
      $('#' + current_id + ' input').val(before_val + 1)
    }
  }

  updateGuests()
})
$('.negate_one').click(function () {
  var current_id = $(this).parent().attr('id')
  var before_val = Number($('#' + current_id + ' input').val())
  if (current_id == 'adult_counter') {
    if (before_val > 1) {
      $('#' + current_id + ' input').val(before_val - 1)
    } else {
      $('#' + current_id + ' input').val(1)
    }
  } else {
    if (before_val > 0) {
      $('#' + current_id + ' input').val(before_val - 1)
    } else {
      $('#' + current_id + ' input').val(0)
    }
  }
  updateGuests()
})

$('.tour_checkbox_sel').click(function () {
  var current_id = $(this).parent().attr('id')
  $('#' + current_id + ' .tour_checkbox_sel').toggleClass('selected')
  var checkBoxes = $('#' + current_id + ' input')
  checkBoxes.prop('checked', !checkBoxes.prop('checked'))
})

$('.s_price_range').ionRangeSlider({
  type: 'double',
  grid: false,
  min: 1000,
  max: 25000,
  from: 5000,
  to: 20000,
  prefix: 'Rs ',
  min_interval: null,
  max_interval: null
})
$('.s_ratings_range').ionRangeSlider({
  type: 'double',
  grid: false,
  min: 0,
  max: 5,
  from: 3,
  to: 4,
  min_interval: null,
  max_interval: null
})
