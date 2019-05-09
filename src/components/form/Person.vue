<template>
    <md-card class="register-person" v-bind:class="{ registered: registered }">
            <md-card-header>
                <md-card-header-text>
                    <div>
                        <span class="check-register" v-on:click="$refs.checkbox.$emit('change')">
                            <md-checkbox v-model="registered" ref="checkbox">
                                {{name}}
                            </md-checkbox>
                        </span>
                        
                        <span class="switch-plus-one" v-if="mayHavePlusOne && registered" >
                            <label>Begleitung</label>
                            <md-switch ref="switch" v-model="plusOneIsRegistered"></md-switch>
                        </span>
                    </div>

                    <md-input-container v-if="mayHavePlusOne && registered && plusOneIsRegistered">
                        <label>Begleitung:</label>
                        <md-input ref="plusOne" v-model="plusOneFirstName"></md-input>
                    </md-input-container>  
                </md-card-header-text>
            </md-card-header>
        </div>
    </md-card>
</template>

<script>
    export default {
        mounted() {
            this.$refs.checkbox.$on('change', () => {
                this.$data.registered = !this.$data.registered;

                this.$store.dispatch('changePerson', {
                    id: this.personId,
                    data: this.$data
                });
            });
        },

        props: {
            personId: {
                type: Number,
                required: true,
            },

            firstName: {
                type: String,
                required: true
            },

            isRegistered: {
                type: Boolean,
                required: true
            },

            mayHavePlusOne: {
                type: Boolean,
                required: true
            },

            plusOneRegistered: {
                type: Boolean,
                default: false
            },

            plusOneName: {
                type: String,
                default: ''
            }
        },

        watch: {
            plusOneFirstName: function (val) {
                this.$store.dispatch('changePerson', {
                    id: this.personId,
                    data: this.$data
                });
            },

            plusOneIsRegistered: function (val) {
                this.$store.dispatch('changePerson', {
                    id: this.personId,
                    data: this.$data
                });
            }
        },

        data() {
            return {
                name: this.firstName, 
                registered: this.isRegistered,
                plusOneIsRegistered: this.plusOneRegistered,
                plusOneFirstName: this.plusOneName
            };
        }
    }
</script>

<style>
    .register-person.md-card {
        margin: 0.5em 0 !important;
        background-color: #ffb2b2 !important;
        color: #000 ;
        transition: background-color 1s;
        overflow: hidden;
    }

    .register-person.md-card.registered {
        background-color: #7af771 !important;
    }

    .register-person.md-card .md-card-header {
        padding: 0.25em 0.5em !important;
    }

    .register-person.md-card .md-card-header:last-child {
        margin: 0.5em 0 !important;
    }

    .register-person.md-card .md-card-header-text {
        padding-top: 0.2em;
    }
    
    .register-person .md-checkbox {
        margin: 0 !important;
    }

    .register-person .md-checkbox .md-checkbox-label {
        line-height: 1.45em;
        height: 1.45em;
    }

    .register-person .md-card-header .md-button {
        line-height: 1.45em !important;
        min-height: 0 !important;
        min-width: 0 !important;
    }

    .register-person .md-checkbox.md-checked .md-checkbox-container {
        background-color: #2d2c86 !important;
        border-color: #2d2c86 !important;
    }

    .register-person .md-theme-default.md-checkbox .md-ink-ripple {
        color: #2d2c86 !important;
    }

    .register-person .md-input-container {
        margin: 0 !important;
    }

    .register-person .md-input-container.md-input-focused label,
    .register-person .md-input-container.md-input-focused input, 
    .register-person .md-input-container.md-input-focused textarea,
    .register-person .md-input-container.md-input-focused .md-count {
        color: #000 !important;
        text-shadow: none !important;
        -webkit-text-fill-color: #000 !important;
    }

    .register-person .md-input-container.md-input-focused:after {
        background-color: #000 !important;
    }

    .register-person .md-switch {
        margin: 0 !important;
    }

    .register-person .switch-plus-one {
        float: right;
        line-height: 1.45em;
    }

    .register-person .switch-plus-one label {
        padding-right: 0.3em;
    }

    .register-person .md-theme-default.md-switch .md-switch-container {
        background-color: #aaa;
        top: 0.1em;
    }

    .register-person .md-theme-default.md-switch.md-checked .md-switch-container {
        background-color: #2d2c86;
    }

    .register-person .md-theme-default.md-switch.md-checked .md-switch-thumb {
        background-color: #F2EDE7;
    }
</style>