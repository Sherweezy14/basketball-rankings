import React, { useState } from "react";
import { useImageUpload } from "../hooks/useImageUpload";
import { useRegexValidations } from "../hooks/useRegexValidations";

function PlayerForm({ initialValues, submit, buttonText }) {
  const { errors, checkValidation } = useRegexValidations();
  const [value, setValue] = useState({
    Name: initialValues?.Name || "",
    Rank: initialValues?.Rank || "",
    HighSchool: initialValues?.HighSchool || "",
    Commitment: initialValues?.Commitment || "",
    Aau: initialValues?.Aau || "",
    Class: initialValues?.Class || "",
    Position: initialValues?.Position || "",
    Height: initialValues?.Height || "",
    Image: initialValues?.Image || "",
  });

  const { isUploading, handleImgUpload, imgUploadError } = useImageUpload();

  function handleChange(event) {
    checkValidation(event);
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  async function handleImgChange(event) {
    const file = event.target.files[0];
    const imgUrl = await handleImgUpload(file);

    imgUrl
      ? setValue({ ...value, Image: imgUrl })
      : console.log(imgUploadError);
  }

  function formSave(event) {
    event.preventDefault();
    submit(value);
  }

  return (
    <form
      onSubmit={formSave}
      className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <FormInput
          label="Name"
          name="Name"
          value={value.Name}
          onChange={handleChange}
          error={errors.name}
          required={true}
        />
        <FormInput
          label="Rank"
          name="Rank"
          value={value.Rank}
          onChange={handleChange}
          error={errors.rank}
        />
        <FormInput
          label="High School"
          name="HighSchool"
          value={value.HighSchool}
          onChange={handleChange}
          error={errors.highschool}
        />
        <FormInput
          label="Commitment"
          name="Commitment"
          value={value.Commitment}
          onChange={handleChange}
          error={errors.commitment}
        />
        <FormInput
          label="AAU"
          name="Aau"
          value={value.Aau}
          onChange={handleChange}
          error={errors.aau}
        />
        <FormInput
          label="Class"
          name="Class"
          value={value.Class}
          onChange={handleChange}
          error={errors.class}
          required={true}
        />
        <FormInput
          label="Position"
          name="Position"
          value={value.Position}
          onChange={handleChange}
          error={errors.position}
        />
        <FormInput
          label="Height"
          name="Height"
          value={value.Height}
          onChange={handleChange}
          error={errors.height}
        />
      </div>

      <div className="mt-5">
        <FormInput
          label="Image URL"
          type="file"
          accept="image/*"
          name="Image"
          value={value.Image}
          onChange={handleImgChange}
          error={errors.image}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isUploading || Object.keys(errors).length !== 0}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-xl shadow-sm  disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300 disabled:cursor-not-allowed"
        >
          {isUploading ? "uploading" : buttonText}
        </button>
      </div>
    </form>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  type,
  accept,
  error,
  required,
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>

      <input
        name={name}
        value={type === "file" ? undefined : value}
        onChange={onChange}
        placeholder={label}
        type={type || "text"}
        accept={accept}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
      />
      {error && <p className="text-red-600"> {error}</p>}
    </label>
  );
}

export default PlayerForm;
