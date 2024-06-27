export default {
    template: `
        <div id="container">
            <div id="ingredientes">
                <h1>Lista de ingredientes</h1>
                <div class="listIngredientes">
                    <ul v-if="isingredientes">
                        <li v-for="ingrediente in ingredientes" :key="ingrediente.id" @click="clickHanderdl(ingrediente.id)">
                            <i></i>        
                            <span>{{ ingrediente.nombre }}</span>
                        </li>
                    </ul>
                    <p v-else class="notIngredientes">
                        No hay Ingredientes
                    </p>
                    <button id="btn_cocinar" @click="cocinar">Cocinar</button>
                </div>
            </div>

            <div id="recetas">
                <h1 v-if="recetaseleccionada">Felicidades, has logrado cocinar un {{ recetaseleccionada }}</h1>
                <h1 v-else="recetaseleccionada">No se encontró receta</h1>
                
                <h3 v-if="isselecciona">Ingredientes:</h3>

                <div v-if="isselecciona" class="modalSelecteds">
                    <div id="ingredientesseleccionados">
                        <ul>
                            <li v-for="ingredienteseleccionado in ingredientesseleccionados" :key="ingredienteseleccionado.id">
                                <span>{{ ingredienteseleccionado.nombre }}</span>
                                <i @click="clickHanderdl2(ingredienteseleccionado.id)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <img v-if="recetaImagen" :src="recetaImagen" alt="Imagen de la receta" id="img"/>

            </div>
        </div>
    `,
    props: {
        ingredientes: {
            type: Array,
            required: true
        },
        isingredientes: {
            type: Boolean,
            required: true
        },
        isselecciona: {
            type: Boolean,
            required: true
        },
        ingredientesseleccionados: {
            type: Array,
            required: true
        },
        iscompletodos: {
            type: Boolean,
            required: true
        },
        recetaseleccionada: {
            type: String,
            required: false
        },
        recetaImagen: {
            type: String,
            required: false
        }
    },
    methods: {
        clickHanderdl(id) {
            this.$emit("clickingrediente", id);
        },
        clickHanderdl2(id) {
            this.$emit("clickingredienteremove", id);
        },
        cocinar() {
            this.$emit("btn-cocinar");
        }
    },
    name: 'Ingredientes'
}
