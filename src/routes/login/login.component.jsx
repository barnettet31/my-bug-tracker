import SignInForm from "../../components/sign-in/sign-in-form.component";
import { useAuth } from "../../services/authentication/authentication.context";

export const Login = () => {
  const { handleLogin, handleForgotPassword, loading } = useAuth();

  return (
    <SignInForm
      signIn={handleLogin}
      handleForgotPassword={handleForgotPassword}
      loading={loading}
    />
  );
};
