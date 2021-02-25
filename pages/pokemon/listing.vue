<template>
    <div>
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            id="logo"
            alt="Pokemon"
        />
        <div>
            <div id="form_type">
                <b-form-radio-group
                    id="btn-radios-1"
                    v-model="image_selected"
                    :options="options"
                    button-variant="outline-primary"
                    size="lg"
                    name="radio-btn-outline"
                    buttons
                ></b-form-radio-group>
            </div>

            <b-form-input
                id="form_search"
                v-model="search"
                placeholder="Enter your name"
            ></b-form-input>
        </div>
        <b-card no-body>
            <b-tabs pills card vertical>
                <b-tab
                    :title="index"
                    v-for="(generation, index) in generations"
                    :key="generation.name"
                    @click="fetchPokemon(index)"
                >
                    <pokemon-listing
                        :pokemons="pokemonsInGenerations[index]"
                        :search="search"
                    >
                    </pokemon-listing>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import PokemonListing from "../../components/Pokemon/components/PokemonListing.vue";
import { mapActions, mapState } from "vuex";

export default {
    name: "PokemonListingPage",
    components: { PokemonListing },
    data() {
        return {
            search: "",
        };
    },
    computed: {
        ...mapState({
            image_selected: (state) => state.pokemon.image_selected,
            options: (state) => state.pokemon.options,
            pokemons: (state) => state.pokemon.pokemons,
            generations: (state) => state.pokemon.generations,
            pokemonsInGenerations: (state) =>
                state.pokemon.pokemonsInGenerations,
        }),
        image_selected: {
            get() {
                return this.$store.state.pokemon.image_selected;
            },
            set(value) {
                this.setImageSelected(value);
            },
        },
    },
    methods: {
        ...mapActions({
            fetchPokemon: "pokemon/fetchPokemon",
            setImageSelected: "pokemon/setImageSelected",
        }),
    },
    created() {
        this.fetchPokemon();
    },
};
</script>

<style scoped>
body {
    background-color: #ffffff !important;
}

#logo {
    margin: 40px auto;
    text-align: center;
    display: block;
}
#form_type {
    display: inline-block;
    text-align: center;
    width: 200px;
    margin: 10px;
    padding: 20px;
}
#form_search {
    display: inline-block;
    width: 500px;
    margin: 10px;
    padding: 20px;
}
</style>