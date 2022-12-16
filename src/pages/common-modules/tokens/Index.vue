<template>
  <div>
      <div class="content_view_wrap">
        <h1>Tokens</h1>
        <div class="overview_main_content_container">
          <div class="tokentype_info_container">
            <h3>Security Tokens</h3>
            <div class="tokentype_details_wrap">
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
              <div class="token_amount_wrap">
                <div class="token_amount">
                  <strong>Available Tokens:</strong> 10 <span>YO</span>
                </div>
                <div class="token_add_btn">
                  <button class="btn token_btn">Add Tokens</button>
                </div>
              </div>
            </div>
          </div>

          <div class="tokentype_info_container">
            <h3>Investment Tokens</h3>
            <div class="tokentype_details_wrap">
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
              <div class="token_amount_wrap">
                <div class="token_amount">
                  <strong>Available Tokens:</strong> 32 <span>YO</span>
                </div>
                <div class="token_add_btn">
                  <button class="btn token_btn">Add Tokens</button>
                </div>
              </div>
            </div>
          </div>

          <div class="tokentype_info_container">
            <h3>Transaction Tokens</h3>
            <div class="tokentype_details_wrap">
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
              <div class="token_amount_wrap">
                <div class="token_amount">
                  <strong>Available Tokens:</strong> 1872 <span>YO</span>
                </div>
                <div class="token_add_btn">
                  <button class="btn token_btn mr-2">Add Tokens</button>
                  <button class="btn token_btn">Transfer Tokens</button>
                  <button class="btn token_btn ml-2">Redeem Tokens</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="overview_main_content_container">
          <div class="overview_main_table_container">
            <div class="table_search_form_container">
              <form>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form_input_wrap">
                      <h4>Search by Hotel</h4>
                      <div class="form-group">
                        <input type="text" class="form-control"
                               placeholder="Type Hotel Name or City">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form_input_wrap">
                      <h4>Select Country</h4>
                      <div class="input_block">
                        <select name="" id="" class="form-control">
                          <option value="0">All Country</option>
                          <option value="1">India</option>
                          <option value="2">US</option>
                          <option value="3">Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="main_table_wrap">
              <table class="table table-responsive">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Type</th>
                  <th>Name</th>
                  <th>Transaction Date</th>
                  <th>Amount</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>01</td>
                  <td>Property Booking</td>
                  <td>Andros</td>
                  <td>16-1-2021</td>
                  <td>126 YO</td>
                  <td>Approved</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>Property Booking</td>
                  <td>Parekhar</td>
                  <td>29-11-2020</td>
                  <td>98 YO</td>
                  <td>Pending</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>Bought Investment Tokens</td>
                  <td>John Doe</td>
                  <td>29-11-2020</td>
                  <td>50 YO</td>
                  <td>Approved</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>Bought Security Tokens</td>
                  <td>Anok</td>
                  <td>29-11-2020</td>
                  <td>5 YO</td>
                  <td>Approved</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>05</td>
                  <td>Property Booking</td>
                  <td>Carter</td>
                  <td>29-11-2020</td>
                  <td>78 YO</td>
                  <td>Pending</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06</td>
                  <td>Transfer Transaction Tokens</td>
                  <td>Malena</td>
                  <td>29-11-2020</td>
                  <td>45 YO</td>
                  <td>Approved</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>07</td>
                  <td>Redeem Transaction Tokens</td>
                  <td>John Doe</td>
                  <td>29-11-2020</td>
                  <td>35 YO</td>
                  <td>Approved</td>
                  <td>
                    <div class="dash_view_btn">
                      <a class="btn btn-primary">View</a>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  name: 'MyToken'
}
</script>

<style scoped>

</style>
