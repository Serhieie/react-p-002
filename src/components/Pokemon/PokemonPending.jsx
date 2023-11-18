import { GiFlameSpin } from "react-icons/gi";
import PendingImg from "./pokeball.png";
import PokemonDataView from "./PokemonDataView";
import PropTypes from "prop-types";

export default function PokemonPendingView({ pokemonName }) {
  const pokeSkeleton = {
    name: pokemonName,
    sprites: {
      other: {
        "official-artwork": { front_default: PendingImg },
      },
    },
    stats: [],
  };
  return (
    <div role="alert" className=" h-[800px]">
      <div>
        <GiFlameSpin size={40} className="spin mx-auto " />
        <h2 className="text-md font-bold text-center">Donwload...</h2>
      </div>
      <PokemonDataView pokemon={pokeSkeleton} />
    </div>
  );
}

PokemonPendingView.propTypes = {
  pokemonName: PropTypes.string.isRequired,
};
