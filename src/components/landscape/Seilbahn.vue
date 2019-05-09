<template>
    <div class="cmp-seilbahn">
        <cable-way :size=8 :x=-1700 :y=20></cable-way>
        <cable-way :size=8 :x=-900 :y=100></cable-way>
        <cable-way :size=8 :x=-100 :y=180 :persons=true></cable-way>
        <cable-way :size=8 :x=700 :y=259></cable-way>
        <cable-way :size=8 :x=1500 :y=345></cable-way>
        
        <Kuh :size=6.75 :x=320 :y=90 color="grey" direction="right"></Kuh>
        <Kuh :size=6.75 :x=590 :y=50></Kuh> 

        <Huette :size=16 :x=10 :y=100></Huette>

        <christmas-tree :size=8 :x=10 :y=30></christmas-tree>
        <christmas-tree :size=8 :x=30 :y=20></christmas-tree>

        <Stone :size=6 :x=100 :y=20></Stone>
        <Gras :size=8 :x=100 :y=20></Gras>

        <div class="images-preload-container">
            <span style="background-image: url('/assets/img/hintergruende/bergstation.png')"></span>
            <span style="background-image: url('/assets/img/elemente/murmeltier.png')"></span>
            <span style="background-image: url('/assets/img/elemente/bergstation.png')"></span>
            <span style="background-image: url('/assets/img/elemente/bergstation-back.png')"></span>
            <span style="background-image: url('/assets/img/elemente/schild.png')"></span>
        </div>
    </div>
</template>

<script>
    import Landscape from './Landscape';
    import CableWay from '../object/CableWay';
    import Huette from '../object/Huette';
    import Kuh from '../object/Kuh';
    import ChristmasTree from '../object/tree/ChristmasTree';
    import Stone from '../object/Stone';
    import Gras from '../object/Grass';

    export default {
        extends: Landscape,
        components: {
            CableWay,
            Huette,
            Kuh,
            Stone,
            ChristmasTree,
            Gras
        },

        mounted () {
            window.setTimeout(() => { this.start() }, 1000);
        },

        methods: {
            start() {
                let cableWay1 = this.$children[0];
                let cableWay2 = this.$children[1];
                let cableWay3 = this.$children[2];
                let cableWay4 = this.$children[3];
                let cableWay5 = this.$children[4];

                let cow = this.$children[5];
                let cow2 = this.$children[6];

                this.setAnimation('cw1', [
                    [cableWay1.walkRight, {toX: 2000, toY: 395} ]
                ]);

                this.setAnimation('cw2', [
                    [cableWay2.walkRight, {toX: 2000, toY: 395} ]
                ]);

                this.setAnimation('cw3', [
                    [cableWay3.walkRight, {toX: 2000, toY: 395} ]
                ]);

                this.setAnimation('cw4', [
                    [cableWay4.walkRight, {toX: 2000, toY: 395} ]
                ]);

                this.setAnimation('cw5', [
                    [cableWay5.walkRight, {toX: 2000, toY: 395} ]
                ]);

                this.setAnimation('kuh1', [
                    [ cow.eat, {duration: 3000} ],
                    [ cow.eat, {duration: 3000} ],
                    [ cow.eat, {duration: 3000} ],
                    [ cow.eat, {duration: 3000} ],
                    [ cow.eat, {duration: 3000} ]
                ]);

                this.setAnimation('kuh2', [
                    [ cow2.eat, {duration: 4000} ],
                    [ cow2.eat, {duration: 4000} ],
                    [ cow2.eat, {duration: 4000} ],
                    [ cow2.eat, {duration: 4000} ],
                    [ cow2.eat, {duration: 4000} ]
                ]);

                this.startAnimation('cw1');
                this.startAnimation('cw2');
                this.startAnimation('cw3');
                this.startAnimation('cw4');
                this.startAnimation('cw5');

                this.startAnimation('kuh1');
                this.startAnimation('kuh2');

                this.$on('cw3.animation.finished', () => {
                    this.$parent.next();
                });
            }
        }
    }
</script>

<style>
    .cmp-seilbahn {
        width: 100%;
        height: 100%;
        background: url(/assets/img/hintergruende/seilbahn.png) no-repeat left bottom;
    }
</style>