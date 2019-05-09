<template>
    <div class="cmp-seilbahn-tal">
        <Mara :size=13></Mara>
        <Maik :size=13 :x=150></Maik>

        <Station :size=11 :x=10 :y=335></Station>
        <station-background :size=11 :x=10 :y=335></station-background>

        <cable-way :size=14 :x=205 :y=405 :persons=true></cable-way>
        <cable-way-raw :size=14 :x=229 :y=405></cable-way-raw>
        <cable-way-door-left :size=14 :x=185 :y=405></cable-way-door-left>
        <cable-way-door-right :size=14 :x=295 :y=405></cable-way-door-right>

        <Kuh :size=16 :x=600 :y=250></Kuh>
        <Kuh :size=16 :x=700 :y=320 direction="right"></Kuh>
        <Kuh :size=16 :x=1000 :y=300></Kuh>

        <Stone :size=12 :x=768 :y=238></Stone>
        <Grass :size=12 :x=768 :y=238></Grass>

        <Stone :size=12 :x=286 :y=195></Stone>
        <Grass :size=12 :x=286 :y=195></Grass>

        <Stone :size=12 :x=319 :y=206 :kind=3></Stone>
        <Grass :size=12 :x=319 :y=206></Grass>

        <Stone :size=12 :x=965 :y=135 :kind=3></Stone>
        <Grass :size=12 :x=965 :y=135></Grass>

        <Stone :size=16 :x=1040 :y=620 :kind=3></Stone>
        <Grass :size=16 :x=1040 :y=620></Grass>

        <Stone :size=10 :x=1020 :y=600 :kind=2></Stone>
        <Grass :size=16 :x=1020 :y=600></Grass>

        <pine-tree :size=12 :x=870 :y=135></pine-tree>
        <Grass :size=16 :x=870 :y=135></Grass>

        <Tulip :size=16 :x=34 :y=215></Tulip>
        <Tulip :size=16 :x=72 :y=205 kind="pink"></Tulip>
        <Tulip :size=16 :x=30 :y=175></Tulip>
        <Tulip :size=16 :x=104 :y=220 kind="pink"></Tulip>
        <Tulip :size=16 :x=52 :y=180 kind="pink"></Tulip>
        <Tulip :size=16 :x=10 :y=220></Tulip>
        <Tulip :size=16 :x=34 :y=210 kind="pink"></Tulip>
        <Tulip :size=16 :x=62 :y=200></Tulip>
        <Tulip :size=16 :x=10 :y=180></Tulip>

        <Stone :size=13 :x=341 :y=332></Stone>

        <div class="preload-images-container">
            <span style="background-image: url('/assets/img/hintergruende/seilbahn.png')"></span>
            <span style="background-image: url('/assets/img/elemente/seilbahn.png')"></span>
            <span style="background-image: url('/assets/img/elemente/huette.png')"></span>
        </div>
    </div>
</template>

