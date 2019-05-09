<script>
    import Tree from './Tree';

    export default { 
        extends: Tree,

        props: {
            sprites: {
                default() {
                    return {
                        x: 0,
                        y: 0
                    }
                }
            }
        },

        data () {
            return {
                name: 'TriangleTree'
            }
        }
    }
</script>