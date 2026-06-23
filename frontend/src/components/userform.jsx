import { useState } from "react";
import { createUser } from "../util/playerApi";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "../hooks/useImageUpload";

function UserForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: "",
    phone: "",
  });
  const { isUploading, handleImgUpload, imgUploadError } = useImageUpload();
  const [errors, setErrors] = useState({});

  const regexTest = {
    name: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " Name must be under 50 characters",
    },
    role: {
      check: /^[A-Za-z\s'-]{1,50}$/,
      message: " Name must be under 50 characters",
    },
    phone: {
      check: /^(\+1\s?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
      message: "Must be a valid phone number",
    },
    email: {
      check: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: " Must be a valid email",
    },
    password: {
      check: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      message: " Must be at least 8 characters and include a number and letter",
    },
    image: {
      check: /\.(jpg|jpeg|png)$/i,
      message: " Name be a jpg,jpeg, or png",
    },
  };

  const navigate = useNavigate();
  // Check each field input against regex
  // if it matches remove error if it fails add err
  function checkValidation(event) {
    if (
      regexTest[event.target.name].check.test(event.target.value) ||
      event.target.value === ""
    ) {
      const { [event.target.name]: value, ...left } = errors;
      setErrors(left);
    } else {
      setErrors({
        ...errors,
        [event.target.name]: regexTest[event.target.name].message,
      });
    }
  }

  async function handleImgChange(event) {
    const file = event.target.files[0];
    const imgUrl = await handleImgUpload(file);

    imgUrl ? setData({ ...data, Image: imgUrl }) : console.log(imgUploadError);
  }

  function change(event) {
    checkValidation(event);
    setData({
      ...data,
      [event.target.name]: event.target.value,
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
          <FormInput
            label="Name"
            name="name"
            value={data.name}
            onChange={change}
            error={errors.name}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={data.email}
            error={errors.email}
            onChange={change}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={data.password}
            error={errors.password}
            onChange={change}
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Role</span>

            <select
              name="role"
              value={data.role}
              onChange={change}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </select>
          </label>

          <div className="mt-5">
            <FormInput
              label="Image URL"
              type="file"
              accept="image/*"
              name="Image"
              value={data.image}
              onChange={handleImgChange}
            />
          </div>

          <FormInput
            label="Phone Number"
            name="phone"
            value={data.phone}
            error={errors.phone}
            onChange={change}
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={Object.keys(errors).length !== 0 || isUploading}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-xl shadow-sm  disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading.." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  require = true,
  error,
  accept,
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>

      <input
        type={type}
        name={name}
        value={type === "file" ? undefined : value}
        onChange={onChange}
        placeholder={label}
        required={require}
        accept={accept}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
      />
      {error && <p className="text-red-600"> {error}</p>}
    </label>
  );
}

export default UserForm;
