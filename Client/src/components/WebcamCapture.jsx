import React, { useRef, useEffect } from "react";
import {Button} from '@radix-ui/themes';

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the webcam: ", err);
      }
    };

    getUserMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Hàm để lấy frame từ webcam và vẽ lên canvas
  const captureFrame = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Chuyển đổi frame từ canvas thành một chuỗi base64 image
      const dataURL = canvas.toDataURL("image/png");
      if (onCapture) {
        onCapture(dataURL); // Truyền hình ảnh đã capture cho hàm onCapture
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay width="600" height="400" />
      <canvas ref={canvasRef} width="600" height="400" style={{ display: "none" }} />
      <p>
      <Button onClick={captureFrame}>Capture Frame</Button>
      </p>
    </div>
  );
};

export default WebcamCapture;
