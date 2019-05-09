<template>
    <div class="cmp-ground-object" v-bind:style="appearanceSprite"></div>
</template>

<script>
    import GroundObject from './GroundObject';

    export default {
        extends: GroundObject,

        props: {
            sprites: {
                type: Object,
                required: true
            }
        },

        computed: {
            appearanceSprite () {
                if (!this.$data.data) {
                    return;
                }
                
                let computed = this.appearance.split(';');

                computed.push(
                    'background-position: ' + 
                    ((this.sprites.x)*(-this.dimensions.width)/16) + 'em ' + 
                    ((this.sprites.y)*(-this.dimensions.height)/16) + 'em'
                );

                return computed.join('; ');
            }
        }
    }
</script>