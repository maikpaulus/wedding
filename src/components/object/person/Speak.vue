<template>
    <div class="cmp-speak" v-bind:style="appearanceSpeak">
        <div class="text-container">
            <span class="text">{{renderText}}</span>
            <span class="middle-helper"></span>
        </div>
    </div>
</template>

<script>
    import GroundObject from '../GroundObject';
    
    export default {
        extends: GroundObject,

        props: {
            dimensions: {
                default () {
                    return {
                        width: 100,
                        height: 100
                    }
                }
            },
            visible: {
                default: false
            },
            text: {
                type: String,
                default: ''
            },
            kind: {
                type: String,
                default: 'speak'
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
                    visible: this.visible,
                    text: this.text,
                    kind: this.kind
                }
            }).then(() => {
                this.$data.data = this.$store.getters.get('objects')[this._uid];
            });
        },

        computed: {
            appearanceSpeak() {
                if (!this.$data.data || !this.appearance) {
                    return;
                }

                let computed = this.appearance.split(';');

                computed.push(
                    'background-image: url(/assets/img/elemente/interaction-' + this.$data.data.kind + '.png)'
                );

                return computed.join(';');
            },

            renderText() {
                if (!this.$data.data) {
                    return;
                }
                
                return this.$data.data.text;
            }
        }
    }
</script>

<style>
    .cmp-speak {
        background-size: 100% 100%;
        position: absolute;
    }

    .cmp-speak .text-container {
        position: absolute;
        font-family: Arial;
        font-size: 16px;
        top: 50%;
        left: 10%;
        width: 80%;
        height: 3.75em;
        margin: auto;
        margin-top: -3em;
        text-align: center;
    }

    .cmp-speak .text-container span {
        vertical-align: middle;
        display: inline-block;
    }

    .cmp-speak .text-container .middle-helper {
        background: blue;
        display: inline-block;
        width: 0;
        height: 3.75em;
    }
</style>