<template>
    <div class="cmp-cableway-raw" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 147,
                        height: 292
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-cableway-raw {
        background-image: url('/assets/img/elemente/seilbahn-ohne.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>