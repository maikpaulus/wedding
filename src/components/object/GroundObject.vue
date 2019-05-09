<template>
    <div class="cmp-sprite-ground-object" v-bind:style="appearance"></div>
</template>

<script>
    import GroundObject from './GroundObject';

    export default {
        props: {
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            dimensions: {
                type: Object,
                required: true
            },
            size: {
                type: Number,
                default: 16
            },
            background: {
                type: Boolean,
                default: false
            },
            visible: {
                type: Boolean,
                default: true
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
                    visible: this.visible
                }
            }).then(() => {
                this.$data.data = this.$store.getters.get('objects')[this._uid];
            });
        },

        data() {
            return {
                data: this.$store.getters.get('objects')[this._uid]
            }
        },

        computed: {
            appearance () {            
                if (!this.$data.data) {
                    return;
                }
                // setting default values
                let x = this.$data.data.location.x || this.x;
                let y = this.$data.data.location.y || this.y;
                let visible = !!this.$data.data.visible;

                let computed = [
                    'left: ' + x + 'px',
                    'bottom: ' + y + 'px',
                    'font-size: ' + (this.size - parseInt(y)/100) + 'px',
                ];

                if (this.background) {
                    computed.push('z-index: 0')
                }
                else {
                    computed.push('z-index: ' + (10000 - parseInt(y)));
                }

                computed.push(
                    'width: ' + (this.dimensions.width / 16) + 'em',
                    'height: ' + (this.dimensions.height / 16) + 'em'
                );

                if (false === visible) {
                    computed.push('display: none');
                }

                return computed.join('; ');
            }
        },

        methods: {
            /* animation methods (with options, animation name and landscape) */
            disappear(options, animation, landscape) {
                let data = this.$data.data;

                data.visible = false;

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                landscape.$emit(animation + '.animation.next');
            },

            appear(options, animation, landscape) {
                let data = this.$data.data;

                data.visible = true;

                this.$store.dispatch('changeObject', {
                    id: this._uid,
                    data: data
                });

                landscape.$emit(animation + '.animation.next');
            },

            pause(options, animation, landscape) {
                let duration = options.duration || 0;

                window.setTimeout(() => {
                    landscape.$emit(animation + '.animation.next');
                }, duration);
            },

            walkRight(options, animation, landscape) {
                this.walk('right', options, animation, landscape);
            },

            walkLeft(options, animation, landscape) {
                this.walk('left', options, animation, landscape);
            },

            walkBack(options, animation, landscape) {
                this.walk('back', options, animation, landscape);
            },

            walkFront(options, animation, landscape) {
                this.walk('front', options, animation, landscape);
            },

            walk(direction, options, animation, landscape) {
                const SPEED = options.speed || 50;
                const HORIZONTAL = 4;

                let toX = options.toX || 0;
                let toY = options.toY || 0;
                let data = this.$data.data;
                
                let counter = 0;

                let steps = 0;
                let vertStep = 0;

                if (-1 !== ['left', 'right'].indexOf(direction)) {
                    steps = (toX - data.location.x) / HORIZONTAL;
                    if (0 !== steps && options.toY) {
                        vertStep = (toY - data.location.y) / steps;
                    }
                }

                data.action = 'go';
                data.direction = direction;
                data.position = 1;

                let interval = window.setInterval(() => {
                    counter++;

                    switch (direction) {
                        case 'right':
                            data.location.x = data.location.x + HORIZONTAL;
                            if (vertStep) {
                                data.location.y = data.location.y + vertStep;
                            }
                            break;

                        case 'left':
                            data.location.x = data.location.x - HORIZONTAL;
                            if (vertStep) {
                                data.location.y = data.location.y - vertStep;
                            }
                            break;

                        case 'back':
                            data.location.y = data.location.y + 2;
                            break;

                        case 'front':
                            data.location.y = data.location.y - 2;
                            break;
                    }
                    
                    switch (direction) {
                        case 'right':
                        case 'left':
                            if (0 === counter % 3) {
                                data.position = 1 + (data.position % 7);
                            }
                            break;

                        case 'front':  
                        case 'back':
                            if (0 === counter % 10) {
                                data.position = 1 + (data.position % 2);
                            }
                            break;
                    }

                    this.$store.dispatch('changeObject', {
                        id: this._uid,
                        data: data
                    });

                    let end = false;
                    switch (direction) {
                        case 'left':
                            end = data.location.x < toX;
                            break;

                        case 'right':
                            end = data.location.x > toX;
                            break;

                        case 'back':
                            end = data.location.y > toY;
                            break;

                        case 'front':
                            end = data.location.y < toY;
                            break;
                    }

                    if (end) {
                        window.clearInterval(interval);
                        landscape.$emit(animation + '.animation.next');
                    }
                }, SPEED);
            }
        }
    }
</script>