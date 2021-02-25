import axios from 'axios';

export function fetchPokemonFromApi(parameters = 'limit=898&offset=0') {
    const url = 'https://pokeapi.co/api/v2/pokemon?' + parameters;
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
    })
}
