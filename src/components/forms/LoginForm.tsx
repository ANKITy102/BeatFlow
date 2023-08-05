import { FC } from "react";

interface loginFormProps {}

const LoginForm: FC<loginFormProps> = ({}) => {
  return (
    <form className="space-y-5">
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
