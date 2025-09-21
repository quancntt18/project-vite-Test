import React from "react";
import UploadImage from "./UploadImage";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("anh1.jpg")` }}
    >
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 relative">
        <UploadImage />
      </div>
    </div>
  );
}


export default App;