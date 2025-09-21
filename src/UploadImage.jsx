import React, { useState } from "react";
import axios from "axios";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  
  const API_KEY = "YOUR_GOOGLE_AI_API_KEY";
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent" 

  const handleUpload = async () => {
    if (!file) return alert("Hãy chọn 1 ảnh!");

    setLoading(true);
    setResponse(null);

    try {
      // Đọc file ảnh thành base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];

        const body = {
          contents: [
            {
              parts: [
                { text: "Mô tả nội dung bức ảnh này" },
                {
                  inline_data: {
                    mime_type: file.type,
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        };

        const res = await axios.post(API_URL, body, {
          headers: {
            "Content-Type": "application/json",
           "x-goog-api-key":"AIzaSyCDg514RTru_RG978Ien-S5wFi8_V5jE20"
          },
        });

        setResponse(res.data);
        setLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Upload thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 relative">
      {loading && <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000050] flex items-center justify-center">
       <p className="text-blue-500 font-semibold">⏳ Đang xử lý...</p>
        </div>}
      <h1 className="text-xl font-bold">Upload Ảnh lên Google AI Studio</h1>
     {/* Input file ẩn đi */}
<input
  id="fileInput"
  type="file"
  accept="image/*"
  onChange={(e) => setFile(e.target.files[0])}
  className="hidden"
/>

{/* Nút màu xanh để chọn ảnh */}
<label
  htmlFor="fileInput"
  className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition"
>
  📂 Chọn ảnh
</label>

      <div 
  className="p-6 max-w-md mx-auto bg-cover bg-center rounded-xl shadow-md space-y-4 relative" 
  style={{ backgroundImage: "./assets/react.svg" }}
>
      
</div>
      <div className="flex row ">

      <button
        onClick={handleUpload}
        disabled={loading}
        className=""
      >
        {loading ? "Đang tải..." : "Upload"}
      </button>
{response&&<button
        onClick={()=>{setResponse(null)}}
        disabled={loading}
        className=""
      >
        Đặt lại
      </button>}
      </div>


      

      {response && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold">Kết quả:</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
