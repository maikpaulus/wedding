<template>
    <div class="cmp-tree" v-bind:style="appearanceSprite"></div>
</template>

<script>
    import SpriteGroundObject from '../SpriteGroundObject';
    
    export default {
        extends: SpriteGroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 233,
                        height: 350
                    }
                }
            }
        }
    }
</script>

<style>
    .cmp-tree {
        background-image: url('/assets/img/elemente/baum.png');
        background-size: 43.75em 43.75em;
        width: 14.5625em;
        height: 21.875em;
        position: absolute;
    }
</style>