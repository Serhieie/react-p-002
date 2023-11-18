import { Component } from "react";
import { ToastContainer } from "react-toastify";
import PokemonForm from "./Pokemon/PokemonForm";
import PokemonInfo from "./Pokemon/PokemonInfo";
import { MaterialEditorForm } from "./MaterisalsEditor/MaterialsEditorForm";
import * as API from "../services/api";
import { Materials } from "./MaterisalsEditor/Materials";
import { ToastCall } from "./helpers/toast";
import { SuccesToastCall } from "./helpers/toast";

export default class App extends Component {
  state = {
    materials: [],
    pokemonName: "",
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: false });
      const materials = await API.getMaterials();
      this.setState({ materials, isLoading: false });
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      ToastCall();
    }
  }

  onFormSubmit = (pokemonName) => {
    this.setState({ pokemonName });
  };

  addMaterials = async (values) => {
    try {
      const material = await API.addMaterial(values);
      this.setState((state) => ({
        materials: [...state.materials, material],
      }));
    } catch (error) {
      this.setState({ error: true });
      ToastCall();
    }
  };

  deleteMaterial = async (id) => {
    try {
      await API.deleteMaterials(id);
      SuccesToastCall();
      this.setState((state) => ({
        materials: state.materials.filter((material) => material.id !== id),
      }));
    } catch (error) {
      this.setState({ error: true });
      ToastCall();
    }
  };

  updateMaterial = async (fields) => {
    try {
      const updatedMaterial = await API.updateMaterials(fields);
      this.setState((state) => ({
        materials: state.materials.map((material) =>
          material.id === fields.id ? updatedMaterial : material
        ),
      }));
    } catch (error) {
      this.setState({ error: true });
      ToastCall();
    }
  };

  render() {
    const { pokemonName, isLoading, materials, error, showModal } = this.state;
    return (
      <div className="max-w-[1170px] mx-auto p-5">
        <PokemonForm onSubmit={this.onFormSubmit} />
        <PokemonInfo pokemonName={pokemonName} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <MaterialEditorForm
          onSubmit={this.addMaterials}
          onUpdate={this.updateMaterial}
          text={"Add Material"}
          modal={showModal}
        />
        {error && ToastCall()}
        {isLoading ? (
          <div>LOADING</div>
        ) : (
          <Materials
            items={materials}
            onUpdate={this.updateMaterial}
            onDelete={this.deleteMaterial}
          />
        )}
      </div>
    );
  }
}
