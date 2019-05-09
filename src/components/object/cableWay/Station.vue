<template>
    <div class="cmp-station" v-bind:style="appearanceStation"></div>
</template>

<script>
    import GroundObject from '../GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 770,
                        height: 568
                    }
                }
            },

            kind: {
                type: String,
                default: 'tal'
            }
        },

        computed: {
            appearanceStation () {
                if (!this.$data.data) {
                    return;
                }
                
                let computed = this.appearance.split(';');

                computed.push('background-image: url("/assets/img/elemente/' + this.kind + 'station.png")');

                return computed.join(';');
            }
        }
    }
</script>

<style>
    .cmp-station {
        background-size: 100% 100%;
        position: absolute;
    }
</style>