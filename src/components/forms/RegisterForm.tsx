"use client";
import { ChangeEvent, FC, useState } from "react";

interface RegisterFormProps {}
interface formData {
  name: String;
  email: String;
  password: String;
  gender: String;
}
const initialState = {
  name: "",
  email: "",
  password: "",
  gender: "",
};
const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const [formData, setFormData] = useState<formData>(initialState);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={(e) => submitForm(e)} className="space-y-5">
      <div>
        <label className="font-medium">Name</label>
        <input
          type="text"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          name="name"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          name="email"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          name="password"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label className="font-medium">Gender</label>
        <br />
        <input
          type="radio"
          required
          name="gender"
          className="mr-3 w-4 h-4 mt-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          id="male"
          onChange={(e) => {
            setFormData({ ...formData, gender: "male" });
          }}
        />
        <label htmlFor="male" className="mr-3  text-lg">
          Male
        </label>
        <input
          type="radio"
          required
          name="gender"
          className="mx-3 w-4 h-4 mt-2 px-3  text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          id="female"
          onChange={(e) => {
            setFormData({ ...formData, gender: "female" });
          }}
        />
        <label htmlFor="female" className="text-lg">
          Female
        </label>
      </div>
      <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
        Create account
      </button>
    </form>
  );
};

export default RegisterForm;