<script>
    import Mara from '../object/person/Mara';
    import Maik from '../object/person/Maik';
    import Stone from '../object/Stone';
    import Grass from '../object/Grass';
    import Tulip from '../object/Tulip';
    import PineTree from '../object/tree/PineTree';
    import CableWayRaw from '../object/CableWayRaw';
    import CableWay from '../object/CableWay';
    import Kuh from '../object/Kuh';
    import Station from '../object/cableWay/Station';
    import StationBackground from '../object/cableWay/StationBackground';
    import CableWayDoorLeft from '../object/CableWayDoorLeft';
    import CableWayDoorRight from '../object/CableWayDoorRight';
    import Landscape from './Landscape';

    export default {
        extends: Landscape,
        components: {
            Mara,
            Maik,
            Stone,
            Grass,
            PineTree,
            CableWay,
            CableWayRaw,
            Kuh,
            Tulip,
            Station,
            StationBackground,
            CableWayDoorLeft,
            CableWayDoorRight
        },

        mounted () {
           window.setTimeout(() => { this.start() }, 1000);
        },

        methods: {
            start() {
                let mara = this.$children[0];
                let maik = this.$children[1];
                let cableWay = this.$children[4];
                let cableWayRaw = this.$children[5];
                let cableWayDoorLeft = this.$children[6];
                let cableWayDoorRight = this.$children[7];
                
                let cow = this.$children[8];
                let cow2 = this.$children[9];
                let cow3 = this.$children[10];

                this.setAnimation('welcome', [
                    [mara.pause, {duration: 1500}],
                    [maik.stand, {direction: 'left'}],
                    [maik.speak, {text: 'Ist für die Feier alles vorbereitet?', duration: 3000} ],
                    [mara.stand, {direction: 'right'}],
                    [mara.speak, {text: 'Meinst du im Maschinen- schuppen?', duration: 3000}],
                    [mara.speak, {text: 'Ich denke schon.', duration: 3000}],
                    [maik.speak, {text: 'Weiß denn jeder wo er hinmuss?', duration: 3000} ],
                    [mara.speak, {text: 'Falls nicht, steht es hier unter Anfahrt.', duration: 3000} ],
                    [maik.speak, {text: 'Gut zu wissen, da schau ich mal rein.', duration: 3000} ],
                    [mara.speak, {text: 'Wollen wir weiter?', duration: 3000} ],
                    [maik.speak, {text: 'Schon unterwegs!', duration: 1500} ]
                ]);

                this.setAnimation('mara', [
                    [mara.walkRight, {toX: 400, toY: 80} ],
                    [mara.walkRight, {toX: 1100, toY: 100} ],
                    [mara.walkBack, {toY: 150} ],
                    [mara.walkLeft, {toX: 500, toY: 220} ],
                    [mara.walkLeft, {toX: 300, toY: 300} ],
                    [mara.stand, {direction: 'right'} ],
                    [mara.speak, {text: 'Komm jetzt! Die Seilbahn fährt!', duration: 2000} ],
                    [mara.walkLeft, {toX: 60} ],
                    [mara.walkBack, {toY: 340} ],
                    [mara.walkRight, {toX: 237} ],
                    [mara.walkBack, {toY: 360} ],
                    [mara.stand, {direction: 'front', duration: 1000} ],
                    [mara.disappear]
                ]);

                this.setAnimation('kuehe', [
                    [ cow.eat, {direction: 'left', duration: 3000} ],
                    [ cow3.eat, {direction: 'left', duration: 3000} ],
                    [ cow3.eat, {direction: 'left', duration: 3000} ],
                    [ cow.eat, {direction: 'left', duration: 3000} ],
                    [ cow.eat, {direction: 'left', duration: 3000} ],
                    [ cow3.eat, {direction: 'left', duration: 3000} ],
                    [ cow.eat, {direction: 'left', duration: 3000} ],
                    [ cow3.eat, {direction: 'left', duration: 3000} ],
                    [ cow.eat, {direction: 'left', duration: 3000} ],
                    [ cow.eat, {direction: 'left', duration: 3000} ],
                ]);

                this.setAnimation('maik', [
                    [maik.walkRight, {toX: 400, toY: 80} ],
                    [maik.walkRight, {toX: 1100, toY: 100} ],
                    [maik.walkBack, {toY: 275} ],
                    [mara.startThink, {text: 'Wo läuft der denn wieder hin?'} ],
                    [maik.stand, {direction: 'left', duration: 500} ],
                    [maik.walkLeft, {toX: 950, toY: 280} ],
                    [mara.stopThink],
                    [maik.walkLeft, {toX: 800, toY: 300} ],
                    [maik.stand, {direction: 'front', duration: 2000} ],
                    [maik.think, {text: 'Ganz schön verfressen, die Kühe...', duration: 2000} ],
                    [maik.think, {text: '... da würde ich gut hinpassen!', duration: 2000} ],
                    [maik.walkLeft, {toX: 600} ],
                    [maik.walkLeft, {toX: 300} ],
                    [maik.stopThink],
                    [maik.startSpeak, {text: 'Bin ja schon da...'} ],
                    [maik.walkLeft, {toX: 60} ],
                    [maik.stopSpeak],
                    [maik.walkBack, {toY: 340} ],
                    [maik.walkRight, {toX: 237} ],
                    [maik.walkBack, {toY: 360} ],
                    [maik.stand, {direction: 'front', duration: 1000} ],
                    [maik.disappear]
                ]);

                this.setAnimation('cw-doorleft', [
                    [ cableWayDoorLeft.walkRight, {toX: 203} ]
                ]);

                this.setAnimation('cw-doorright', [
                    [ cableWayDoorRight.walkLeft, {toX: 275} ],
                    [ cableWayDoorRight.pause, {duration: 2000} ]
                ]);

                this.setAnimation('cw-run', [
                    [ cableWayDoorLeft.disappear ],
                    [ cableWayDoorRight.disappear ],
                    [ cableWayRaw.disappear ],
                    [ cableWay.walkRight, {toX: 1500, toY: 665} ]
                ]);

                this.startAnimation('welcome');

                this.$on('welcome.animation.finished', () => {
                    this.startAnimation('maik');
                    this.startAnimation('kuehe');

                    window.setTimeout(() => {
                        this.startAnimation('mara');
                    }, 2000);
                });

                this.$on('maik.animation.finished', () => {
                    this.startAnimation('cw-doorleft');
                    this.startAnimation('cw-doorright');
                });

                this.$on('cw-doorright.animation.finished', () => {
                    this.startAnimation('cw-run');
                });

                this.$on('cw-run.animation.finished', () => {
                    this.$parent.next();
                });
            }
        }
    }
</script>

<style>
    .cmp-seilbahn-tal {
        width: 100%;
        height: 100%;
        background: url(/assets/img/hintergruende/talstation.png) no-repeat left bottom;
    }
</style>