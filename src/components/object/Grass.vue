<template>
    <div class="cmp-grass" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 115,
                        height: 18
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-grass {
        background-image: url('/assets/img/elemente/gras.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>