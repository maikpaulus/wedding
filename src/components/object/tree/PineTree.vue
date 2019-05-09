<script>
    import Tree from './Tree';

    export default { 
        extends: Tree,

        props: {
            sprites: {
                default() {
                    return {
                        x: 2,
                        y: 0
                    }
                }
            }
        },

        data () {
            return {
                name: 'PineTree'
            }
        }
    }
</script>