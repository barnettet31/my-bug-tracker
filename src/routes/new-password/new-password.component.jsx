import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useAuth } from "../../services/authentication/authentication.context";
export const NewPassword = () => {
  const { answerPasswordChallenge, tempUserToken } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ newPassword }) => {
    answerPasswordChallenge(tempUserToken, newPassword);
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto  w-auto" src={logo} alt="Good Robot" />
          <h2 className="mt-6 text-center text-2xl font-extrabold underline text-gray-900">
            Permanent Password Required
          </h2>
          <p className="mt-2 text-center text-m text-grey-700">
            Please enter your permanent password.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-11/12 sm:max-w-md">
          <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("newPassword", { required: true })}
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Submit Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
