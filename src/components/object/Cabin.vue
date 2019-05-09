<template>
    <div class="cmp-cabin" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 334,
                        height: 283
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-cabin {
        background-image: url('/assets/img/elemente/cabin.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>