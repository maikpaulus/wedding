<template>
    <md-menu direction="bottom right">
        <md-button class="md-fab md-mini navigation" @click.native="openNavigation" md-menu-trigger>
            <md-icon>menu</md-icon>
        </md-button>

        <md-menu-content class="navigation-content">
            <md-menu-item @click.native="$store.dispatch('changePage', 'home');">Gipfeltour</md-menu-item>
            <md-menu-item @click.native="logoutAction">Logout</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
    import $ from 'jquery';

    export default {
        props: {
            size: {
                type: Number,
                default: 2
            }
        },

        created() {
            this.$on('changeFontSize', (proportions) => {
                this.$data.navSize = proportions;
            });
        },

        data() {
            return {
                navSize: this.size
            }
        },

        methods: {
            logoutAction() {
                this.$store.dispatch('removeGroup').then(() => {
                    this.$store.dispatch('changePage', 'authenticate');
                });     
            },

            openNavigation () {
                if (1 === this.$data.navSize) {
                    return;
                }

                window.setTimeout(() => {
                    const navContent = $('.navigation-content');
                    
                    navContent.css('cssText', 
                        navContent.attr('style') + 'font-size: ' + (this.$data.navSize * 16) + 'px !important');
                }, 100);
            }
        }
    }
</script>

<style>
    .cmp-home-page .md-button.md-fab.md-mini.navigation {
        font-size: 40px !important;
        width: 1em !important;
        height: 1em !important;
        line-height: 1em !important;
    }

    .cmp-home-page .md-button.md-fab.md-mini.navigation .md-icon {
        font-size: 0.6em !important;
        width: 1em !important;
        min-width: 1em !important;
        height: 1em !important;
        min-height: 1em !important;
    }
    
    #app.home ~ .md-menu-content.navigation-content {
        font-size: 16px !important;
        width: 10.5em !important;
        min-width: 5.25em !important;
        max-width: 24.5em !important;
        min-height: 4em !important;
        max-height: calc(100vh - 2em) !important;
        z-index: 90000 !important;
    }

    #app.home ~ .md-menu-content.navigation-content .md-list {
        padding: 0 0.5em !important;
    }

    #app.home ~ .md-menu-content.navigation-content .md-menu-item {
        font-size: 1em !important;
    }

    #app.home ~ .md-menu-content.navigation-content .md-list-item .md-list-item-container {
        min-height: 3em !important;
        padding: 0 1em !important;
        font-size: 1em !important;
        min-width: 5.5em !important;
        line-height: 2.25em !important;
    }
</style>