<template>
    <div class="cmp-murmeltier" v-bind:style="appearanceMurmeltier"></div>
</template>

<script>
    import SpriteGroundObject from './SpriteGroundObject';

    const positions = {
        rightStand: {x: 0, y: 0},
        leftStand: {x: 1, y: 0},
        rightSit: {x: 0, y: 1},
        leftSit: {x: 1, y: 1},
        frontStand: {x: 2, y: 1},
        frontStandEat: {x: 2, y: 2}
    };

    export default {
        extends: SpriteGroundObject,
        props: {
            dimensions: {
                default () {
                    return {
                        width: 100,
                        height: 100
                    }
                }
            },
            sprites: {
                default() {
                    return {
                        x: 0,
                        y: 0
                    }
                }
            },

            direction: {
                type: String,
                default: 'left'
            },

            action: {
                type: String,
                default: 'stand'
            },

            shift: {
                type: Object,
                default() {
                    return {
                        x: 0,
                        y: 0
                    }
                }
            }
        },

        created () {
            this.$store.dispatch('addObject', {
                id: this._uid, 
                data: {
                    location: {
                        x: this.x,
                        y: this.y
                    },

                    direction: this.direction,
                    action: this.action,
                    shift: this.shift,
                    visible: this.visible
                }
            });
        },

        computed: {
            appearanceMurmeltier () {
                if (!this.$data.data) {
                    return;
                }

                let computed = this.appearance.split(';');

                // setting default values
                let direction = this.$data.data.direction || this.direction;
                let action = this.$data.data.action || this.action;
                let shift = this.$data.data.shift || this.shift;
                
                let appearance = direction;
                appearance += action[0].toUpperCase() + action.substr(1);

                // remove background position from inherited object
                computed.pop();

                computed.push(
                    'background-position: ' + 
                    ((positions[appearance].x + shift.x)*(-this.dimensions.width)/16) + 'em ' + 
                    ((positions[appearance].y + shift.y)*(-this.dimensions.height)/16) + 'em'
                );

                return this.appearanceSprite + computed.join(';');
            }
        },

        methods: {
            /* animation methods (with options, animation name and landscape) */
            sit(options, animation, landscape) {
                let data = this.$data.data;

                let duration = options.duration || 0;
                let direction = options.direction || 'left';

                data.direction = direction;
                data.action = 'sit';

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                window.setTimeout(() => {
                    landscape.$emit(animation + '.animation.next');
                }, duration);
            },

            stand(options, animation, landscape) {
                let data = this.$data.data;

                let duration = options.duration || 0;
                let direction = options.direction || 'left';

                data.direction = direction;
                data.action = 'stand';

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                window.setTimeout(() => {
                    landscape.$emit(animation + '.animation.next');
                }, duration);
            },
        }
    }
</script>

<style>
    .cmp-murmeltier {
        background-image: url('/assets/img/elemente/murmeltier.png');
        background-size:12.5em 18.75em;
        width: 6.25em;
        height: 6.25em;
        position: absolute;
    }
</style>