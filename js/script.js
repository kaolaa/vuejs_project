window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            restaurants: [],
            input: "",
            page: 1,
            pagesize: 5,
            selected: '',
            test: 1,
            search: "",
            idshow: false,
            searchlist: [],
            rdisabled: 0,
            ldisabled: 1,
            nbRestaurant: 0,
            FormAjout: [],
            event: "",
            name_e: "",
            cuisine_e: "",
            modifier: true,
            id_e: ""

        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getDataFromWebService();
            // this.searchrest();
        },
        methods: {
            handleDelete(id) {
                let url = "http://localhost:8080/api/restaurants/" + id;
                this.name_e = " ";
                this.id_e = " ";
                this.cuisine_e = " ";
                fetch(url, {
                    method: "DELETE",
                })
                    .then(function (responseJSON) {
                      
                        responseJSON.json()
                            .then(function (res) {
                                // Maintenant res est un vrai objet JavaScript

                                // this.searchrest();

                                afficheReponseDELETE(res);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            },
            handleCurrentChange(val) {
                this.currentRow = val;
                console.log(val);
                this.name_e = val.name;
                this.id_e = val._id;
                this.cuisine_e = val.cuisine;

            },
            testfct: function () {

                this.test = this.test + 1;
            },

            next: function () {

                this.page++;
                console.log(this.page);
                this.getDataFromWebService();
            },
            back: function () {

                this.page--;
                console.log(this.page);
                this.getDataFromWebService();
            },
            pagesize: function () {
                this.getDataFromWebService();
            }
            ,
            // searchrest() {

            //     this.searchlist=  this.restaurants.filter( (todo) => {  return todo.name.toLowerCase().includes(this.search.toLowerCase()) })
            //      console.log( this.searchlist);
            // },
            getDataFromWebService: function () {
                let url = "http://localhost:8080/api/restaurants?page=" + this.page + "&pagesize=" + this.pagesize;

                fetch(url).then((data) => {
                    // console.log("les données sont arrivées !")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.restaurants = dataEnJavaScript.data;
                    this.nbRestaurant = dataEnJavaScript.count;

                });
            },
            addRestaurant: function () {
                this.restaurants.push({ title: this.input });
                //this.restaurants.push(this.restaurants.length)
                this.input = "";
            },
            getRequest1: function () {
                let url = "http://localhost:8080/api/restaurants";

                fetch(url)
                    .then(function (responseJSON) {
                        responseJSON.json()
                            .then(function (res) {
                                // Maintenant res est un vrai objet JavaScript
                                console.log("Debug : Request1");
                                //console.log(res.data);
                                this.Mytest();
                                this.MyDebug(res);
                                this.afficheReponseGET(res);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        }
        ,
        computed: {
            searchrest() {              
                this.getDataFromWebService();
                return this.restaurants.filter((todo) => {
                    return todo.name.toLowerCase().includes(this.search.toLowerCase())
                    
                })

                    ;

            }
        }

    })
}
// REQUETES PUT
function putRequest(event) {
    event.preventDefault();


    let form = event.target;

    let donneesFormulaire = new FormData(event.target);

    // let id = form._id.value; 
    let id = form.id_e.value;
    console.log(donneesFormulaire);
    let url = "http://localhost:8080/api/restaurants/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
        .then(function (responseJSON) {
            responseJSON.json()
                .then(function (res) {
                    // Maintenant res est un vrai objet JavaScript
                    afficheReponsePUT(res);
                    console.log(res.msg);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}
//Div d'ajout 
function postRequest(event) {

    console.log(event);
    event.preventDefault(); //prevente default behaviour wich is reload
    //FormAjout.preventDefault();

    let form = event.target; // recuperation du doc


    let donneesFormulaire = new FormData(form); //recup des données
    console.log(donneesFormulaire);
    let url = "http://localhost:8080/api/restaurants";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
        .then(function (responseJSON) {
            responseJSON.json()
                .then(function (res) {
                    console.log(res.msg);

                    afficheReponsePOST(res);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
};
function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponseAjout");
    div.innerHTML = reponse.msg;
};
// REQUETES DELETE
function deleteRequest(event) {

}
