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
  return <h1>Hello Dashboard</h1>;
};
