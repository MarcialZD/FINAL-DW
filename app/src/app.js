import Ingredientes from './components/ingredientes.js';
import Servicios from './services/api.js';

var app = new Vue({
    el: '#app',
    data: {
        myNombre: 'Marcial Octavio',
        myApellido: 'Zegarra Diaz',
        isIngredientes: true,
        myIngredientes: [],
        myIngredientesSeleccionados: [],
        isSelecciona: false,
        isCompletoDos: false,
        myRecetas: [],
        recetaSeleccionada: null,
        recetaImagen: null
    },
    components: {
        Ingredientes
    },
    methods: {
        initMenssage: function () {
            console.log("Bienvenidos a mi examen final");
        },
        async fetchData() {
            const servicio = new Servicios();            
            servicio.fetchData((error, response) => {
                if (error) {
                    console.error('Error al obtener ingredientes:', error);
                } else {
                    this.myIngredientes = response;
                    this.isIngredientes = (this.myIngredientes.length > 0);
                }
            });
        },
        async fetchDatar() {
            const servicio = new Servicios();            
            servicio.fetchDatar((error, response) => {
                if (error) {
                    console.error('Error al obtener recetas:', error);
                } else {
                    this.myRecetas = response;
                    console.log('Recetas obtenidas:', this.myRecetas);
                }
            });
        },
        handerdlIngrediente: function(id) {
            let ingredienteSeleccionado = this.myIngredientes.find(ingrediente => ingrediente.id == id);

            if (!ingredienteSeleccionado) {
                return; 
            }

            let yaSeleccionada = this.myIngredientesSeleccionados.some(cc => cc.id == id);

            if (yaSeleccionada) {
                alert("Este ingrediente ya está seleccionado.");
                return;
            }

            if (this.myIngredientesSeleccionados.length < 2) {
                this.myIngredientesSeleccionados.push(ingredienteSeleccionado);

                if (this.myIngredientesSeleccionados.length == 1) {
                    alert("Falta escoger una más");
                } else if (this.myIngredientesSeleccionados.length == 2) {
                }
            } else {
                alert("Ya no se puede seleccionar más de 2 ingredientes");
            }

            this.isSelecciona = true;
        },
        handerlRemoveIngrediente: function(id) {
            this.myIngredientesSeleccionados = this.myIngredientesSeleccionados.filter(item => item.id !== id);

            if (this.myIngredientesSeleccionados.length == 0) {
                this.isSelecciona = false;  
            }     
        },
        handleCocinar: function() {
            if (this.myIngredientesSeleccionados.length == 2) {
                let ids = this.myIngredientesSeleccionados.map(ingrediente => ingrediente.id);
                let receta = this.myRecetas.find(receta => 
                    (receta.ingrediente1.id === ids[0] && receta.ingrediente2.id === ids[1]) ||
                    (receta.ingrediente1.id === ids[1] && receta.ingrediente2.id === ids[0])
                );
                
                if (receta) {
                    this.recetaSeleccionada = receta.receta;
                    this.recetaImagen = receta.url; 
                    alert(`Felicidades, has logrado cocinar un ${this.recetaSeleccionada}`);
                } else {
                    alert("No hay receta para esta combinación de ingredientes.");
                    this.recetaSeleccionada=null;
                    this.recetaImagen=null;
                }
            } else {
                alert("Debe seleccionar 2 ingredientes para cocinar.");
            }
        }
    },
    mounted() {
        this.fetchData();
        this.fetchDatar();
        this.initMenssage();
    },
    template: `
        <div>
            <Ingredientes 
                :ingredientes="myIngredientes" 
                :isingredientes="isIngredientes"
                :isselecciona="isSelecciona"
                :ingredientesseleccionados="myIngredientesSeleccionados"
                @clickingredienteremove="handerlRemoveIngrediente"
                @clickingrediente="handerdlIngrediente"
                @btn-cocinar="handleCocinar"
                :recetaseleccionada="recetaSeleccionada"
                :recetaImagen="recetaImagen"
            />
        </div>
    `
});
