<template>
    <div class="cmp-page anmeldung" v-if="authenticated">
        <header-bar></header-bar>
        <main>
            <h1>Anmeldung zur Hochzeit</h1>    
            <Register></Register>
        </main>
    </div>
</template>

<script>
    import Register from './components/form/Register';
    import HeaderBar from './components/elements/HeaderBar';

    export default {
        beforeCreate () {
            let viewportVal = 'width=device-width, initial-scale=1.0, user-scalable=no';
            document.querySelector("meta[name=viewport]").setAttribute('content', viewportVal);
            window.scrollTo(0,0);

            if (null === this.$store.getters.get('group')) {
                return this.$store.dispatch('changePage', 'authenticate');
            }

            if ('anmeldung' !== this.$store.getters.get('route')) {
                return this.$store.dispatch('changePage', 'anmeldung');
            }
        },

        data() {
            return {
                authenticated: !!this.$store.getters.get('group')
            }
        },

        components: {
            Register,
            HeaderBar
        }
    }
</script>

<style>
    
</style>
