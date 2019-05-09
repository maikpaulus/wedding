<template>
    <div class="cmp-flugzeug" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 671,
                        height: 103
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-flugzeug {
        background-image: url('/assets/img/elemente/flugzeug.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>