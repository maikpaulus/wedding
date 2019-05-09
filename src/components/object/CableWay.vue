<template>
    <div class="cmp-cableway" v-bind:style="appearanceCableWay"></div>
</template>

<script>
    import GroundObject from './GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 219,
                        height: 292
                    }
                }
            },

            persons: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            appearanceCableWay () {
                if (!this.$data.data) {
                    return;
                }
                
                let computed = this.appearance.split(';');
                let cableWay = 'seilbahn' + (this.persons ? '-personen' : ''); 

                computed.push('background-image: url("/assets/img/elemente/' + cableWay + '.png")');

                return computed.join(';');
            }
        }
    }
</script>

<style>
    .cmp-cableway {
        background-size: 100% 100%;
        position: absolute;
    }
</style>