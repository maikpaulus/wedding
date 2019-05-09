<template>
    <div class="header-bar">
        <span class="header-title">Mara & Maik</span>

        <Navigation></Navigation>
    </div>
</template>

<script>
    import Navigation from './Navigation';

    export default {
        components: {
            Navigation
        }
    }
</script>

<style>
    .header-bar {
        margin: 1em 0.5em 0;
        padding-bottom: 1em;
        line-height: 1.5;
        border-bottom: 1px solid #f2ede7;
        z-index: 10000;
    }

    .header-bar .header-title {
        font-family: Aphrodite;
        font-weight: 400;
        font-size: 1em;
        color: #f2ede7;
    }
</style>