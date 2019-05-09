<template>
    <div class="cmp-person" v-bind:style="appearancePerson">
        <Speak :size=22></Speak>
    </div>
</template>

<script>
    import Speak from './Speak';
    import SpriteGroundObject from '../SpriteGroundObject';

    const positions = {
        frontStand: {x: 0, y: 0},
        frontGo1: {x: 2, y: 0},
        frontGo2: {x: 3, y: 0},
        backStand: {x: 1, y: 0},
        backGo1: {x: 4, y: 0},
        backGo2: {x: 5, y: 0},
        rightStand: {x: 1, y: 1},
        rightGo1: {x: 6, y: 0},
        rightGo2: {x: 7, y: 0},
        rightGo3: {x: 8, y: 0},
        rightGo4: {x: 9, y: 0},
        rightGo5: {x: 10, y: 0},
        rightGo6: {x: 11, y: 0},
        rightGo7: {x: 12, y: 0},
        rightGo8: {x: 13, y: 0},
        leftStand: {x: 0, y: 1},
        leftGo1: {x: 13, y: 1},
        leftGo2: {x: 12, y: 1},
        leftGo3: {x: 11, y: 1},
        leftGo4: {x: 10, y: 1},
        leftGo5: {x: 9, y: 1},
        leftGo6: {x: 8, y: 1},
        leftGo7: {x: 7, y: 1},
        leftGo8: {x: 6, y: 1},
        leftGreet: {x: 2, y: 1},
        rightGreet: {x: 3, y: 1} 
    };

    export default {
        extends: SpriteGroundObject,
        props: {
            dimensions: {
                default () {
                    return {
                        width: 113,
                        height: 297
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
                default: 'front'
            },

            action: {
                type: String,
                default: 'stand'
            },

            position: {
                type: Number,
                default: 0
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
            appearancePerson () {
                if (!this.$data.data) {
                    return;
                }

                let computed = this.appearance.split(';');

                // setting default values
                let direction = this.$data.data.direction || this.direction;
                let action = this.$data.data.action || this.action;
                let position = this.$data.data.position || this.position;
                let shift = this.$data.data.shift || this.shift;
                
                let appearance = direction;
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
            stand(options, animation, landscape) {
                let data = this.$data.data;

                let duration = options.duration || 0;
                let direction = options.direction || 'front';

                data.position = 0;
                data.action = 'stand';
                data.direction = direction;

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                window.setTimeout(() => {
                    landscape.$emit(animation + '.animation.next');
                }, duration);
            },

            speak(options, animation, landscape) {
                let data = this.$children[0].$data.data;
                let text = options.text || 'Bitte Text einfügen!';
                let duration = options.duration || 0;

                data.kind = 'speak';
                data.visible = true;
                data.text = text;

                this.$store.dispatch('changeObject', {
                    id: this.$children[0]._uid,
                    data: data
                });

                window.setTimeout(() => {
                    data.visible = false;
                    
                    this.$store.dispatch('changeObject', {
                        id: this.$children[0]._uid,
                        data: data
                    });

                    landscape.$emit(animation + '.animation.next');
                }, duration)
            },

            startSpeak(options, animation, landscape) {
                let data = this.$children[0].$data.data;
                let text = options.text || 'Bitte Text einfügen!';
                let duration = options.duration || 0;

                data.kind = 'speak';
                data.visible = true;
                data.text = text;

                this.$store.dispatch('changeObject', {
                    id: this.$children[0]._uid,
                    data: data
                });

                landscape.$emit(animation + '.animation.next');
            },

            stopSpeak(options, animation, landscape) {
                this.removeBubble(options, animation, landscape);
            },

            think(options, animation, landscape) {
                let data = this.$children[0].$data.data;
                let text = options.text || 'Bitte Text einfügen!';
                let duration = options.duration || 0;

                data.kind = 'think';
                data.visible = true;
                data.text = text;

                this.$store.dispatch('changeObject', {
                    id: this.$children[0]._uid,
                    data: data
                });

                window.setTimeout(() => {
                    data.visible = false;
                    
                    this.$store.dispatch('changeObject', {
                        id: this.$children[0]._uid,
                        data: data
                    });

                    landscape.$emit(animation + '.animation.next');
                }, duration)
            },

            startThink(options, animation, landscape) {
                let data = this.$children[0].$data.data;
                let text = options.text || 'Bitte Text einfügen!';
                let duration = options.duration || 0;

                data.kind = 'think';
                data.visible = true;
                data.text = text;

                this.$store.dispatch('changeObject', {
                    id: this.$children[0]._uid,
                    data: data
                });

                landscape.$emit(animation + '.animation.next');
            },

            stopThink(options, animation, landscape) {
                this.removeBubble(options, animation, landscape);
            },

            removeBubble(options, animation, landscape) {
                let data = this.$children[0].$data.data;
                data.visible = false;
                
                this.$store.dispatch('changeObject', {
                    id: this.$children[0]._uid,
                    data: data
                });

                landscape.$emit(animation + '.animation.next');
            },

            greet(options, animation, landscape) {
                let data = this.$data.data;
                let duration = options.duration || 0;
                let direction = options.direction || 'left';

                data.position = 0;
                data.action = 'greet';
                data.direction = direction;

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                window.setTimeout(() => {
                    data.action = 'stand';
                    data.direction = 'front';
                    
                    this.$store.dispatch('changeObject', {
                        id: this._uid,
                        data: data
                    });
                    
                    landscape.$emit(animation + '.animation.next');
                }, duration)
            }
        },
        components: {
            Speak
        }
    }
</script>

<style>
    .cmp-person {
        background-image: url('/assets/img/elemente/person.png');
        background-size: 105.25em 74.4375em;
        width: 7.0625em;
        height: 18.5625em;
        position: absolute;
    }

    .cmp-person .cmp-speak {
        font-size: 1em;
        left: 2em !important;
        top: -3em !important;
        bottom: 0;
    }
</style>