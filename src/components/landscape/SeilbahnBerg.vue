<template>
    <div class="cmp-seilbahn-berg">
        <cable-way :size=11 :x=-456 :y=255></cable-way>
        
        <cable-way-raw :size=11 :x=61 :y=354 :visible=false></cable-way-raw>
        <cable-way-door-left :size=11 :x=40 :y=354 :visible=false></cable-way-door-left>
        <cable-way-door-right :size=11 :x=90 :y=354 :visible=false></cable-way-door-right>
        
        <Mara :size=10.5 :x=69 :y=314 :visible=false></Mara>
        <Maik :size=10.5 :x=69 :y=314 :visible=false></Maik>

        <Murmeltier :size=9 :x=430 :y=200 action="sit"></Murmeltier>
        <Murmeltier :size=9 :x=800 :y=200 action="sit"></Murmeltier>

        <Station :size=9 :x=10 :y=300 kind="berg"></Station>
        <station-background :size=9 :x=10 :y=300 kind="berg"></station-background>

        <Kuh :size=12 :x=150 :y=50 color="grey"></Kuh>
        <Kuh :size=12 :x=250 :y=90 direction="right"></Kuh>
        <Kuh :size=12 :x=100 :y=20></Kuh>

        <Sign :size=16 :x=1020 :y=240></Sign>
        <Stone :size=7 :x=1030 :y=240></Stone>

        <Stone :size=7 :x=20 :y=290></Stone>
        <Stone :size=9 :x=45 :y=285></Stone>
        <Stone :size=6 :x=130 :y=292></Stone>
        <Stone :size=7 :x=145 :y=292></Stone>

        <Stone :size=8 :x=255 :y=290></Stone>
        <Stone :size=6 :x=285 :y=290></Stone>

        <christmas-tree :size=9 :x=530 :y=90></christmas-tree>
        <christmas-tree :size=9 :x=730 :y=110></christmas-tree>
        <christmas-tree :size=9 :x=850 :y=120></christmas-tree>

        <div class="preload-images-container">
            <span style="background-image: url('/assets/img/hintergruende/gipfel.png')"></span>
            <span style="background-image: url('/assets/img/elemente/flugzeug.png')"></span>
            <span style="background-image: url('/assets/img/elemente/gipfelkreuz.png')"></span>
            <span style="background-image: url('/assets/img/elemente/edelweiss.png')"></span>
        </div>
    </div>
</template>

