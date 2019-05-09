<template>
    <div class="cmp-tal">
        <Mara :size=12 :x=150 :y=20></Mara>
        <Maik :size=12 :x=400 :y=20></Maik>

        <Gelaender :size=20 :x=635 :y=430></Gelaender>
        <Tor :size=18 :x=130 :y=120></Tor>

        <Stone :size=10 :x=410 :y=115></Stone>
        <Stone :size=6 :x=450 :y=110></Stone>

        <pine-tree :size=12 :x=390 :y=130></pine-tree>

        <pine-tree :size=14 :x=1000 :y=462></pine-tree>
        <pine-tree :size=14 :x=1045 :y=565></pine-tree>
        <pine-tree :size=14 :x=1095 :y=585></pine-tree>
        <pine-tree :size=14 :x=1180 :y=575></pine-tree>
        <pine-tree :size=14 :x=1100 :y=480></pine-tree>
        <pine-tree :size=14 :x=1145 :y=495></pine-tree>
        <pine-tree :size=14 :x=1200 :y=475></pine-tree>
        
        <pine-tree :size=14 :x=1400 :y=480></pine-tree>
        <pine-tree :size=14 :x=1300 :y=450></pine-tree>
        <pine-tree :size=14 :x=1345 :y=505></pine-tree>
        <pine-tree :size=14 :x=1245 :y=525></pine-tree>
        <pine-tree :size=14 :x=1200 :y=452></pine-tree>

        <Kuh :size=16 :x=20 :y=300></Kuh>
        <Kuh :size=11 :x=10 :y=280 direction="right"></Kuh>

        <md-dialog class="welcome-box" ref="welcome">
            <md-dialog-title>Herzlich Willkommen!</md-dialog-title>

            <md-dialog-content>
                <p>
                    Schön, dass ihr den Weg in unsere Welt gefunden habt. Lehnt euch zurück und lasst euch von uns durch diese Welt führen. Viel Spaß dabei!
                </p>
                <p class="signature">
                    Mara & Maik
                </p>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click.native="$refs.welcome.close()">Los gehts!</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div class="preload-images-container">
            <span style="background-image: url('/assets/img/hintergruende/talstation.png')"></span>
            <span style="background-image: url('/assets/img/elemente/talstation.png')"></span>
            <span style="background-image: url('/assets/img/elemente/talstation-back.png')"></span>
            <span style="background-image: url('/assets/img/elemente/seilbahn-personen.png')"></span>
            <span style="background-image: url('/assets/img/elemente/seilbahn-ohne.png')"></span>
            <span style="background-image: url('/assets/img/elemente/tuer-links.png')"></span>
            <span style="background-image: url('/assets/img/elemente/tuer-rechts.png')"></span>
            <span style="background-image: url('/assets/img/elemente/gras.png')"></span>
            <span style="background-image: url('/assets/img/elemente/stone-3.png')"></span>
            <span style="background-image: url('/assets/img/elemente/stone-2.png')"></span>
            <span style="background-image: url('/assets/img/elemente/tulpe-rot.png')"></span>
            <span style="background-image: url('/assets/img/elemente/tulpe-pink.png')"></span>
            <span style="background-image: url('/assets/img/elemente/interaction-think.png')"></span>
        </div>
    </div>
</template>

