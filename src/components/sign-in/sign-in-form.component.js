import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import { LoadingIndicator } from "../loading-indicators/loading-indicator.component";
import UserModal from "./user-modal.component";
export default function SignInForm({ signIn, handleForgotPassword, loading }) {
  const [modalShown, setModalShown] = useState(false);
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const newSignIn = location.state?.newSignIn;

  const onSubmit = (data) => {
    signIn(data);
  };
  const handleShowUserModal = () => {
    setModalShown(!modalShown);
  };
  const handleModalSubmission = (data) => {
    setModalShown(!modalShown);
    handleForgotPassword(data);
  };
  if (loading)
    return (
      <div className="min-h-full min-w-full flex flex-col justify-center items-center">
        <LoadingIndicator size="xLarge" />
      </div>
    );

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <UserModal
          shown={modalShown}
          onSubmit={handleModalSubmission}
          hideModal={handleShowUserModal}
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto  w-auto" src={logo} alt="Good Robot" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {newSignIn && (
            <p className="mt-2 text-center text-lg text-red-600">
              New Credentials Set. Attempt to login now.
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-11/12 sm:max-w-md">
          <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", { required: true })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password", { required: true })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <p
                    className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
                    onClick={handleShowUserModal}
                  >
                    Forgot your password?
                  </p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
