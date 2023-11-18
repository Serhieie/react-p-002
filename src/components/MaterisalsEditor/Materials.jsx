import { MaterialItem } from "./MaterialItem";
import PropTypes from "prop-types";

export const Materials = ({ items, ...otherProps }) => {
  console.log(items);
  return (
    <ul className="mb-60">
      {items.map((item) => (
        <li key={item.id} className="border-b-2  border-emerald-900 flex items-center">
          <MaterialItem item={item} {...otherProps} />
        </li>
      ))}
    </ul>
  );
};

Materials.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};
