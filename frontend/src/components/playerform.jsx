import React,{ useState } from "react";
import { uploadImage } from "../util/playerApi";

function PlayerForm({initialValues,submit,buttonText}){
    const [value,setValue] = useState({
        Name: initialValues?.Name || "",
        Rank: initialValues?.Rank || "",
        HighSchool: initialValues?.HighSchool || "",
        Commitment: initialValues?.Commitment || "",
        Aau: initialValues?.Aau || "",
        Class: initialValues?.Class || "",
        Position: initialValues?.Position || "",
        Height: initialValues?.Height || "",
        Image: initialValues?.Image || ""
    });

    function handleChange(event){
        setValue({...value,
             [event.target.name] : event.target.value})
    }

    async function handleImgChange(event){

      const res = await uploadImage(event.target.files[0])
      setValue({...value,Image:res.imageUrl})
    
    }

    function formSave(event){
        event.preventDefault();
        submit(value);

    }

    return (
        <form
          onSubmit={formSave}
          className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <FormInput label="Name" name="Name" value={value.Name} onChange={handleChange} />
            <FormInput label="Rank" name="Rank" value={value.Rank} onChange={handleChange} />
            <FormInput label="High School" name="HighSchool" value={value.HighSchool} onChange={handleChange} />
            <FormInput label="Commitment" name="Commitment" value={value.Commitment} onChange={handleChange} />
            <FormInput label="AAU" name="Aau" value={value.Aau} onChange={handleChange} />
            <FormInput label="Class" name="Class" value={value.Class} onChange={handleChange} />
            <FormInput label="Position" name="Position" value={value.Position} onChange={handleChange} />
            <FormInput label="Height" name="Height" value={value.Height} onChange={handleChange} />
          </div>
    
          <div className="mt-5">
            <FormInput label="Image URL" type="file" accept="image/*" name="Image" value={value.Image} onChange={handleImgChange} />
          </div>
    
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-xl shadow-sm"
            >
              {buttonText}
            </button>
          </div>
        </form>
      );
    }
    
    function FormInput({ label, name, value, onChange, type, accept }) {
      return (
        <label className="block">
          <span className="text-sm font-bold text-slate-700">{label}</span>
    
          <input
            name={name}
            value={type==="file" ? undefined: value}
            onChange={onChange}
            placeholder={label}
            type={ type || "text"}
            accept={accept}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
          />
        </label>
      );
    }

export default PlayerForm;