<template>
    <div class="header">
        <ul class="header-button-left">
            <li v-if="step == 1 || step == 2" @click=" step--">Cancel</li>
        </ul>
        <ul class="header-button-right">
            <li v-if="step == 1" @click=" step++">Next</li>
            <li v-if="step == 2" @click="publish()">Publich</li>

        </ul>
        <img src="./assets/logo.png" class="logo" />
    </div>
 
    <Container @write="writtenPost = $event" :myimage="myimage" :blogs="blogs" :step="step" />
   
    <div class="footer">
        <ul class="footer-button-plus">
            <input @change="upload" type="file" id="file" class="inputfile" />
            <label for="file" class="input-plus">+</label>
        </ul>
    </div>

</template>

<script>
    import Container from './components/Container';
    import postdata from './assets/postdata.js'
import axios from 'axios';
 
 

export default {
        name: 'App',

        data() {
            return {
                step : 0,
                blogs: postdata,
                myimage: '',
                writtenPost: '',
                SelectedFilter : '' 
            }
        },

        mounted() {
            this.emitter.on('BoxSelected', (a) => {
                this.SelectedFilter = a
            })
        },

      components: {
          Container,
            },
            methods: {
                more() {
                    axios.get('https://codingapple1.github.io/vue/more0.json')
                        .then((result)=> {
                            this.blogs.push(result.data);
                        })
                },
                upload(e) {
                    let a = e.target.files;
                    let url = URL.createObjectURL(a[0]);
                    console.log(url);
                    this.myimage = url;
                    this.step = 1;
                },
                publish() {
                    var myPost = {
                        name: "Seol Shin",
                        userImage: "https://placeimg.com/100/100/arch",
                        postImage: this.myimage,
                        likes: 36,
                        date: "August 2",
                        liked: false,
                        content: this.writtenPost,
                        filter: this.SelectedFilter
                    };
                    this.blogs.unshift(myPost);
                    this.step = 0;
                    //console.log(this.step);
                }, 
            }
    }
</script>

<style>
    body {
        margin: 0;
    }

    ul {
        padding: 5px;
        list-style-type: none;
    }

    .logo {
        width: 22px;
        margin: auto;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 13px;
    }

    .header {
        width: 100%;
        height: 40px;
        background-color: white;
        padding-bottom: 8px;
        position: sticky;
        top: 0;
    }

    .header-button-left {
        color: skyblue;
        float: left;
        width: 50px;
        padding-left: 20px;
        cursor: pointer;
        margin-top: 10px;
    }

    .header-button-right {
        color: skyblue;
        float: right;
        width: 50px;
        cursor: pointer;
        margin-top: 10px;
    }

    .footer {
        width: 100%;
        position: sticky;
        bottom: 0;
        padding-bottom: 10px;
        background-color: white;
    }

    .footer-button-plus {
        width: 80px;
        margin: auto;
        text-align: center;
        cursor: pointer;
        font-size: 24px;
        padding-top: 12px;
    }

    .sample-box {
        width: 100%;
        height: 600px;
        background-color: bisque;
    }

    .inputfile {
        display: none;
    }

    .input-plus {
        cursor: pointer;
    }

    #app {
        box-sizing: border-box;
        font-family: "consolas";
        margin-top: 60px;
        width: 100%;
        max-width: 460px;
        margin: auto;
        position: relative;
        border-right: 1px solid #eee;
        border-left: 1px solid #eee;
    }
</style>
