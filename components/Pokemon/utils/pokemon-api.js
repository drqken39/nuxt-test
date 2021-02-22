import axios from 'axios';

export function fetchPokemonFromApi() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=896&offset=0';
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => { resolve(response); })
            .catch(error => { reject(error); })
    })
}