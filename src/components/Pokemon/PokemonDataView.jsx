import PropTypes from "prop-types";

export default function PokemonDataView({ pokemon: { name, sprites, stats } }) {
  if (!sprites) {
    return null;
  }
  return (
    <div className=" h-[800px]">
      <h2 className="text-3xl font-bold text-center text-emerald-950">{name}</h2>
      <img
        className="mx-auto"
        src={sprites.other["official-artwork"].front_default}
        alt={name}
        width="500"
        height="500"
      />
      <ul className="grid gap-x-20 w-[600px]  mx-auto grid-cols-2 ">
        {stats.map((entry) => (
          <li key={entry.stat.name}>
            <p className="font-bold text-emerald-950 text-md">
              {entry.stat.name}
              {"  "}
              <span className="font-bold text-emerald-950 text-xxl">
                {entry.base_stat}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

PokemonDataView.propTypes = {
  name: PropTypes.string,
  sprites: PropTypes.string,
  stats: PropTypes.string,
};
