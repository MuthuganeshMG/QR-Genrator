import React from 'react';
import { useState } from 'react';
import blk_logo from './assets/blk_logo.jpg';
import './Qr.css';

export default function Qr() {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("");
    const [qrSize, setQrSize] = useState();


    async function genrateQr() {
        // alert("genrated");
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating QR code", error);
        } finally {
            setLoading(false);
        }
    }
    function DownloadQr() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log("Error downloading QR code", error);
            })
    }

    return (
        <div className='container'>
            <h1>Generate Qr Code</h1>
            {loading && <p> please wait...</p>}
            <img src={img} alt="" />
            <div className="qr">
                <label htmlFor="link" className='label'>
                    Link :
                    <input
                        type="text"
                        value={qrData}
                        id='link'
                        placeholder='enter your link'
                        onChange={(e) => { setQrData(e.target.value) }}
                    />
                </label>
                <label htmlFor="size" className='label' >
                    Size of Qr :
                    <input
                        type="text"
                        id='size'
                        value={qrSize}
                        placeholder='30'
                        onChange={(e) => { setQrSize(e.target.value) }} />
                </label>
                <button
                    className='btn1'
                    disabled={loading}
                    onClick={genrateQr}>Genrate</button>
                <button
                    className='btn2'
                    disabled={loading}
                    onClick={DownloadQr}
                >Download</button>
            </div>
            <p>Designed By <a href="">MG</a> </p>
        </div>
    );
}
