import React, { createContext, useState, useEffect } from "react";
import {
  handleNewPasswordChallenge,
  signIn,
  signOut,
} from "./authentication.services";
import { Amplify, Auth } from "aws-amplify";
import { ErrorModal } from "../../components/error-modal/error-modal.component";
import { useNavigate } from "react-router-dom";
import awsmobile from "../../aws-exports";
Amplify.configure(awsmobile);
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(false);
  const [tempUserToken, setTempUserToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setUserToken(response);
      navigate("/", {
        replace: true,
      });
    } catch (e) {
      setError(e.message);
      setIsError(true);
    }
  };
  const confirmIsLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then((sess) => {
        setUserToken(sess);
      })
      .catch((e) => {
        setUserToken(null);
      });
  };
  useEffect(() => {
    confirmIsLoggedIn();
  }, []);

  useEffect(() => {
    const verifyUser = () => {
      if (userToken) {
        console.log(userToken);
      }
    };
  }, [userToken]);

  const value = {
    userToken,

    handleSignOut,
    handleLogin,
    loading,
    answerPasswordChallenge,
    tempUserToken,
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