<script>
    import Landscape from './Landscape';
    import Mara from '../object/person/Mara';
    import Maik from '../object/person/Maik';
    import Gelaender from '../object/Gelaender';
    import Tor from '../object/Tor';
    import Stone from '../object/Stone';
    import PineTree from '../object/tree/PineTree';
    import Kuh from '../object/Kuh';

    import SeilbahnTal from './SeilbahnTal';

    export default {
        extends: Landscape,
        components: {
            Mara,
            Maik,
            Gelaender,
            Tor,
            Stone,
            PineTree,
            Kuh
        },

        mounted() {          
            if (!this.$data.started) {                
                window.setTimeout(() => {
                    this.$parent.setViewportSize();
                    this.$refs.welcome.open();
                }, 250);

                this.$refs.welcome.$on('close', () => {
                    this.$data.started = true;

                    this.start();
                });
            }
        },

        data() {
            return {
                started: false
            }
        },

        methods: {
            preload(images) {
                let index = index || 0;
                if (images && images.length > index) {
                    let img = new Image ();
                    img.onload = function() {
                        preload(images, index + 1);
                    }

                    img.src = images[index];
                }
            },

            start() {
                let mara = this.$children[0];
                let maik = this.$children[1];

                this.setAnimation('welcome', [
                    [mara.pause, {duration: 1500}],
                    [maik.speak, {text: 'So liebe Leute, auf gehts!', duration: 3000} ],
                    [mara.speak, {text: 'Wir wollen keine Zeit verlieren!', duration: 3000}],
                    [mara.stand, {direction: 'right'} ],
                    [mara.speak, {text: 'Sollen wir rauf zum Gipfel?', duration: 3000} ],
                    [maik.stand, {direction: 'left'} ],
                    [maik.speak, {text: 'Zum Gipfel? Ich dachte Dagstuhl...', duration: 3000} ],
                    [mara.speak, {text: 'Ja klar, an unserer Hochzeit.', duration: 3000} ],
                    [mara.speak, {text: 'Die ist aber erst am 26. August.', duration: 3000} ],
                    [mara.speak, {text: 'Hast du das schon vergessen?', duration: 3000} ],
                    [maik.speak, {text: 'Natürlich nicht, um 12 Uhr gehts da los!', duration: 3000} ],
                    [maik.speak, {text: 'Na dann erstmal zum Gipfel...', duration: 3000} ]
                ]);

                this.setAnimation('mara', [
                    [ mara.walkRight, {toX: 300, toY: 100}],
                    [ mara.walkBack, {toY: 260} ],
                    [ mara.walkRight, {toX: 400, toY: 320} ],
                    [ mara.walkRight, {toX: 440, toY: 370} ],
                    [ mara.walkRight, {toX: 750, toY: 510} ],
                    [ mara.walkRight, {toX: 1400, toY: 550} ]
                ]);

                this.setAnimation('maik', [
                    [ maik.walkLeft, {toX: 300, toY: 100}],
                    [ maik.walkBack, {toY: 260} ],
                    [ maik.walkRight, {toX: 400, toY: 320} ],
                    [ maik.walkRight, {toX: 440, toY: 370} ],
                    [ maik.stand, {direction: 'front'} ],
                    [ maik.speak, {text: 'Alle Daten rund um die Hochzeit', duration: 2000} ],
                    [ maik.speak, {text: 'könnt ihr nach unserer Gipfeltour', duration: 2000} ],
                    [ maik.speak, {text: 'oben rechts im Menü finden.', duration: 3000} ],
                    [ maik.walkRight, {toX: 750, toY: 510} ],
                    [ maik.walkRight, {toX: 1400, toY: 540} ]
                ]);

                this.startAnimation('welcome');

                this.$on('welcome.animation.finished', () => {
                    this.startAnimation('mara');

                    window.setTimeout(() => {
                        this.startAnimation('maik');
                    }, 2000);
                });

                this.$on('maik.animation.finished', () => {
                    this.$parent.next();
                });
            }
        }
    }
</script>

<style>
    .cmp-tal {
        width: 100%;
        height: 100%;
        background: url(/assets/img/hintergruende/tal.png) no-repeat left bottom;
    }

    .preload-images-container {
        visibility: hidden;
    }

    #app.home ~ .md-dialog-container {
        z-index: 100000 !important;
    }

    #app.home ~ .md-dialog-container {
        font-size: 16px !important;
    }

    #app.home ~ .md-dialog {
        max-height: 90% !important;
        max-width: 60% !important;
    }

    #app.home ~ .md-dialog-container .md-dialog-title {
        margin-bottom: 0.5em !important;
        padding: 1em 1.15em 0 !important;
        font-size: 1.25em !important;
        line-height: 1.625em !important;
        font-weight: 500 !important;
        color: #2d2c86;
    }

    #app.home ~ .md-dialog-container .md-dialog-content {
        font-size: 1em !important;
        padding: 0 1.5em !important;
        line-height: 1.25em !important;
        background: none !important;
        overflow: visible;
    }

    #app.home ~ .md-dialog-container .md-dialog-content p {
        margin-bottom: 2em !important;
    }

    #app.home ~ .md-dialog-container .md-dialog-content p.signature {
        font-family: Aphrodite;
        color: #2d2c86;
        font-size: 1.15em;
        font-weight: 400;
        margin-top: 1.25em;
        overflow: visible;
        position: absolute;
        bottom: -3em;
        z-index: 100;
    }
    
    #app.home ~ .md-dialog-container .md-dialog-actions {
        min-height: 3.25em !important;
        background: transparent !important;
        padding: 0.5em 0.5em 0.5em 1.5em !important;
    }
    
    #app.home ~ .md-dialog-container .md-dialog-actions .md-button {
        font-size: 0.875em !important;
        line-height: 2.5em !important;
        min-width: 4em !important;
        min-height: 2.5em !important;
        padding: 0 0.5em !important;
    }
    

    #app.home ~ .md-dialog-container .md-theme-default.md-button:not([disabled]).md-primary:not(.md-icon-button) {
        color: #f2ede7 !important;
        background-color: #2d2c86 !important;
    }

    @media only screen and (orientation:portrait) {
        #app.home ~ .md-dialog-container {
            display: none;
        }
    }

</style>