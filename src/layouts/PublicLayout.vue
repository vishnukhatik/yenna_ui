<template>
  <div>
    <div class="world_wrap">
      <Header/>
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from 'components/public/PublicHeader'
import Footer from 'components/public/PublicFooter'
export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  }
}
</script>
