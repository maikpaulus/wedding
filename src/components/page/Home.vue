<template>
    <div class="cmp-home-page" v-if="authenticated">
        <component :is="landscape"></component>

        <Navigation ref="navigation"></Navigation>

        <div id="landscape-overlay"></div>
        <orientation-advice></orientation-advice>
    </div> 
</template>

<script>
    import Navigation from '../elements/Navigation';
    import OrientationAdvice from '../elements/OrientationAdvice';
    import SeilbahnTal from '../landscape/SeilbahnTal';
    import SeilbahnBerg from '../landscape/SeilbahnBerg';
    import Seilbahn from '../landscape/Seilbahn';
    import Gipfel from '../landscape/Gipfel';
    import Tal from '../landscape/Tal';
    import Schluss from '../landscape/Schluss';
    import $ from 'jquery';

    const LANDSCAPES = [
        'Tal',
        'SeilbahnTal',
        'Seilbahn',
        'SeilbahnBerg',
        'Gipfel',
        'Schluss'
    ];

    export default {
        beforeCreate () {
            window.scrollTo(0,0);

            if (null === this.$store.getters.get('group')) {
                return this.$store.dispatch('changePage', 'authenticate');
            }

            if ('home' !== this.$store.getters.get('route')) {
                return this.$store.dispatch('changePage', 'home');
            }
        },

        created () {
            this.setViewportSize();
            window.addEventListener('orientationchange', this.setViewportSize);
        },

        data () {
            return {
                group: this.$store.getters.get('group'),
                landscape: this.$store.getters.get('landscape'),
                animate: false,
                authenticated: !!this.$store.getters.get('group'),
                proportions: 1
            };
        },

        beforeUpdate () {
            let delay = 500;

            if (this.$data.animate) {
                $('#landscape-overlay').fadeOut(delay);
            }
        },

        updated () {
            this.$data.animate = false;
        },

        computed: {
            individualGreeting () {
                let greeting = [];
                Object.keys(this.$data.users).forEach( (key) => {
                    greeting.push(
                        this.$data.users[key].firstname + ' ' + this.$data.users[key].lastname
                    );
                });

                return greeting.join(', ');
            }
        },

        methods: {
            fadeOut() {

            },

            setViewportSize() {
                const viewport = document.querySelector("meta[name=viewport]");
                const isiOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

                let portraitViewport = 'width=device-width, initial-scale=1.0, user-scalable=no';
                let landscapeViewport = 'width=1366, user-scalable=no';

                let hasLandscapeMode = screen.width > screen.height;
                this.$data.proportions = 1366 / (isiOSDevice ? screen.height : screen.width);
                
                if (isiOSDevice) {
                    hasLandscapeMode = window.matchMedia('(orientation: landscape)').matches;
                }

                let delay = isiOSDevice && hasLandscapeMode ? 1000 : 0;

                let viewportVal = hasLandscapeMode ? landscapeViewport : portraitViewport;

                if ('home' !== this.$store.getters.get('route')) {
                    viewportVal = portraitViewport;
                }

                window.setTimeout(() => {
                    viewport.setAttribute('content', viewportVal);

                    $('.navigation').css('cssText', 'font-size: ' + 40*(this.$data.proportions > 1 ? this.$data.proportions : 1) + 'px !important');
                    
                    if (this.$refs.navigation) {
                        this.$refs.navigation.$emit('changeFontSize', this.$data.proportions);
                    }
                    
                    if ($('.md-dialog-container')) {
                        $('.md-dialog-container').css('cssText', 'font-size: ' + 16*(this.$data.proportions > 1 ? this.$data.proportions : 1) + 'px !important');
                    }

                    if ($('.cmp-schluss .replay')) {
                        $('.cmp-schluss .replay').css('cssText', 'font-size: ' + 40*(this.$data.proportions > 1 ? this.$data.proportions : 1) + 'px !important')
                    }

                    if (hasLandscapeMode && 'home' === this.$store.getters.get('route')) {
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                    else {
                        window.scrollTo(0, 1);
                    }
                }, delay);
            },

            getProportions() {
                return this.$data.proportions;
            },

            next() {
                let landscape = LANDSCAPES.indexOf(this.$data.landscape);
                let next = landscape === -1 || landscape === LANDSCAPES.length -1 ? 0 : landscape + 1;

                $('#landscape-overlay').fadeIn(500, () => {
                    this.$store.dispatch('changeLandscape', LANDSCAPES[next]);
                    this.$data.landscape = LANDSCAPES[next];
                });
            },
        },

        watch: {
            landscape: function (newLandscape) {
                this.$data.animate = true;
            }
        },

        components: {
            Navigation,
            OrientationAdvice,
            SeilbahnTal,
            Seilbahn,
            SeilbahnBerg,
            Gipfel,
            Tal,
            Schluss
        }
    }
</script>

<style>
    .cmp-home-page {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .md-fab {
        background-color: #F2EDE7 !important;
        color: #2d2c86 !important;
    }

    .md-menu {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 100000;
    }
    
    #app.home .md-menu {
        position: fixed;
    }

    .md-menu-content {
        left: auto !important;
        right: 1em !important;    
    }

    #landscape-overlay {
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 100000;
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }
</style>