<template>
    <div class="cmp-cableway-rope" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 1757,
                        height: 309
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-cableway-rope {
        background-image: url('/assets/img/elemente/seil.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>