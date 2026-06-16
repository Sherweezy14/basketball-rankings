import { useState } from "react";
import { createUser } from "../util/playerApi";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: "",
    phone: ""
  });

  const navigate = useNavigate();

  function change(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  async function save(event) {
    event.preventDefault();

    const user = await createUser(data);
    console.log(user);

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center md:text-left">
          <span className="inline-flex bg-amber-400 text-purple-950 text-sm font-bold px-3 py-1 rounded-full">
            Admin
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
            Create User
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new HoopScout user account.
          </p>
        </div>

        <form
          onSubmit={save}
          className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 space-y-5"
        >
          <FormInput label="Name" name="name" value={data.name} onChange={change} />

          <FormInput label="Email" name="email" type="email" value={data.email} onChange={change} />

          <FormInput label="Password" name="password" type="password" value={data.password} onChange={change} />

          <FormInput label="Role" name="role" value={data.role} onChange={change} />

          <FormInput label="Image URL" name="image" value={data.image} onChange={change} />

          <FormInput label="Phone Number" name="phone" value={data.phone} onChange={change} />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-xl shadow-sm"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
      />
    </label>
  );
}

export default UserForm;