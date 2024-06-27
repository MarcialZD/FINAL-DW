import ingredientes from "./ingredientes";

export default {    
    template: `
        <div id="recetas">
            
            <div v-if="isselecciona" class="modalSelecteds">
                <ul>
                    <li v-for="ingrediente in ingredientes" :key="ingrediente.id" >
                        <span>{{ ingrediente.nombre }}</span>
                        <i @click="clickHanderdl(ingrediente.id)"></i>
                    </li>
                </ul>
            </div>
        </div>
    `,
    props: {
        
        ingredientes: {
            type: Array,
            required: true
        },
        isselecciona: {
            type: Boolean,
            required: true
        },
        iscompletodos:{
            type: Boolean,
            required: true 
        }
    },
    methods: {
        clickHanderdl(id) {
            this.$emit("clickingredienteremove", id);
        },
       
    },
    name: 'Recetas'
};
