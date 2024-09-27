import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import TextRecognizer from "./TextRecognizer";
import {Text} from '@radix-ui/themes';

const LicensePlateRecognition = () => {
  const [capturedImage, setCapturedImage] = useState(null); // Lưu ảnh đã capture
  const [recognizedText, setRecognizedText] = useState(""); // Lưu biển số nhận diện được

  const handleCapture = (imageData) => {
    setCapturedImage(imageData); // Lưu lại ảnh chụp từ webcam
  };

  const handleRecognition = (text) => {
    setRecognizedText(text); // Lưu lại biển số được nhận diện
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Text as="div" size="5">License Plate Recognition</Text>
      {/* Chụp ảnh từ webcam */}
      <WebcamCapture onCapture={handleCapture} />

          {/* Nhận diện văn bản từ ảnh đã chụp */}
          <TextRecognizer imageData={capturedImage} onRecognize={handleRecognition} />

    </div>
  );
};

export default LicensePlateRecognition;
