<template>
  <div>
    <h4>{{ paramsId ? 'Edit Contect' :'Add Contect' }}</h4>
    <div class="overview_main_content_container">
      <div class="hotel_reg_conainer padding67" style="padding: 35px 0 60px!important;">
        <div class="reg_progressbar_container">
          <div class="progressbar_wrap">
            <div class="progress">
              <div class="progress-bar" :style="activeProgressBar"></div>
            </div>
          </div>
          <div class="progress_level_wrap">
            <div class="progress_level level_1 active">
              <div class="progress_bubble">1</div>
              <div class="progress_title">General</div>
            </div>
            <div class="progress_level level_4">
              <div class="progress_bubble">2</div>
              <div class="progress_title">Metadata</div>
            </div>
          </div>
        </div>

        <div :class="{'registration_form_container': true,'d-none': activeTab !== 1}">
          <h2>General</h2>
          <div class="reg_form_wrap">
            <div class="row">
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Title') }">Title*</p>
                      <div class="input_block form-group">
                        <input
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Title'),
                          }"
                          placeholder="Please Enter Title"
                          required
                          name="Title"
                           v-validate="'required|max:255'"
                          v-model="contentInfo.title"
                          :error-messages="errors.collect('Title')"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Title')"
                      >
                        {{ errors.first("Title") }}</span
                      >
                    </li>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Heading') }">Heading*</p>
                      <div class="input_block form-group">
                        <input
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Heading'),
                          }"
                          placeholder="Please Enter Heading"
                          required
                          name="Heading"
                          v-validate="'required|max:255'"
                          v-model="contentInfo.heading"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Heading')"
                      >
                        {{ errors.first("Heading") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('URL Slug') }">URL Slug (e.g about-us)*</p>
                      <div class="input_block form-group">
                        <input
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('URL Slug'),
                          }"
                          placeholder="Please Enter URL Slug"
                          required
                          name="URL Slug"
                          v-validate="'required|alpha_dash|max:25'"
                          v-model="contentInfo.content_type"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('URL Slug')"
                      >
                        {{ errors.first("URL Slug") }}</span
                      >
                    </li>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Display Page Under Section') }">Display Page Under Section*</p>
                      <div class="input_block form-group">
                        <select
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Display Page Under Section'),
                          }"
                          v-model="contentInfo.content_for"
                          required
                          v-validate="'required'"
                          name="Display Page Under Section"
                        >
                          <option
                            v-for="(item, inx) of pageUnderSection"
                            :key="inx"
                            :value="item.name"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Display Page Under Section')"
                      >
                        {{ errors.first("Display Page Under Section") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-12">
                <p  :class="{ 'text-danger': errors.first('Content') }">Content*</p>
                <div class="input_block form-group">
                  <vue-editor v-validate="'required'" name="Content" v-model="contentInfo.content" :editor="editor"
                  :config="editorConfig" type="balloon"></vue-editor>
                </div>
                <span
                  class="eb-error-input text-danger"
                  v-if="errors.first('Content')"
                >
                  {{ errors.first("Content") }}</span
                >
              </div>
            </div>
            <div class="reg_btn_wrap">
              <button
                type="button"
                @click="step1NextClick"
                :class="{ disabled: showLoader, 'btn btn_right': true }"
              >
                Submit
              </button>
              <b-spinner
                v-if="showLoader"
                style="position: relative; float: right; top: 20px"
                label="Spinning"
              ></b-spinner>
            </div>
          </div>
        </div>
        <div :class="{'registration_form_container': true,'d-none': activeTab !== 2}">
          <h2>Meta Data</h2>
          <div class="reg_form_wrap">
            <div class="row">
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Relevance') }">Relevance*</p>
                      <div class="input_block form-group">
                        <input
                          v-model="contentInfo.relevance"
                          v-validate="'required|min:6|max:50'"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Relevance'),
                          }"
                          placeholder="Please Enter Relevance"
                          required
                          name="Relevance"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Relevance')"
                      >
                        {{ errors.first("Relevance") }}</span
                      >
                    </li>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Meta Tags') }">Meta Tags*</p>
                      <div class="input_block form-group">
                        <input
                          v-model="contentInfo.meta_tags"
                          type="text"
                          v-validate="'required|min:3|max:20'"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Meta Tags'),
                          }"
                          placeholder="Please Enter Meta Tags"
                          required
                          name="Meta Tags"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Meta Tags')"
                      >
                        {{ errors.first("Meta Tags") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Description') }">Description*</p>
                      <div class="input_block form-group">
                        <input
                         v-validate="'required|min:6|max:40'"
                          v-model="contentInfo.description"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Description'),
                          }"
                          placeholder="Please Enter Description"
                          required
                          name="Description"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Description')"
                      >
                        {{ errors.first("Description") }}</span
                      >
                    </li>
                    <li class="mt-5 pl-3 pt-3">
                      <input type="checkbox" v-model="contentInfo.isPublished" class="form-check-input" id="content-Published">
                      <label class="form-check-label" for="content-Published">Published</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="reg_btn_wrap">
              <button
                @click="changeStep(1)"
                type="button"
                class="btn btn_left tog_lvl_back_3"
              >
                <i class="fas fa-chevron-left"></i>Back
              </button>
             <button
                type="button"
                @click="saveData"
                :class="{ disabled: showLoader, 'btn btn_right': true }"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { firstStepValidator, secondStepValidator, blackObj, pageUnderSection } from './config'
import { VueEditor } from 'vue2-editor'
import {
  ADMIN_BLOG_CREARTE,
  ADMIN_BLOG_UPDATE,
  ADMIN_BLOG_FETCH_BY_ID
} from '../../../services/ENDPOINT'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    VueEditor
  },
  data () {
    return {
      editor: {},
      editorConfig: {},
      activeTab: 1,
      showLoader: false,
      contentInfo: this._.cloneDeep(blackObj),
      firstStepValidator,
      secondStepValidator,
      pageUnderSection,
      paramsId: null,
      myHTML: ''
    }
  },
  computed: {
    activeProgressBar () {
      let style = ''
      if (this.activeTab === 1) style = 'width:0%'
      if (this.activeTab === 2) style = 'width:100%'
      return style
    }
  },
  mounted () {
    this.paramsId = this.$route.params.id
    if (this.paramsId) {
      this.getPage()
    }
  },
  methods: {
    pasteCapture (evt) {
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
    },
    async getPage () {
      try {
        this.$root.$loader(true)
        const result = await ADMIN_BLOG_FETCH_BY_ID(this.paramsId)
        this.contentInfo = result.blog[0] ? result.blog[0] : this._.cloneDeep(blackObj)
        console.log(result)
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    },
    step1NextClick () {
      this.$validator.validateAll(firstStepValidator).then((isValid) => {
        if (isValid) {
          this.activeTab = 2
        }
      })
    },
    saveData () {
      this.$validator.validateAll(secondStepValidator).then(async isValid => {
        if (isValid) {
          const payload = {
            content_type: this.contentInfo.content_type,
            content_for: this.contentInfo.content_for,
            title: this.contentInfo.title,
            content: this.contentInfo.content,
            heading: this.contentInfo.heading,
            abstract: this.contentInfo.abstract,
            meta_tags: this.contentInfo.meta_tags,
            description: this.contentInfo.description,
            isPublished: this.contentInfo.isPublished,
            relevance: this.contentInfo.relevance
          }
          if (this.paramsId) {
            try {
              payload._id = this.contentInfo._id
              this.$root.$loader(true)
              this.showLoader = true
              this.contentInfo._id = this.paramsId
              const result = await ADMIN_BLOG_UPDATE(payload)
              console.log(result)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'Blog Added Successfuly',
                type: 'success',
                duration: 7000
              })
              this.$router.push({ name: 'ADMIN_CONTACT' })
            } catch (err) {
              this.$notify({
                group: 'eb-notification',
                title: err.message.errors[0].kind ?? 'Oops',
                text: err.message.errors[0].message ?? 'Something Went Worng',
                type: 'error',
                duration: 5000
              })
            } finally {
              this.$root.$loader(false)
              this.showLoader = false
            }
          } else {
            try {
              this.$root.$loader(true)
              this.showLoader = true
              this.contentInfo.uuid = new Date().toISOString()
              const result = await ADMIN_BLOG_CREARTE(payload)
              console.log(result)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'Blog Added Successfuly',
                type: 'success',
                duration: 7000
              })
              this.$router.push({ name: 'ADMIN_CONTACT' })
            } catch (err) {
              this.$notify({
                group: 'eb-notification',
                title: err.message.errors[0].kind ?? 'Oops',
                text: err.message.errors[0].message ?? 'Something Went Worng',
                type: 'error',
                duration: 5000
              })
            } finally {
              this.$root.$loader(false)
              this.showLoader = false
            }
          }
        }
      })
    },
    changeStep (activeTab) {
      this.activeTab = activeTab
    }
  }
}
</script>
<style>
/* .editr--toolbar input,
.editr--toolbar div,
.editr--toolbar label,
.editr--toolbar button {
  color: black
}
.editr--toolbar input {
  width: 100%;
  border-color: black;
  border: solid;
  border-width: 2px;
  border-radius: 5px;
  background: #2c2c2c;
  color: white !important;
}
.ql-container{
  background: #fff;
}
.ql-editor p{
  color: black !important;
}
.ql-toolbar{
  background: #fff;
}
.ql-picker-label{
  color: black !important;
}
.ql-picker-item{
  color: black !important;
} */
</style>
