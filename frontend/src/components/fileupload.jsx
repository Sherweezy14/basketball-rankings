import React from "react";
import { useState, useEffect } from "react";
import "../app.css";

function FileUpload(){
    const [file, setFile] = useState(null);
    const [res,setRes] = useState([]);
    async function excelFileUpload(event){
        const excelFile = event.target.files[0];
        setFile(excelFile);

        const data = new FormData();
        data.append("file",excelFile);
       
        const response = await fetch("http://localhost:3001/imports",{method: "POST", body:data});
        const rj = await response.json()
        setRes(rj);
  }


  return (
    <div>

      <h1>Upload Excel new File</h1>

      <input
        type="file"
        onChange={excelFileUpload}
      /> {res.count} Players Imported
      


    </div>
  );
}


export default FileUpload;
