<template>
    <div class="cmp-gipfel">
        <Mara :size=11 :x=1500 :y=-250></Mara>
        <Maik :size=11 :x=1600 :y=-250></Maik>
        <Flugzeug :size=15 :x=2000 :y=500></Flugzeug>
        <Murmeltier :size=16 :x=250 :y=10 direction="right"></Murmeltier>
        <Murmeltier :size=16 :x=350 :y=40 direction="right"></Murmeltier>
        <Gipfelkreuz :size=16 :x=930 :y=420></Gipfelkreuz>
        <Edelweiss :size=14 :x=20 :y=10></Edelweiss>
        <Edelweiss :size=14 :x=70 :y=50></Edelweiss>

        <div class="preload-images-container">
            <span style="background-image: url('/assets/img/hintergruende/schluss.png')"></span>
        </div>
    </div>
</template>

<script>
    import Landscape from './Landscape';
    import Mara from '../object/person/Mara';
    import Maik from '../object/person/Maik';
    import Flugzeug from '../object/Flugzeug';
    import Gipfelkreuz from '../object/Gipfelkreuz';
    import Edelweiss from '../object/Edelweiss';
    import Murmeltier from '../object/Murmeltier';

    export default {
        extends: Landscape,
        components: {
            Mara,
            Maik,
            Flugzeug,
            Gipfelkreuz,
            Edelweiss,
            Murmeltier
        },

        mounted () {
            window.setTimeout(() => { this.start() }, 1000);
        },

        methods: {
            start() {
                let mara = this.$children[0];
                let maik = this.$children[1];
                let flugzeug = this.$children[2];

                let murmeltier = this.$children[3];
                let murmeltier2 = this.$children[4];

                this.setAnimation('murmeltier1', [
                    [ murmeltier.stand, {direction: 'right', duration: 5000} ],
                    [ murmeltier.sit, {direction: 'right', duration: 2500} ],
                    [ murmeltier.stand, {direction: 'right', duration: 2500} ],
                    [ murmeltier.sit, {direction: 'right', duration: 1500} ],
                    [ murmeltier.stand, {direction: 'right', duration: 5500} ],
                    [ murmeltier.sit, {direction: 'right', duration: 3500} ]
                ]);

                this.setAnimation('murmeltier2', [
                    [ murmeltier2.stand, {direction: 'right', duration: 2500} ],
                    [ murmeltier2.sit, {direction: 'right', duration: 1500} ],
                    [ murmeltier2.stand, {direction: 'right', duration: 4500} ],
                    [ murmeltier2.sit, {direction: 'right', duration: 1000} ],
                    [ murmeltier2.stand, {direction: 'right', duration: 6500} ],
                    [ murmeltier2.sit, {direction: 'right', duration: 4500} ]
                ]);

                this.setAnimation('mara', [
                    [ mara.walkLeft, {toX: 1100, toY: 30} ],
                    [ mara.walkLeft, {toX: 860} ],
                    [ mara.walkLeft, {toX: 600, toY: 150} ],
                    [ mara.walkLeft, {toX: 420, toY: 210} ],
                    [ mara.walkLeft, {toX: 380, toY: 250} ],
                    [ mara.stand, {direction: 'front', duration: 2000} ],
                    [ mara.think, {text: 'Nur noch wenige Meter...', duration: 2000} ],
                    [ mara.walkRight, {toX: 680, toY: 420} ],
                    [ mara.walkRight, {toX: 880} ],
                    [ mara.walkFront, {toY: 419} ],
                    [ mara.stand, {direction: 'front'} ],
                    [ mara.speak, {text: 'Geschafft!', duration: 1500} ],
                    [ mara.speak, {text: 'Wo bleibst du denn?', duration: 1500} ],
                ]);

                this.setAnimation('maik', [
                    [ maik.walkLeft, {toX: 900, toY: 100} ],
                    [ maik.walkBack, {toY: 250} ],
                    [ maik.stand, {direction: 'back'} ],
                    [ maik.think, {text: 'Hm, da gehts nicht weiter...', duration: 2000} ],
                    [ maik.stand, {direction: 'left', duration: 1000} ],
                    [ maik.walkFront, {toY: 50} ],
                    [ maik.walkLeft, {toX: 600, toY: 150} ],
                    [ maik.walkLeft, {toX: 420, toY: 210} ],
                    [ maik.walkLeft, {toX: 380, toY: 250} ],
                    [ maik.walkRight, {toX: 680, toY: 420} ],
                    [ maik.walkRight, {toX: 720, toY: 419} ],
                    [ maik.stand, {direction: 'front', duration: 500} ]
                ]);

                this.setAnimation('flugzeug', [
                    [ mara.stand, {direction: 'right'} ],
                    [ mara.speak, {text: 'Sieh mal da rechts!', duration: 2000} ],
                    [ maik.stand, {direction: 'right'} ],
                    [ maik.speak, {text: 'Was ist denn da?', duration: 2000} ],
                    [ mara.startSpeak, {text: 'Na das Flugzeug!'} ],
                    [ flugzeug.walkLeft, {toX: 1200, speed: 30} ],
                    [ mara.stopSpeak],
                    [ flugzeug.walkLeft, {toX: 1000, speed: 30} ],
                    [ mara.stand, {direction: 'back'} ],
                    [ maik.stand, {direction: 'back'} ],
                    [ flugzeug.walkLeft, {toX: 500, speed: 30} ],
                    [ mara.stand, {direction: 'left'} ],
                    [ maik.stand, {direction: 'left'} ],
                    [ flugzeug.walkLeft, {toX: -500, speed: 30} ],
                    [ mara.stand, {direction: 'front'} ],
                    [ maik.stand, {direction: 'front'} ],
                    [ mara.speak, {text: 'Ich hoffe es hat euch Spaß gemacht!', duration: 3000} ],
                    [ maik.speak, {text: 'Dann sehen wir uns auf der Feier!', duration: 3000} ],
                    [ maik.speak, {text: 'Dazu müsst ihr euch nur anmelden.', duration: 3000} ],
                    [ mara.speak, {text: 'Das Formular dazu findet ihr im Menü.', duration: 3000} ],
                    [ mara.startSpeak, {text: 'Tschöö! Bis bald!'} ],
                    [ mara.greet, {direction: 'left', duration: 3000} ],
                    [ mara.stopSpeak ],
                    [ maik.startSpeak, {text: 'Servus! Pfiats eich!'} ],
                    [ maik.greet, {direction: 'left', duration: 3000} ],
                    [ maik.stopSpeak ]
                ]);

                this.startAnimation('mara');
                this.startAnimation('maik');

                this.startAnimation('murmeltier1');
                this.startAnimation('murmeltier2');

                this.$on('maik.animation.finished', () => {
                    this.startAnimation('flugzeug');
                });

                this.$on('flugzeug.animation.finished', () => {
                    this.$parent.next();
                });
            }
        }
    }
</script>

<style>
    .cmp-gipfel {
        width: 100%;
        height: 100%;
        background: url(/assets/img/hintergruende/gipfel.png) no-repeat left bottom;
    }
</style>