<template>
    <div class="cmp-edelweiss" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 91,
                        height: 68
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-edelweiss {
        background-image: url('/assets/img/elemente/edelweiss.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>