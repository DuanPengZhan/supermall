<template>
    <div>
        <detail-nav-bar></detail-nav-bar>
        {{iid}}
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
    export default {
        name: 'Detail',
        data() {
            return {
                iid: null
            }
        },
        components:{
            DetailNavBar
        },
        created() {
            this.iid = this.$route.params.iid
        },
    }
</script>

<style lang="scss" scoped>

</style>