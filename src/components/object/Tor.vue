<template>
    <div class="cmp-tor" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 308,
                        height: 325
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-tor {
        background-image: url('/assets/img/elemente/tor.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>