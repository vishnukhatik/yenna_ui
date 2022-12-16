<template>
  <div class="main_container">
    <div class="main_bg" id="search_results"></div>
    <section class="search_bar">
      <div class="search_bar_container">
        <div class="main_search">
          <div class="current_tour">
            <input type="text" value="Indonesia" />
          </div>
          <div class="selected_date">
            <div class="picked_date">
              <input
                type="text"
                placeholder="From"
                class=""
                id="reservationDate"
              />
            </div>
          </div>
          <div class="tour_days">
            <input type="number" value="4" />
          </div>
          <div class="tour_guests">
            <div class="tour_bg">
              <span class="fas fa-chevron-down"></span>
              <input type="number" id="total_guests" value="1" />
              <div class="guests_toggle"></div>
            </div>
            <div class="numbr_guests">
              <ul>
                <li>
                  <label>Adults</label>
                  <div class="field_box" id="adult_counter">
                    <i class="fas fa-minus-square negate_one"></i>
                    <input
                      type="number"
                      id="num_adults"
                      onchange="updateGuests()"
                      min="1"
                      value="1"
                    />
                    <i class="fas fa-plus-square add_one"></i>
                  </div>
                </li>
                <li>
                  <label>Children to 12 years</label>
                  <div class="field_box" id="child_counter">
                    <i class="fas fa-minus-square negate_one"></i>
                    <input
                      type="number"
                      id="num_children"
                      onchange="updateGuests()"
                      min="0"
                      value="0"
                    />
                    <i class="fas fa-plus-square add_one"></i>
                  </div>
                </li>
                <li>
                  <label>Infants to 2 years</label>
                  <div class="field_box" id="infant_counter">
                    <i class="fas fa-minus-square negate_one"></i>
                    <input
                      type="number"
                      id="num_infants"
                      onchange="updateGuests()"
                      min="0"
                      value="0"
                    />
                    <i class="fas fa-plus-square add_one"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="submit_query">
            <input type="submit" value="Search" />
          </div>
        </div>
      </div>
    </section>

    <section class="activity_list">
      <div class="activities_container">
        <h2>Select your tour activities</h2>
        <div class="row">
          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                  id="hotel_imgItaly"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Kiyaking</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                  id="hotel_imgMongkok"
                ></div>
                <span class="fas fa-check"></span>
                <h3>City Tour</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                  id="hotel_imgItaly"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Hiking</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                  id="hotel_imgMongkok"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Balloon Ride</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                   id="hotel_imgSantorini"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Boating</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                   id="hotel_imgHongKong"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Museum</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                   id="hotel_imgDelhi"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Gliding</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 mt-5 pb-5">
            <div class="activity_wrap">
              <div class="activity_select">
                <div
                  class="acivity_img"
                  id="hotel_imgShanghai"
                ></div>
                <span class="fas fa-check"></span>
                <h3>Trekking</h3>
              </div>
              <div class="activity_info">
                <div class="activity_time">
                  <p>
                    <b>Time</b><br />
                    3Hrs - 5Hrs
                  </p>
                </div>
                <div class="activity_desc">
                  <p>
                    <b>Description</b><br />
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla egestas neque in
                    venenatis posuere. Proin quis volutpat sem, ac cursus neque.
                    Maecenas suscipit ante quis nulla egestas varius. Donec
                    porttitor ac est sit amet faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