<script>
    import Mara from '../object/person/Mara';
    import Maik from '../object/person/Maik';
   
    import CableWay from '../object/CableWay';
    import Station from '../object/cableWay/Station';
    import Stone from '../object/Stone';
    import StationBackground from '../object/cableWay/StationBackground';
    import CableWayDoorLeft from '../object/CableWayDoorLeft';
     
    import CableWayDoorRight from '../object/CableWayDoorRight';
    import CableWayRaw from '../object/CableWayRaw';
    import Kuh from '../object/Kuh';
    import Sign from '../object/Sign';
    import Murmeltier from '../object/Murmeltier';

    import Landscape from './Landscape';
    import ChristmasTree from '../object/tree/ChristmasTree';

    export default {
        extends: Landscape,
        components: {
            Mara,
            Maik,
            Station,
            StationBackground,
            Stone,
            CableWay,
            CableWayRaw,
            CableWayDoorLeft,
            CableWayDoorRight,
            Kuh,
            Murmeltier,
            ChristmasTree,
            Sign
        },

        mounted () {
            window.setTimeout(() => { this.start() }, 1000);
        },

        methods: {
            start() {
                let cableWay = this.$children[0];
                let cwRaw = this.$children[1];
                let cwDoorLeft = this.$children[2];
                let cwDoorRight = this.$children[3];
                let mara = this.$children[4];
                let maik = this.$children[5];

                let alan = this.$children[6];
                let steve = this.$children[7];

                this.setAnimation('cw', [
                    [ cableWay.walkRight, {toX: 40, toY: 354} ],
                    [ cableWay.pause, {duration: 2000} ],
                    [ cwDoorLeft.appear ],
                    [ cwDoorRight.appear ],
                    [ cwRaw.appear ],
                    [ mara.appear ],
                    [ maik.appear ],
                    [ cableWay.disappear ]
                ]);   

                this.setAnimation('cw-doorleft', [
                    [ cwDoorLeft.walkLeft, {toX: 26} ]
                ]);

                this.setAnimation('cw-doorright', [
                    [ cwDoorRight.walkRight, {toX: 111} ]
                ]);

                this.setAnimation('maik', [
                    [ maik.pause, {duration: 2000} ],
                    [ maik.walkRight, {toX: 200} ],
                    [ alan.stand, {direction: 'left'} ],
                    [ maik.walkFront, {toY: 290} ],
                    [ maik.greet, {direction: 'right', duration: 2000} ],
                    [ maik.walkRight, {toX: 500, toY: 40} ],
                    [ maik.stand, {direction: 'left'} ],
                    [ alan.stand, {direction: 'right'} ],
                    [ maik.speak, {text: 'Hast du dich verlaufen?', duration: 2000} ],
                    [ maik.walkRight, {toX: 500} ],
                    [ maik.walkRight, {toX: 900} ],
                    [ maik.stand, {direction: 'front', duration: 2000} ],
                    [ maik.walkLeft, {toX: 700} ],
                    [ maik.stand, {direction: 'front', duration: 2000} ]
                ]);  

                this.setAnimation('mara', [
                    [ mara.walkLeft, {toX: -70, toY: 301} ],
                    [ mara.walkFront, {toY: 20} ],
                    [ mara.walkRight, {toX: 30, toY: 40} ],
                    [ mara.stand, {direction: 'front'} ],
                    [ alan.stand, {direction: 'left'} ],
                    [ mara.speak, {text: 'Na toll, wie soll ich da vorbei?', duration: 2000}],
                    [ mara.walkBack, {toY: 70} ],
                    [ mara.startSpeak, {text: 'Platz da bitte!'}],
                    [ mara.walkRight, {toX: 300} ],
                    [ mara.stopSpeak],
                    [ mara.walkRight, {toX: 400, toY: 60} ],
                    [ alan.sit, {direction: 'right'} ],
                    [ mara.stand, {direction: 'front'} ]
                ]);

                this.setAnimation('conversation', [
                    [ maik.stand, {direction: 'left'} ],
                    [ maik.speak, {text: 'Apropos Anfahrt...', duration: 3000} ],
                    [ maik.speak, {text: 'Wo können die Gäste denn übernachten?', duration: 3000} ],
                    [ mara.stand, {direction: 'right'} ],
                    [ mara.speak, {text: 'Da gibt es einige Möglichkeiten.', duration: 3000} ],
                    [ mara.speak, {text: 'Schau einfach unter Kontakt nach.', duration: 3000} ],
                    [ maik.speak, {text: 'Das mach ich dann später mal.', duration: 3000} ]
                ]);

                this.setAnimation('maik-2', [
                    [ maik.walkRight, {toX: 1040, toY: 150} ],
                    [ maik.walkBack, {toY: 230} ],
                    [ steve.sit, {direction: 'right'} ],
                    [ maik.stand, {direction: 'back', duration: 2000} ],
                    [ maik.walkLeft, {toX: 900, toY: 200} ],
                    [ steve.stand, {direction: 'right'} ],
                    [ maik.stand, {direction: 'left'}],
                    [ maik.speak, {text: 'Ok ok, ich geh ja schon!', duration: 3000} ],
                    [ maik.walkRight, {toX: 1300, toY: 300} ],
                    [ steve.sit, {direction: 'right'} ],
                    [ maik.walkRight, {toX: 1500, toY: 230} ],
                    [ maik.walkRight, {toX: 2000} ],
                ]);

                this.setAnimation('mara-2', [
                    [ mara.walkRight, {toX: 900, toY: 40} ],
                    [ mara.walkRight, {toX: 1040, toY: 150} ],
                    [ mara.walkBack, {toY: 230} ],
                    [ mara.stand, {direction: 'back', duration: 1500} ],
                    [ mara.walkRight, {toX: 1300, toY: 300} ],
                    [ mara.walkRight, {toX: 1500, toY: 230} ],
                ]);

                this.startAnimation('cw'); 

                this.$on('cw.animation.finished', () => {
                    this.startAnimation('cw-doorleft');
                    this.startAnimation('cw-doorright');
                }); 

                this.$on('cw-doorright.animation.finished', () => {
                    this.startAnimation('maik');

                    window.setTimeout(() => {
                        this.startAnimation('mara');
                    }, 2000);
                });    

                this.$on('maik.animation.finished', () => {
                    this.startAnimation('conversation');
                });

                this.$on('conversation.animation.finished', () => {
                    this.startAnimation('maik-2');
                    this.startAnimation('mara-2');
                });

                this.$on('mara-2.animation.finished', () => {
                    this.$parent.next();
                });
            }
        }
    }
</script>

<style>
    .cmp-seilbahn-berg {
        width: 100%;
        height: 100%;
        background: url(/assets/img/hintergruende/bergstation.png) no-repeat left bottom;
    }
</style>