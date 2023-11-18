import { ToastCall } from "../helpers/toast";

async function fetchPokemon(name) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    ToastCall();
    return Promise.reject(new Error(`No pokemon with name ${name}.`));
  });
}

export { fetchPokemon };
