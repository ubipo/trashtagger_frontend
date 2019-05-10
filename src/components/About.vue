

<template>
    <div>
        <main id="gridcontact">
            <div class="imageContact">
                <img src="/static/aboutPage2.jpg" alt="About image">
            </div>
        </main>

        <div class="text">

            <h2>About Us</h2>
            <p>We are a team of six people from different countries in Europe and we joined together to make a project for the Hackathon event. After working together for 24 h #trashtag platform was created. </p>

            <p>
                A platform to mark polluted spots and organise cleanup-events, to get points for recycling and . compete with friends. More than just a game - our chance to make a change!

            </p>
            <p> Joining this movement, you can do both - help the Planet and have fun!  </p>
            <p>B smart. B bold. Join us!</p>
            <p>
                And save plan(et) A
            </p>
        


        </div>


        <hr />
        <footer>
            <p>&copy; 2019 - Trash Taggers</p>
        </footer>
    </div>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Contact',
  data () {
    return {
      raid: null,
      error: null
    }
  }
}
</script>

<style scoped>
/* default styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


img {
    border: 0;
}

main img {
    /*added for clube */
    max-width: 100%;
    height: auto;
    margin-top: 0.5em;
}



/*----------------------------------------------------------- 600px -------------*/

@media screen and (min-width: 600px) {
 

    .imageContact {
        padding-top: 3em;
    }
}

/*---------------------------------------------------------------------------------*/

@media screen and (min-width: 768px) {
 
    main img {
        margin-top: 0;
    }


    /*---grid----*/
    #clube section,
    #index section {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: 'h h' 'text image'
    }

    #stats div {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
    }

    #index {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: 'h h' 'content table'
    }

        #clube h2,
        #index h3,
        #index h2 {
            grid-area: h;
        }

        #clube div,
        #index p {
            grid-area: text;
            text-align: justify;
        }

        #clube img,
        #index img {
            grid-area: image;
        }

        #index table {
            grid-area: table;
        }

        #index div {
            grid-area: content;
        }
}

/*---------------------------------------------------------------------------------*/

@media screen and (min-width: 1000px) {
    /*---grid----*/
    #clube section,
    #index section {
        grid-template-columns: 2fr 1fr;
    }
}

/*contacto*/

.imageContact {
    padding-top: 2em;
}



.text{
    text-align:center;
}

h2{
    margin: 50px;
}
</style>
