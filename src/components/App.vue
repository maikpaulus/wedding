<template>
    <div id="app" v-bind:class="page">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        created () {
            this.checkForGroup();
        },

        beforeUpdate() {
            this.$data.page = this.$store.getters.get('route');
        },

        data() {
            return {
                page: this.$store.getters.get('route')
            }
        },

        methods: {
            checkForGroup () {
                if (window.hasOwnProperty('localStorage') && window.localStorage.getItem('wedding-page')) {
                    let group = JSON.parse(window.localStorage.getItem('wedding-page'));
                    this.$store.dispatch('addGroup', group);   
                }
            }
        }
    }
</script>

<style>
    .cmp-page {
        background-color: #2d2c86;
        width: 100%;
        height: 100%;
        position: absolute;
        color: #f2ede7;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .cmp-page h1 {
        font-size: 1.5em;
    }
</style>