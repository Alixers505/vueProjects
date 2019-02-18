"use strict";

// emojify returns the corresponding emoji image
function emojify(name) {
    var out = `<img src="emojis/` + name + `.png">`;
    return out
}


// rand returns a random item from an array
function rand(...arr) {
    var x = Math.floor(Math.random() * arr.length)
    return arr[x]
}

// cast returns a spell (function) that decorates the wizard
function cast(emoji) {
    var magic = emojify("magic")
    return function (wizard) {
        return wizard + " " + magic + " " + emoji + " " + magic
    }
}

var welcome = new Vue( {
    el: '#welcome',
    data: {
        message: 'Click through the navigation to check out various projects.'
    }
});

Vue.component("wizard", {
    props: ["name", "cast"],
    template: `<p v-html="cast(name)"></p>`
});

var app = new Vue({
    el: "#app",
    data: {
        wizard      : "",
        harry       : emojify("harry"      ),
        hedwig      : emojify("hedwig"     ),
        ron         : emojify("ron"        ),
        scabbers    : emojify("scabbers"   ),
        hermione    : emojify("hermione"   ),
        crookshanks : emojify("crookshanks"),
        active: emojify("sirius--man"),
        // sirius is an object that contains two states: man and dog
        sirius: {
            man: emojify("sirius--man"),
            dog: emojify("sirius--dog")
        }
    },
    methods: {
        wizards: function () {
            return [
                { name: this.harry   , pet: this.hedwig      },
                { name: this.ron     , pet: this.scabbers    },
                { name: this.hermione, pet: this.crookshanks }
            ]
        },

        // an animagus is a wizard whom can shapeshift
        animagus: function () {
            this.active = (
                this.active == this.sirius.man ?
                    this.sirius.dog :
                    this.sirius.man
            )
        },
        // breathe returns the corresponding .breathe--*
        breathe: function () {
            return (
                this.active == this.sirius.man ?
                    "breathe--man" :
                    "breathe--dog"
            )
        },
        // background returns the corresponding background
        background: function () {
            return (
                this.active == this.sirius.man ?
                    "" :
                    "black"
            )
        },

        // oculus_reparo returns a spell (function) that repairs glasses
        oculus_reparo: cast(emojify("oculus-reparo")),
        // wingardium_leviosa returns a spell (function) that levitates an object
        wingardium_leviosa: cast(emojify("wingardium-leviosa")),
        // alohomora returns a spell (function) that unlocks a door
        alohomora: cast(emojify("alohomora"))
    }
});


var catApp = new Vue({
    el: ".app",
    data: {
        cat: emojify("box"),
        alive_cats: [
            emojify("cat--smile"),
            emojify("cat--cheer"),
            emojify("cat--laugh"),
            emojify("cat--love" ),
            emojify("cat--smirk"),
            emojify("cat--kiss" ),
            emojify("cat--fear" ),
            emojify("cat--sad"  ),
            emojify("cat--mad"  )
        ],
        dead_cats: [
            emojify("crossbones"),
            emojify("skull")
        ],
    },
    methods: {
        // is_open returns whether the box is open
        is_open: function () {
            return this.cat != emojify("box")
        },
        // is_alive returns whether the cat is alive
        is_alive: function () {
            return (
                this.cat != emojify("crossbones") &&
                this.cat != emojify("skull"     )
            )
        },
        // quantum_fluctuation observes whether the cat is alive or dead
        quantum_fluctuation: function () {
            if (this.is_open()) {
                this.cat = emojify("box")
                return
            }
            this.cat = rand(
                rand(...this.alive_cats),
                rand(...this.dead_cats),
            )
        },
        jittering: function () {
            return {
                jitter: this.is_alive()
            }
        },
        theme: function () {
            return {
                'theme--alive': this.is_open() && this.is_alive(),
                'theme--dead': !this.is_alive()
            }
        }
    }
});