<template>
    <div class="cmp-gelaender" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 187,
                        height: 136
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-gelaender {
        background-image: url('/assets/img/elemente/gelaender.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>