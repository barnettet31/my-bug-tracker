import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await Auth.signOut();
    navigate("/login", {
      replace: true,
    });
  };
  return (
    <button
      onClick={handleLogout}
      type="button"
      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700"
    >
      Log Out
    </button>
  );
};
