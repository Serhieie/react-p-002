import { Component } from "react";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class PokemonForm extends Component {
  state = {
    pokemonName: "",
  };

  handleNameChange = (event) => {
    this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.pokemonName.trim() === "") {
      return toast.error("Incorrect input value try to enter another name.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
    this.props.onSubmit(this.state.pokemonName);
    this.setState({ pokemonName: "" });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="mb-5 flex gap-4 mx-auto w-[600px] justify-center"
      >
        <input
          type="text"
          name="pokemonName"
          value={this.state.pokemonName}
          onChange={this.handleNameChange}
          className="outline-0 py-1 px-10 h-12 rounded"
        />
        <button
          className="ml-4 bg-cyan-700 hover:bg-cyan-900 text-xl text-stone-100 p-2 rounded flex items-center gap-2 h-12"
          type="submit"
        >
          Fetch pokemon <MdOutlineCatchingPokemon />
        </button>
      </form>
    );
  }
}
