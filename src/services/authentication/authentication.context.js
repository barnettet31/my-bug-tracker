import React, { createContext, useState, useEffect } from "react";
import {
  handleNewPasswordChallenge,
  signIn,
  signOut,
} from "./authentication.services";
import { Auth } from "aws-amplify";
import { ErrorModal } from "../../components/error-modal/error-modal.component";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(false);
  const [tempUserToken, setTempUserToken] = useState();
  const [errorMessage, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleLogin = async (userObject) => {
    try {
      const user = await signIn(userObject);

      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setTempUserToken(user);
        return navigate("/newpassword", {
          replace: true,
        });
      }
      setUserToken(user);
      navigate("/", {
        replace: true,
      });
    } catch (e) {
      setError(e.message);
      setIsError(true);
    }
  };
  const handleSignOut = async (user) => {
    signOut(user);
    setUserToken(false);
    navigate("/", { replace: true });
  };
  const handleForgotPassword = async (data) => {
    try {
      const response = await Auth.forgotPassword(data);
      navigate("/forgotpassword");
    } catch (e) {
      setError("Invalid Username");
      setIsError(true);
    }
  };
  const handleUpdateForgotPassword = async ({
    username,
    token,
    newPassword,
  }) => {
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        token,
        newPassword
      );
      if (response === "SUCCESS")
        navigate("/", { replace: true, state: { newPassword: true } });
    } catch (e) {
      setError("An error has occured");
    }
  };
  const handleClearError = () => {
    setError("");
    setIsError(false);
  };
  const answerPasswordChallenge = async (userObject, newPassword) => {
    try {
      const response = await handleNewPasswordChallenge(
        userObject,
        newPassword
      );
      console.log(response);

      navigate("/login", {
        state: { newSignIn: true },
      });
    } catch (e) {
      setError(e.message);
      setIsError(true);
    }
  };
  const confirmIsLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then((sess) => {
        if (sess.isValid()) {
          setUserToken((prevState) => {
            navigate("/", {
              replace: true,
            });
            return sess;
          });
        } else {
          console.log(sess);
        }
      })
      .catch((e) => {
        setUserToken(null);
      });
  };
  useEffect(() => {
    confirmIsLoggedIn();
  }, []);

  const value = {
    userToken,
    handleSignOut,
    handleLogin,
    loading,
    answerPasswordChallenge,
    tempUserToken,
    handleForgotPassword,
    handleUpdateForgotPassword,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      <ErrorModal
        clearError={handleClearError}
        error={isError}
        errorMessage={errorMessage}
      />
    </>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
