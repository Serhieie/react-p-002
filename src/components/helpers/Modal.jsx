import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal__root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handelKeydown);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handelKeydown);
  };

  handelKeydown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  //for App
  // toggleModal = () => {
  //   this.setState(({ isModalOpen }) => ({
  //     isModalOpen: !isModalOpen,
  //   }));
  // };

  render() {
    return createPortal(
      <div
        className="fixed top-0 bg-emerald-900 left-0 w-[100vw] h-[100vh] bg-opacity-80"
        onClick={this.handleBackdropClick}
      >
        <div
          className="absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 min-h-[350px]
          max-w-[700px] w-full p-8 bg-green-100 rounded
  shadow-green-900 shadow-lg"
        >
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
};
