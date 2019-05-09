<template>
    <div class="cmp-cableway-door-right" v-bind:style="appearance"></div>
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
    .cmp-cableway-door-right {
        background-image: url('/assets/img/elemente/tuer-rechts.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>