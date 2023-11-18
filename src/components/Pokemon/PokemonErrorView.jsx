// import ErrorImg from "./errorPoke.png";
import PropTypes from "prop-types";

export default function PokemonErrorView({ message }) {
  return (
    <div role="alert" className="mx-auto h-[800px] flex flex-col mt-32 items-center ">
      <h1 className="text-xl font-bold mb-4">{message}</h1>
      <img
        className="w-80 h-80"
        src="https://pbs.twimg.com/media/ELN8CRkX0AAVr-s.png"
        alt="placeholder"
      />
    </div>
  );
}

PokemonErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
