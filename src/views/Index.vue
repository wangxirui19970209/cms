<template>
  <div>
    <top-header></top-header>
    <router-view v-if="isValidPath" />
    <template v-else><introduction/></template>
  </div>
</template>

<script>
  import topHeader from '../components/topHeader'
  import introduction from './introduction'

  export default {
    computed: {
      isValidPath () {
        const res = this.$route.path.match(/\/(?!$)/g)
        return Array.isArray(res) && res.length >= 0
      }
    },
    components: {
      introduction,
      topHeader
    }
  }
</script>