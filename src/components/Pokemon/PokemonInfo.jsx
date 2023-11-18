import { Component } from "react";
// import PokePlaceholder as PokeHolder from './PokePlaceholder.jpg'
import PokemonDataView from "./PokemonDataView.jsx";
import PokemonErrorView from "./PokemonErrorView.jsx";
import PokemonPendingView from "./PokemonPending.jsx";
import PropTypes from "prop-types";
import { fetchPokemon } from "./pokemon-api.js";

export default class PokemonInfo extends Component {
  state = {
    pokemon: "",
    status: "idle",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;
    if (prevName !== nextName) {
      this.setState({ status: "pending" });
      fetchPokemon(nextName)
        .then((pokemon) => this.setState({ pokemon, status: "resolved" }))
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { pokemon, status, error } = this.state;
    const { pokemonName } = this.props;
    // switch (status) {
    //   case "idle":
    //     return <h1>Enter Pokemon name</h1>;
    //   case "pending":
    //     return <PokemonPendingView pokemonName={this.props.pokemonName} />;
    //   case "rejected":
    //     return <PokemonErrorView message={error.message} />;
    //   case "resolved":
    //     return <PokemonDateView pokemonName={pokemon} />;
    // default:
    // return (
    //   <div>
    //     <p>{pokemon.name}</p>
    //     <img
    //       src={pokemon.sprites.other["official-artwork"].front_default}
    //       alt={pokemon.name}
    //       width="500"
    //     />
    //   </div>
    // );
    if (status === "idle") {
      return <div className=" h-[800px] text-center">Enter Pokemon name</div>;
    }
    if (status === "pending") {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }
    if (status === "rejected") {
      return <PokemonErrorView message={error.message} />;
    }
    if (status === "resolved") {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

PokemonInfo.propTypes = {
  pokemonName: PropTypes.string.isRequired,
};
