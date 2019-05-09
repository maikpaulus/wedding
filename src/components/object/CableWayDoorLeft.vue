<template>
    <div class="cmp-cableway-door-left" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 110,
                        height: 194
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-cableway-door-left {
        background-image: url('/assets/img/elemente/tuer-links.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>