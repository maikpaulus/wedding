<template>
    <div class="orientation-advice">
        <md-card>
            <md-card-area>
                <md-card-media>
                <img src="/assets/img/elemente/achtung.png" alt="People">
                </md-card-media>

                <md-card-header>
                <div class="md-title">Wichtiger Hinweis</div>
                <div class="md-subhead">präsentiert von Alan und Steve</div>
                </md-card-header>

                <md-card-content>
                    <p>
                        Damit ihr die Animations-Seite optimal sehen könnt, solltet ihr für diese Seite euer Gerät quer halten.
                    </p>
                    <p>
                        Alle anderen Seiten sind wie gewohnt im Portrait-Modus nutzbar.
                    </p>
                    <p>
                        Viel Spaß weiterhin!
                    </p>
                </md-card-content>
            </md-card-area>
        </md-card>
    </div>
</template>

<style>
    .orientation-advice {
        width: 100%;
        height: 100%;
        background-color: #2d2c86;
        z-index: 100000;
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .orientation-advice .md-card {
        margin: 0.5em;
    }

    @media only screen and (orientation:portrait) {
        .orientation-advice {
            display: block;
        }
    }
</style>