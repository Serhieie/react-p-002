import { Formik, Form, Field } from "formik";
import { WarnTostCall, SuccesToastCall } from "../helpers/toast";
import PropTypes from "prop-types";

export const MaterialEditorForm = ({
  onSubmit,
  text,
  onUpdate,
  isModalOpen,
  item,
  toggleModal,
}) => {
  const handleSubmit = async (values, actions) => {
    if (values.title.trim() === "" || values.link.trim() === "") {
      return WarnTostCall();
    }
    try {
      await onSubmit(values);
      SuccesToastCall();
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values, actions) => {
    if (values.title.trim() === "" || values.link.trim() === "") {
      return WarnTostCall();
    }
    try {
      await onUpdate({ id: item.id, title: values.title, link: values.link });
      SuccesToastCall();
      actions.setSubmitting(false);
      actions.resetForm();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ title: "", link: "" }}
      onSubmit={isModalOpen ? handleUpdate : handleSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="mb-5 flex gap-4 mx-auto w-[600px] justify-center flex-col items-center">
            <label htmlFor="title" className="flex flex-col text-xl font-bold">
              Description
            </label>
            <Field
              name="title"
              id="title"
              type="text"
              className="outline-0 py-1 px-10 h-12 rounded w-[550px]"
            />
            <label htmlFor="link" className="flex flex-col text-xl font-bold">
              Link
            </label>
            <Field
              name="link"
              id="link"
              type="text"
              className="outline-0 py-1 px-10 h-12 rounded w-[550px]"
            />

            {isModalOpen ? (
              <button
                className="text-xl font-bold ml-4 mt-4 bg-cyan-700 hover:bg-cyan-900  text-stone-100 p-2 rounded m-0 w-[250px] disabled:opacity-30"
                type="submit"
                disabled={isSubmitting}
              >
                {text}
              </button>
            ) : (
              <button
                className="text-xl font-bold ml-4 mt-4  bg-cyan-700 hover:bg-cyan-900  text-stone-100 p-2 rounded m-0 w-[250px] disabled:opacity-30"
                type="submit"
                disabled={isSubmitting}
              >
                {text}
              </button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

MaterialEditorForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  toggleModal: PropTypes.func,
  text: PropTypes.string,
  isModalOpen: PropTypes.bool,
};
