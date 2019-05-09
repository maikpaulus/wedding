<template>
    <div class="entrance-form">
        <form v-on:submit.prevent="requestEntrance">
            <md-input-container>
                <label>Code eingeben...</label>
                <md-input maxlength="10" v-model.trim="token"></md-input>
            </md-input-container>
            <md-button type="submit" class="md-raised">Anmelden</md-button>
            <md-snackbar md-position="top center" ref="snackbar">
                <span>Das war nix!</span>
                <md-button @click.native="$refs.snackbar.close()">Ändern</md-button>
            </md-snackbar>
        </form>
        <p>
            Unsere Hochzeit liegt schon etwas zurück. Daher ist diese Seite nur noch eingeschränkt nutzbar.
        </p>
        <p>
            Um dir die Demo der Seite anzuschauen, logge dich einfach mit dem Code <strong>AB12CD34EF</strong> ein.
        </p>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        data() {
            return {
                buttonLabel: 'Absenden',
                token: ''
            }
        },
        
        mounted () {
            window.setTimeout(() => {
                $('.md-input').focus();
            }, 100);

            this.$refs.snackbar.$on('close', () => {
                $('.md-input').focus();
            })
        },

        methods: {
            requestEntrance (event) {
                $.ajax('/token', {
                    method: 'post',
                    data: {
                        token: this.token.toUpperCase()
                    },
                    success: (content) => {
                        this.$store.dispatch('addGroup', content.data)
                            .then(() => {
                                this.$store.dispatch('changePage', 'home');
                            });
                    },
                    error: (content) => {
                        $('.md-input-container').addClass('md-input-invalid');
                        this.$refs.snackbar.open();
                    }
                })
            }
        }
    };
</script>

<style>
    .entrance-form input {
        width: 90%;
    }

    .entrance-form .md-input-container:not(.md-input-invalid) label,
    .entrance-form .md-input-container:not(.md-input-invalid) input, 
    .entrance-form .md-input-container:not(.md-input-invalid) textarea,
    .entrance-form .md-input-container:not(.md-input-invalid) .md-count {
        color: #f2ede7 !important;
        text-shadow: none !important;
        -webkit-text-fill-color: #f2ede7 !important;
    }

    .entrance-form .md-input-container:not(.md-input-invalid):after {
        background-color: #f2ede7 !important;
    }

    .entrance-form .md-theme-default.md-button:not([disabled]).md-raised:not(.md-icon-button),
    .entrance-form .md-snackbar-container {
        color: #2d2c86 !important;
        background-color: #f2ede7 !important;
    }

    .entrance-form .md-snackbar-container {
        color: #fff !important;
        background-color: #ff5772 !important;

    }

    .entrance-form .md-input-container.md-input-invalid label,
    .entrance-form .md-input-container.md-input-invalid input, 
    .entrance-form .md-input-container.md-input-invalid textarea,
    .entrance-form .md-input-container.md-input-invalid .md-count {
        color: #ff5772 !important;
        -webkit-text-fill-color: #ff5772 !important;
    }

    .entrance-form .md-input-container.md-input-invalid:after {
        background-color: #ff5772 !important;
    }

</style>