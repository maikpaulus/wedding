<template>
    <div class="cmp-huette" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 223,
                        height: 189
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-huette {
        background-image: url('/assets/img/elemente/huette.png');
        background-size: 100% 100%;
        position: absolute;
    }
</style>