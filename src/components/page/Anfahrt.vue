<template>
    <div class="cmp-page anfahrt">
        <header-bar></header-bar>
        <main>
            <h1>Anfahrt</h1>
        </main>
    </div>
</template>

<script>
    import HeaderBar from './components/elements/HeaderBar';

    export default {
        data() {
            return {
                authenticated: !!this.$store.getters.get('group')
            }
        },

        components: {
            HeaderBar
        }
    }
</script>

<style>
    .cmp-page.anfahrt h3 {
        margin: 1.75em 0 0.5em 0 !important;
        width: 100%;
    }

    .google-maps {
        width: 100%;
        height: 15em !important;
        border: 0;
    }

    @media (min-width: 601px) {
        .md-flex-small-100 {
            min-width: 100%;
            -ms-flex: 0 1 100%;
            flex: 0 1 100%;
        }
    }

    @media (min-width: 769px) {
        .md-flex-medium-50 {
            min-width: 50%;
            -ms-flex: 0 1 50%;
            flex: 0 1 50%;
            padding: 0 1em;
        }
    }

    @media (min-width: 1281px) {
        .md-flex-large-33 {
            min-width: 33.33333%;
            -ms-flex: 0 1 33.33333%;
            flex: 0 1 33.33333%;
        }
    }

</style>
