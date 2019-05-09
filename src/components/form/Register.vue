<template>
    <div class="cmp-register">
        <p>
            Hier kann man sich ganz einfach für unsere Hochzeit an- oder abmelden. Dies ist bis zum <strong>26.06.2017</strong> möglich und 
            kann bis zu diesem Datum noch jederzeit geändert werden, indem man das Formular erneut abspeichert.
        </p>
        <p v-if="plusOneNotice">
            Neben dem Namen kann man eine Begleitperson anmelden? Einfach aktivieren und den Namen der Begleitung eintragen, damit wir die Person mit einplanen können.
        </p>
        <p>
            Wir freuen uns auf zahlreiche Zusagen.
        </p>

        <form class="register-form" v-on:submit.prevent="saveData">
            <template v-for="(value, key) in persons" v-if="dataLoaded">
                <person
                    v-bind:key="key"
                    v-bind:person-id="key"
                    v-bind:first-name="value.firstName" 
                    v-bind:is-registered="value.registered"
                    v-bind:may-have-plus-one="value.mayHavePlusOne"
                    v-bind:plus-one-registered="value.plusOneIsRegistered"
                    v-bind:plus-one-name="value.plusOneFirstName">
                    </person>
            </template>

            <div class="submit-container">
                <md-button type="submit" class="md-raised">Speichern</md-button>
            </div>

            <md-snackbar class="success" md-position="top center" ref="snackbarSuccess">
                <span>Die Daten wurden erfolgreich gespeichert.</span>
            </md-snackbar>

            <md-snackbar class="error" md-position="top center" ref="snackbarError">
                <span>Das Speichern ist leider fehlgeschlagen.</span>
            </md-snackbar>
        </form>
    </div>
</template>

<script>
    import Person from './Person';
    import $ from 'jquery';

    export default {
        created() {
            this.getPersons();
        },

        data() {
            return {
                persons: {},
                dataLoaded: false,
                plusOneNotice: false
            }
        },

        methods: {
            getPersons () {
                $.ajax('/persons', {
                    method: 'post',
                    data: {
                        id: this.$store.getters.get('group').id*1,
                        token: this.$store.getters.get('group').token
                    },
                    success: (content) => {
                        content.data.forEach( (person) => {
                            this.$store.dispatch('addPerson', person).then(() => {
                                this.$data.persons = this.$store.getters.get('persons');
                            });

                            if (true === person.data.mayHavePlusOne) {
                                this.$data.plusOneNotice = true;
                            }

                            this.$data.dataLoaded = true;
                        });
                    },
                    error: (content) => {
                        console.log(content.data, 'noooo');
                    }
                })
            },

            hasPlusOneOption () {
                return true;
            },

            saveData () {
                $.ajax('/persons', {
                    method: 'patch',
                    data: {
                        id: this.$store.getters.get('group').id*1,
                        token: this.$store.getters.get('group').token,
                        persons: JSON.stringify(this.$data.persons)
                    },
                    success: (content) => {
                        this.$refs.snackbarSuccess.open();
                    },
                    error: (content) => {
                        this.$refs.snackbarError.open();
                    }
                })
            }
        },

        components: {
            Person
        }
    }
</script>

<style>
    .submit-container {
        text-align: right;
    }

    .submit-container .md-button {
        margin: 1em 0 0 !important;
    }

    .md-snackbar {
        z-index: 200000 !important;
    }

    .md-snackbar.success .md-snackbar-container {
        color: #2d2c86 !important;
        background-color: #f2ede7 !important;
    }

    .md-snackbar.error .md-snackbar-container {
        color: #fff !important;
        background-color: #ff5772 !important;

    }
</style>
