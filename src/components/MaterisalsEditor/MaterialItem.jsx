import { Component } from "react";
import Modal from "../helpers/Modal";
import { MaterialEditorForm } from "./MaterialsEditorForm";
import PropTypes from "prop-types";

export class MaterialItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { item, onDelete, onUpdate } = this.props;
    const { isModalOpen } = this.state;
    return (
      <div className="flex items-center w-full">
        <div>
          <p>
            <span className="text-xl font-medium">Title: </span>
            {item.title}
          </p>
          <p>
            <span className="text-xl font-medium">link: </span> {item.link}
          </p>
        </div>

        <button
          className="ml-auto bg-cyan-700 hover:bg-cyan-900 text-sm text-stone-100 p-2 rounded m-0 w-[70px] h-[40px] disabled:opacity-30"
          type="button"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
        <button
          className="ml-4 bg-cyan-700 hover:bg-cyan-900 text-sm text-stone-100 p-2 rounded m-0 w-[70px] h-[40px] disabled:opacity-30"
          type="button"
          onClick={this.toggleModal}
        >
          Update
        </button>
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <MaterialEditorForm
              text={"Update Element"}
              onUpdate={onUpdate}
              isModalOpen={isModalOpen}
              item={item}
              toggleModal={this.toggleModal}
            />
          </Modal>
        )}
      </div>
    );
  }
}

MaterialItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};
