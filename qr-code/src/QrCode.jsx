import { useState, useSyncExternalStore } from "react"

export const QrCode = () => {
  const [img, setimage]= useState("");
  const [loading, setloading]= useState(false);
  const [qrdata, setqrdata]= useState("");
  const [qrsize, setqrsize]= useState("");

  async function generateQR(){ 
    setloading(true);
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setimage(url);
    }catch(error) {
      console.error("Error generating QR Code", error);
    }finally{
      setloading(false);
    }
   }
  function downloadQR(){ 
    fetch(img).then((Response)=> Response.blob())
    .then((blob)=>{const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Qrcode.png"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    }).catch((error)=>{
      console.error("Error Downloading QR Code", error);
    })
   }
  return (
    <div className='app-container'>
        <h1>QR CODE GENERATOR</h1>
        {loading &&<p>please wait...</p>}
        {img && <img src={img} className='qr-code-image'/>}
        <div>
            <label htmlFor="datainput" className='input-label'>Data for QR Code:</label>
            <input type="text" value={qrdata} onChange={(e)=>setqrdata(e.target.value)} id='datainput' placeholder='Enter data for QR code' />
            <label htmlFor="sizeinput" className='input-label'>Image size (e.g., 100):</label>
            <input type="text" value={qrsize} onChange={(e)=>{
              setqrsize(e.target.value)
            }} id='sizeinput' placeholder='Enter image size' />
            <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={downloadQR}>Download QR Code</button>

        </div>
        <p className='footer'>Designed by Lokesh</p>
    </div>
  )
}
