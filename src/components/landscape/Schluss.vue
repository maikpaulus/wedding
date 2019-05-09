<template>
    <div class="cmp-schluss">
        <h1>Wir freuen uns auf Euch!</h1>
        
        <md-button class="md-fab md-mini replay" @click.native="restartAnimation">
            <md-icon>replay</md-icon>
        </md-button>
    </div>
</template>

<script>
    import $ from  'jquery';
    import Landscape from './Landscape';

    export default {
        extends: Landscape,

        mounted() {
            window.setTimeout(() => {
                this.$parent.setViewportSize();
            }, 250);
        },

        methods: {
            restartAnimation() {
                this.$parent.next();
            }
        }
    }
</script>

<style>
    .cmp-schluss {
        width: 100%;
        height: 100%;
        position: absolute;
        background: url(/assets/img/hintergruende/schluss.png) no-repeat center bottom;
        background-size: auto 60%;
    }

    .cmp-schluss h1 {
        font-size: 2em;
        font-family: Aphrodite;
        font-weight: 300;
        margin-top: 7.5rem;
        color: #000;
        text-align: center;
    }

    .cmp-schluss .replay {
        position: fixed;
        left: 0;
        top: 0;

        font-size: 1em !important;
        width: 1em !important; 
        height: 1em !important;
        line-height: 1em !important;

        color: #f2ede7 !important;
        background-color: #2d2c86 !important;
    }

    .cmp-schluss .replay .md-icon {
        font-size: 0.6em !important;
        width: 1em !important;
        min-width: 1em !important;
        height: 1em !important;
        min-height: 1em !important;
    }
</style>