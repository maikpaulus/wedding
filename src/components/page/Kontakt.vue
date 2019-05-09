<template>
    <div class="cmp-page kontakt" v-if="authenticated">
        <header-bar></header-bar>
        <main>
            <h1>Kontakt</h1>
            <p>
                Wenn ihr Rückfragen zur Hochzeit oder dieser Seite habt oder uns einfach gerne mal anrufen wollt, seid ihr auf dieser Seite genau richtig.
            </p>
            <p>
                Außerdem findet ihr einige Übernachtungsmöglichkeiten in der Nähe. Diese werden wir weiter aktualisieren. Also schaut hin und wieder mal vorbei.
            </p>

            <h2>Unsere Kontaktdaten</h2>
            <p>
                <md-icon>account_circle</md-icon><strong>Mara Simon</strong><br>
                <md-icon>phone</md-icon><a href="tel:+49 157 88639788">+49 157 88639788</a><br>
                <md-icon>email</md-icon><a href="mailto:mara@maraundmaik.de">mara[at]maraundmaik.de</a>
            </p>

            <p>
                <md-icon>account_circle</md-icon><strong>Maik Paulus</strong><br>
                <md-icon>phone</md-icon><a href="tel:+49 157 89391142">+49 157 89391142</a><br>
                <md-icon>email</md-icon><a href="mailto:maik@maraundmaik.de">maik[at]maraundmaik.de</a>
            </p>

            <h2>Kontaktdaten der Trauzeugen</h2>
            <p>
                <md-icon>account_circle</md-icon><strong>Carolin Schowalter</strong><br>
                <md-icon>phone</md-icon><a href="tel:+49 152 29936656">+49 152 29936656</a>
            </p>

            <p>
                <md-icon>account_circle</md-icon><strong>Benjamin Orth</strong><br>
                <md-icon>email</md-icon><a href="mailto:Benjamin.orth@gmx.de">Benjamin.orth[at]gmx.de</a>
            </p>

            <h2>Übernachtungsmöglichkeiten</h2>
            <md-layout class="md-gutter" md-gutter>
                <md-layout md-flex-large="33" md-flex-medium="50" md-flex-xsmall="100"  md-flex-small="100" >
                    <h3>Hochwälder Wohlfühlhotel</h3>
                    <p>
                        Zum Stausee 192<br>
                        66679 Losheim am See
                    </p>
                    <p>
                        <md-icon>phone</md-icon><a href="tel:+49 6872 96920">+49 6872 96920</a><br>
                        <md-icon>language</md-icon><a target="_blank" href="http://www.hochwaelder-wohlfuehlhotel.de">www.hochwaelder-wohlfuehlhotel.de</a>
                    </p>
                </md-layout>
                <md-layout md-flex-large="33" md-flex-medium="50" md-flex-xsmall="100"  md-flex-small="100" >
                    <h3>Seehotel Losheim</h3>
                    <p>
                        Zum Stausee 202<br>
                        66679 Losheim am See
                    </p>
                    <p>
                        <md-icon>phone</md-icon><a href="tel:+49 6872 60080">+49 6872 60080</a><br>
                        <md-icon>language</md-icon><a target="_blank" href="http://www.seehotel-losheim.de">www.seehotel-losheim.de</a>
                    </p>
                </md-layout>
                <md-layout md-flex-large="33" md-flex-medium="50" md-flex-xsmall="100"  md-flex-small="100" >
                    <h3>Hubertushof Losheim</h3>
                    <p>
                        Hochwaldstraße 56<br>
                        66679 Losheim am See
                    </p>
                    <p>
                        <md-icon>phone</md-icon><a href="tel:+49 6872 993999">+49 6872 993999</a><br>
                        <md-icon>language</md-icon><a target="_blank" href="http://www.hubertushof-losheim.de">www.hubertushof-losheim.de</a>
                    </p>
                </md-layout>
            </md-layout>
        </main>
    </div>
</template>

<script>
    import HeaderBar from './components/elements/HeaderBar';

    export default {
        beforeCreate () {
            let viewportVal = 'width=device-width, initial-scale=1.0, user-scalable=no';
            document.querySelector("meta[name=viewport]").setAttribute('content', viewportVal);
            window.scrollTo(0,0);
            
            if (null === this.$store.getters.get('group')) {
                return this.$store.dispatch('changePage', 'authenticate');
            }

            if ('kontakt' !== this.$store.getters.get('route')) {
                return this.$store.dispatch('changePage', 'kontakt');
            }
        },

        data() {
            return {
                authenticated: !!this.$store.getters.get('group')
            }
        },

        components: {
            HeaderBar
        }
    }
</script>

<style>
    .cmp-page.kontakt main .md-icon {
        margin-right: 0.5em;
        display: inline-block;
    }

    .cmp-page.kontakt main a {
        color: #fff !important;
    }

    .cmp-page.kontakt h2 {
        font-size: 1.5rem;
        margin-top: 2.5rem;
    }

    .cmp-page.kontakt h3,
    .cmp-page.kontakt p {
        width: 100%;
    }

    .cmp-page.kontakt h3 + p {
        margin-top: 0;
    }

    .cmp-page.kontakt p + p {
        margin-top: 0;
    }
</style>
