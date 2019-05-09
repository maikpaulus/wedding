<template>
    <div class="cmp-kuh" v-bind:style="appearanceKuh"></div>
</template>

<script>
    import SpriteGroundObject from './SpriteGroundObject';

    const positions = {
        rightBrownStand: {x: 0, y: 0},
        rightBrownEat: {x: 1, y: 0},
        leftBrownStand: {x: 2, y: 0},
        leftBrownEat: {x: 3, y: 0},
        rightGreyStand: {x: 0, y: 1},
        rightGreyEat: {x: 1, y: 1},
        leftGreyStand: {x: 2, y: 1},
        leftGreyEat: {x: 3, y: 1}
    };

    export default {
        extends: SpriteGroundObject,
        props: {
            dimensions: {
                default () {
                    return {
                        width: 251,
                        height: 169
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

            position: {
                type: Number,
                default: 0
            },

            color: {
                type: String,
                default: 'brown'
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
                    position: this.position,
                    shift: this.shift,
                    visible: this.visible
                }
            });
        },

        computed: {
            appearanceKuh () {
                if (!this.$data.data) {
                    return;
                }

                let computed = this.appearance.split(';');

                // setting default values
                let direction = this.$data.data.direction || this.direction;
                let action = this.$data.data.action || this.action;
                let position = this.$data.data.position || this.position;
                let shift = this.$data.data.shift || this.shift;
                let color = this.$data.data.color || this.color;
                
                let appearance = direction;
                appearance += color[0].toUpperCase() + color.substr(1);
                appearance += action[0].toUpperCase() + action.substr(1); 
                appearance += position > 0 ? position : '';

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
            eat(options, animation, landscape) {
                let data = this.$data.data;

                let duration = options.duration || 0;

                data.position = 0;
                data.action = 'stand';

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                window.setTimeout(() => {
                    data.action = 'eat';

                    this.$store.dispatch('changeObject', {
                        id: this._uid,
                        data: data
                    });
                    
                    window.setTimeout(() => {
                        data.action = 'stand';

                        this.$store.dispatch('changeObject', {
                            id: this._uid,
                            data: data
                        });

                        landscape.$emit(animation + '.animation.next');
                    }, duration);
                }, duration);
            },
        }
    }
</script>

<style>
    .cmp-kuh {
        background-image: url('/assets/img/elemente/kuh.png');
        background-size: 62.75em 21.125em;
        width: 15.6875em;
        height: 10.5625em;
        position: absolute;
    }
</style>