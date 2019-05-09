<script>
    import Tree from './Tree';

    export default { 
        extends: Tree,

        props: {
            sprites: {
                default() {
                    return {
                        x: 0,
                        y: 1
                    }
                }
            }
        },

        data () {
            return {
                name: 'ChristmasTree'
            }
        }
    }
</script>