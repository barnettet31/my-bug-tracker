import { NavLink } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const CustomLink = ({ to, children, ...props }) => {
  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) =>
        classNames(
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )
      }
    >
      {children}
    </NavLink>
  );
};
