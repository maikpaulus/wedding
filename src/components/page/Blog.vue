<template>
    <div class="cmp-page blog">
        <div class="header">
            <div class="overlay"></div>
            <h1>#maythenorth</h1>
        </div> 
        <main> 
            <div>
                <div 
                    v-bind:key="key"
                    v-if="posts && posts.length > 0"
                    v-for="(post, key) in posts">
                    <h3>
                        <span class="date">
                            <span class="month">{{post.momentDate.month}}</span>
                            <span class="day">{{post.momentDate.day}}</span>
                            <span class="year">{{post.momentDate.year}}</span>
                        </span>{{post.title}}
                    </h3>
                    <div v-html="post.html"></div>
                </div>
                <div v-else>
                    <p>
                        Es konnte leider kein Blogeintrag gefunden werden. Komm doch einfach später wieder.
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            return {
                posts: false
            }
        },

        mounted() {
            this.$http.get('https://blog.maikpaulus.com/ghost/api/v0.1/posts', {
                params: {
                    client_id: 'ghost-frontend',
                    client_secret: '5a060335b847',
                    filter: 'tags:[maythenorth]',
                }
            })
            .then(response => {
                let posts = response.data.posts;
                
                return posts.map(entry => {
                    return {
                        id: entry.id,
                        title: entry.title,
                        slug: entry.slug,
                        created_at: entry.created_at,
                        plaintext: entry.plaintext,
                        html: entry.html
                    } 
                });
            })
            .then((posts) => {
                posts = posts.map((entry) => {
                    let momentDate = moment(entry.created_at).locale('de');
                    
                    // correct date format to display
                    entry.momentDate = {
                        day: momentDate.format('D'),
                        month: momentDate.format('MMM').replace('.', ''),
                        year: momentDate.format('YYYY')
                    }

                    return entry;
                });

                this.$data.posts = posts;
                return posts;
            }).catch((err) => {
                this.$data.posts = false;
            });
        }
    }
</script>

<style>
    .cmp-page.blog .header {
        background: url('/assets/img/preikestolen-quer.jpg') no-repeat center;
        background-size: cover;
        width: 100%;
        height: 100%;
    }

    .cmp-page.blog .header .overlay{
        background: rgba(0,0,0,0.3);
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }

    .cmp-page.blog h1 {
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
        font-size: 4rem;
        text-align: center;
        padding-top: 3em;
        color: #fff;
        z-index: 200;
        position: relative;
        margin: 0;
    }

    .cmp-page.blog main {
        background: #fff;
        padding: 1.5em 1em;
        color: #000;
    }

    .cmp-page.blog main  h3 > span.date {
        background-color: #2d2c86;
        color: #fff;
        padding: 0.2rem 0.45rem;
        border-radius: 5px;
        margin-right: 0.5rem;
        display: inline-block;
        position: relative;
        top: 0.2em;
    }

    .cmp-page.blog main  h3 > span.date span {
        display: block;
        font-size: 0.7em;
        line-height: 1.1em;
        text-align: center;
        font-weight: normal;
        width: 100%;
        transition: 500ms;
        text-transform: uppercase;
    }

    .cmp-page.blog main  h3 > span.date span.year {
        opacity: 0;
        position: absolute;
        top: 0.8em;
        left: 0;
    }

    .cmp-page.blog main  h3 > span.date:hover span.month,
    .cmp-page.blog main  h3 > span.date:hover span.day {
        opacity: 0;
    }

    .cmp-page.blog main  h3 > span.date:hover span.year {
        opacity: 1;
    }

    .cmp-page.blog main  h3 {
        color: #2d2c86;
        font-size: 1.2rem;
        margin-bottom: 0;
        margin-top: 1em;
    }

    .cmp-page.blog main  h3 + p {
        margin-top: 0.5rem;
    }

    .cmp-page.blog main  .grid-x > .cell {
        padding: 0 1rem;
    }

    .cmp-page.blog main  .grid-x > .cell > p:last-child a {
        background: #2d2c86;
        display: inline-block;
        padding: 0.25rem 1rem;
        color: #fff;
        border-radius: 2px;
        border: 2px solid #26845e;
        cursor: pointer;
    }

    @media (max-width: 63.9975rem) {
        .cmp-page.blog main  .grid-x > .cell {
            padding: 0;
        }
    }

    @media (max-width: 47.9975rem) {
        .start-image {
            height: 10em;
        }

        .cmp-page.blog main  h3 {
            margin-top: 0.5rem;
        }
    }

    @media (max-width: 39.9975rem) {
        .cmp-page.blog .header {
            background: url('/assets/img/preikestolen-hoch.jpg') no-repeat center;
            background-size: 100% 100%;
        }

        .cmp-page.blog h1 {
            font-size: 2.5em;
        }
    }

    @media (min-width: 601px) {
        .md-flex-small-100 {
            min-width: 100%;
            -ms-flex: 0 1 100%;
            flex: 0 1 100%;
        }
    }

    @media (min-width: 769px) {
        .md-flex-medium-50 {
            min-width: 50%;
            -ms-flex: 0 1 50%;
            flex: 0 1 50%;
            padding: 0 1em;
        }
    }

    @media (min-width: 1281px) {
        .md-flex-large-33 {
            min-width: 33.33333%;
            -ms-flex: 0 1 33.33333%;
            flex: 0 1 33.33333%;
        }
    }
</style>