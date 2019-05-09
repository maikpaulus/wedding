<template>
    <div class="cmp-tulip" v-bind:style="appearanceTulip"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 18,
                        height: 42
                    }
                }
            },
            kind: {
                type: String,
                default: 'rot'
            }
        },

        computed: {
            appearanceTulip () {
                if (!this.$data.data) {
                    return;
                }

                let computed = this.appearance.split(';');
                computed.push('background-image: url("/assets/img/elemente/tulpe-' + this.kind + '.png")');

                return computed.join(';');
            }
        }
    }
</script>

<style>
    .cmp-tulip {
        background-size: 100% 100%;
        position: absolute;
    }
</style>