<template>
    <div class="cmp-gipfelkreuz" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 120,
                        height: 228
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-gipfelkreuz {
        background-image: url('/assets/img/elemente/gipfelkreuz.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>