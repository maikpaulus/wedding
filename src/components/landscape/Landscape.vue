<script>
    export default {
        data() {
            return {
                $animations: []
            }
        },

        methods: {
            start() {},

            setAnimation(name, animations) {
                this.$data.$animations[name] = {
                    animations: animations,
                    current: 0
                };

                let index = this.$data.$animations.length - 1;
                let animationLength = this.$data.$animations[name].animations.length;

                this.$on(name + '.animation.next', () => {
                    let current = ++this.$data.$animations[name].current;
                    if (current < animationLength) {
                        return this.startAnimation(name, current); 
                    }

                    this.$off(name + '.animation.next');
                    this.$emit(name + '.animation.finished');
                });
            },

            startAnimation(name, index) {
                if (!name) {
                    return console.error('eindeutiger Name fehlt!');
                }

                index = index || 0;

                let anFunc = this.$data.$animations[name].animations[index][0];
                let anArgs = this.$data.$animations[name].animations[index][1];
                
                anArgs = anArgs || {};
                anArgs = [ anArgs ]
                anArgs.push(name, this);

                if ('function' === typeof anFunc) {
                    anFunc.apply(this, anArgs);
                }
            }
        }
    };

</script>