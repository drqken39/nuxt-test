import {
    fetchPokemonFromApi
} from "../components/Pokemon/utils/pokemon-api";

export const state = () => ({
    image_selected: 'image_default',
    options: [{
            text: "Normal",
            value: "image_default"
        },
        {
            text: "Shiny",
            value: "image_shiny"
        },
    ],
    pokemonsInGenerations: {
        generation_1: [],
        generation_2: [],
        generation_3: [],
        generation_4: [],
        generation_5: [],
        generation_6: [],
        generation_7: [],
        generation_8: [],
    },
    generations: {
        'generation_1': "limit=151&offset=0",
        'generation_2': "limit=100&offset=151",
        'generation_3': "limit=135&offset=251",
        'generation_4': "limit=108&offset=386",
        'generation_5': "limit=155&offset=494",
        'generation_6': "limit=72&offset=649",
        'generation_7': "limit=88&offset=721",
        'generation_8': "limit=89&offset=809",
    },
});

export const actions = {
    async fetchPokemon({
        commit,
        state
    }, generation) {
        try {
            var generation = generation ? generation : 'generation_1';
            if (state.pokemonsInGenerations[generation].length === 0) {
                var parameters = state.generations[generation];
                const response = await fetchPokemonFromApi(parameters);
                if (response.status === 200) {
                    commit("FETCH_POKEMONS", {
                        'pokemon': response.data,
                        'generation': generation
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    },
    setImageSelected({
        commit
    }, image_selected) {
        commit('SET_IMAGE_SELECTED', image_selected);
    }
};

export const mutations = {
    ["FETCH_POKEMONS"](state, payload) {
        if (payload.pokemon.results && payload.generation) {
            payload.pokemon.results.forEach(pokemon => {
                var matches = pokemon.url.match(
                    /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]+)\//
                );
                let number = matches[1];
                pokemon.image_shiny =
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
                    number +
                    ".png";
                pokemon.image_default =
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                    number +
                    ".png";
                state.pokemonsInGenerations[payload.generation].push(pokemon);
            });
        }
    },
    ["SET_IMAGE_SELECTED"](state, image_selected) {
        state.image_selected = image_selected;
    }
};
