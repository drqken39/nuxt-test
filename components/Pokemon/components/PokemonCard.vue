<template>
    <div class="pokemon-card" :class="pokemon.name">
        <img :src="pokemon[image_selected]" height="96" width="96" />
        <p>{{ pokemon.name | capitalize }}</p>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "PokemonCard",
    props: {
        pokemon: {
            type: Object,
            required: true,
            default: function () {
                return [];
            },
        },
    },
    computed: {
        ...mapState({
            image_selected: (state) => state.pokemon.image_selected,
        }),
    },
    filters: {
        capitalize: function (value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
};
</script>
    
<style scoped>
.pokemon-card {
    display: inline-block;
    margin: 10px;
    padding: 20px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 175px;
}

.pokemon-card:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.pokemon-card.active {
    box-shadow: #2a75bb 0 1px 4px;
}

.pokemon-card.active:hover {
    box-shadow: #2a75bb 0 3px 8px;
}

.pokemon-card img {
    display: block;
    margin: 0 auto 10px auto;
}

.pokemon-card p {
    display: block;
    text-align: center;
}
</style>
