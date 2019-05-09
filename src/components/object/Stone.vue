<template>
    <div class="cmp-stone" v-bind:style="appearanceStone"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 110,
                        height: 65
                    }
                }
            },
            kind: {
                type: Number,
                default: 1
            }
        },

        computed: {
            appearanceStone () {
                if (!this.$data.data) {
                    return;
                }
                
                let computed = this.appearance.split(';');

                computed.push('background-image: url("/assets/img/stone-' + this.kind + '.png")');

                return computed.join(';');
            }
        }
    }
</script>

<style>
    .cmp-stone {
        background-size: 100% 100%;
        position: absolute;
    }
</style>