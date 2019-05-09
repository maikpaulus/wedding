<script>
    import Person from './Person';

    export default { 
        extends: Person,
        props: {
            shift: {
                default() {
                    return {
                        x: 0,
                        y: 2
                    }
                }
            },
        }
    }
</script>