<template>
    <div>
        <div v-show="!pokemons.length">
            <img
                src="https://cdn.dribbble.com/users/1081076/screenshots/2832850/pokemongo.gif"
                id="loading"
                alt="Loading..."
                height="200"
            />
        </div>
        <pokemon-card
            v-for="pokemon in filteredPokemon"
            :key="pokemon.id"
            :pokemon="pokemon"
        ></pokemon-card>
    </div>
</template>

<script>
import PokemonCard from "./PokemonCard.vue";
export default {
    name: "PokemonListing",
    components: { PokemonCard },
    props: {
        pokemons: {
            type: Array,
            default: function () {
                return [];
            },
        },
        search: {
            type: String
        }
    },
    computed: {
        filteredPokemon() {
            var pokemons = this.pokemons;
            console.log(pokemons);
            if (this.search) {
                pokemons = pokemons.filter((pokemon) => {
                    return new RegExp(this.search, "i").test(pokemon.name);
                });
            }
            return pokemons;
        },
    }
};
</script>

<style scoped>
body {
    background-color: #ffffff !important;
}
#loading {
    text-align: center;
    display: block;
}

#loading {
    margin: 0 auto;
}

#listing {
    width: 70%;
    margin: 0 auto;
    text-align: center;
}
</style>
