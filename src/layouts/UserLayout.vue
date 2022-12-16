<template>
<div>
  <div class="worldWrap">
    <user-header @toggle-sidebar="sidebarToggle =! sidebarToggle"/>
    <div class="main_content_container" style="background-color: #111111">
      <user-sideBar v-show="sidebarToggle" />
      <div class="content_view_container container-fluid" id="content_view_container">
        <router-view />
      </div>
    </div>
  </div>
  <user-footer/>
</div>
</template>
<script>
import UserHeader from 'components/user/UserHeader'
import UserSideBar from 'components/user/UserSideBar'
import UserFooter from 'components/user/UserFooter'

export default {
  name: 'AdminLayout',
  components: { UserHeader, UserSideBar, UserFooter },
  data () {
    return {
      sidebarToggle: false
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.sidebarToggle = false
        var contentViewFalse = document.getElementById('content_view_container')
        contentViewFalse.removeAttribute('style', '')
      } else {
        this.sidebarToggle = true
        var contentViewTrue = document.getElementById('content_view_container')
        contentViewTrue.setAttribute('style', 'padding-left: 300px !important;')
      }
    }
  }
}
</script>
<style scoped>
.fade-enter-active {
  transition: opacity 0.7s ease;
}
.fade-leave-active .fade-leave-active  {
  opacity: 0;
  transition: opacity 0.7s;
}
</style>
