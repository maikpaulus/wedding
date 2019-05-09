<template>
    <div class="cmp-page authenticate">
        <div class="authentication-box">
            <h1>Mara & Maik</h1>
            <entrance></entrance>
        </div>
    </div>
</template>

<script>
    import Entrance from '../form/Entrance.vue';

    export default {
        created () {
            self = this;
            this.checkForUser();

            let viewportVal = 'width=device-width, initial-scale=1.0, user-scalable=no';
            document.querySelector("meta[name=viewport]").setAttribute('content', viewportVal);
            window.scrollTo(0,0);
        },

        methods: {
            checkForUser () {
                if (null !== this.$store.getters.get('group')) {
                    // should be go -1 instead home
                    return this.$store.dispatch('changePage', 'home')
                }

                if ('authenticate' !== this.$store.getters.get('route')) {
                    return this.$store.dispatch('changePage', 'authenticate')
                }
            }
        },

        components: {
            Entrance
        }
    }
</script>

<style>
    .authenticate {
        background-color: #2d2c86;
        background-image: url(/assets/img/elemente/spitze.png);
        background-repeat: repeat-x;
        background-size: auto 6em;
        background-position: left bottom;
    }

    .authentication-box {
        width: 30em;
        margin: 4em auto 0;
        text-align: center;
    }

    .authentication-box h1 {
        font-family: Aphrodite;
        margin-top: 0;
        margin-bottom: 3rem;
        color: #F2EDE7;
        font-size: 4em;
        font-weight: 400;
    }

    @media only screen and (max-width:32em) {
        .authenticate {
            background-size: auto 3em;
        }

        .authentication-box {
            margin: 6em auto 0;
            width: 80%;
        }

        .authentication-box h1 {
            font-size: 2em;
        }
    }

    @media only screen and (min-width:48.0125em) {
        .authentication-box {
            margin-top: 10em;
        }

        .authentication-box {
            margin-top: 6.5rem;
        }
    }

    @media only screen and (max-width:48em) {
        .authenticate {
            background: none;
        }

        .authentication-box {
            margin: 6em auto 0;
        }
    }
</style>