<template>
    <div class="cmp-sign" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 64,
                        height: 137
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-sign {
        background-image: url('/assets/img/elemente/schild.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>