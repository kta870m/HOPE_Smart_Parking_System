import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import {Button, Text, Box, TextField} from '@radix-ui/themes';
import {Pencil2Icon} from '@radix-ui/react-icons'

export default function TextRecognizer(props) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(props.imageData);
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const [inaccurate, setInaccurate] = useState(false);

  useEffect(() => {
    const loadOpenCV = () => {
      return new Promise((resolve) => {
        if (window.cv) {
          resolve();
        } else {
          const interval = setInterval(() => {
            if (window.cv) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        }
      });
    };
    loadOpenCV();
  }, []);

  useEffect(() => {
    setImageUrl(props.imageData);
  }, [props.imageData]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleTextRecognition = () => {
    if (imageUrl) {
      preprocessImage(imageUrl).then((processedUrl) => {
        setProcessedImageUrl(processedUrl);

        Tesseract.recognize(processedUrl, 'eng', {
          tessedit_char_whitelist: '0123456789',
          tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
          logger: (m) => console.log(m),
        })
          .then(({ data: { text } }) => {
            setRecognizedText(text.trim());
          })
          .catch((error) => {
            console.error("Error recognizing text:", error);
          });
      });
    }
  };

  const preprocessImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = file;//URL.createObjectURL(file);
    
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);
    
        // Apply Gaussian blur
        ctx.filter = 'blur(2px)'; // Adjust the blur radius as needed
        ctx.drawImage(canvas, 0, 0); // Re-draw the image to apply the blur
        ctx.filter = 'none'; // Reset the filter
    
        // Grayscale conversion
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = brightness; // Grayscale
        }
        ctx.putImageData(imageData, 0, 0);
    
        // Noise Removal: Apply median filter
    
        applyMedianFilter(ctx, canvas.width, canvas.height);
        // Inverse Binarization
        const threshold = 100; // Adjust threshold value for better detection
        for (let i = 0; i < data.length; i += 4) {
          const brightness = data[i]; // Grayscale value
          const newColor = brightness > threshold ? 0 : 255; // Inverse binarization
          data[i] = data[i + 1] = data[i + 2] = newColor; // Set pixel to new color
        }
        ctx.putImageData(imageData, 0, 0);
    
        removeWhiteBorderMass(ctx, canvas.width, canvas.height);
        roundEdges(ctx, canvas.width, canvas.height, 2);
        // Just resolve the processed image without cropping
        const processedUrl = canvas.toDataURL('image/png');
        resolve(processedUrl);
      };
    });
  };
  
  const roundEdges = (ctx, width, height, radius) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data.slice();
  
    // Function to determine if a pixel is black or white
    const isBlackPixel = (index) => data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0;
    const isWhitePixel = (index) => data[index] === 255 && data[index + 1] === 255 && data[index + 2] === 255;
  
    // Apply edge rounding
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
  
        // If it's a border pixel
        if (isBlackPixel(index) || isWhitePixel(index)) {
          let totalR = 0, totalG = 0, totalB = 0, count = 0;
  
          // Check surrounding pixels within the specified radius
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const neighborX = x + dx;
              const neighborY = y + dy;
  
              // Ensure neighbor is within bounds
              if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
                const neighborIndex = (neighborY * width + neighborX) * 4;
                totalR += data[neighborIndex];
                totalG += data[neighborIndex + 1];
                totalB += data[neighborIndex + 2];
                count++;
              }
            }
          }
  
          // Calculate the average color of surrounding pixels
          if (count > 0) {
            data[index] = totalR / count;
            data[index + 1] = totalG / count;
            data[index + 2] = totalB / count;
          }
        }
      }
    }
  
    // Put the modified image data back
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
  };
  
  const removeWhiteBorderMass = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data.slice();
  
    const isWhitePixel = (index) => (
      data[index] === 255 && data[index + 1] === 255 && data[index + 2] === 255
    );
  
    const setBlackPixel = (index) => {
      data[index] = data[index + 1] = data[index + 2] = 0; // Set to black
    };
  
    const floodFill = (x, y) => {
      const stack = [[x, y]];
      while (stack.length > 0) {
        const [currX, currY] = stack.pop();
        const currIndex = (currY * width + currX) * 4;
  
        // Check if current pixel is white
        if (currX < 0 || currX >= width || currY < 0 || currY >= height || !isWhitePixel(currIndex)) {
          continue;
        }
  
        // Set the pixel to black
        setBlackPixel(currIndex);
  
        // Push neighboring pixels onto the stack
        stack.push([currX - 1, currY]); // left
        stack.push([currX + 1, currY]); // right
        stack.push([currX, currY - 1]); // up
        stack.push([currX, currY + 1]); // down
      }
    };
  
    // Check top and bottom borders
    for (let x = 0; x < width; x++) {
      if (isWhitePixel((0 * width + x) * 4)) floodFill(x, 0); // Top border
      if (isWhitePixel(((height - 1) * width + x) * 4)) floodFill(x, height - 1); // Bottom border
    }
  
    // Check left and right borders
    for (let y = 0; y < height; y++) {
      if (isWhitePixel((y * width + 0) * 4)) floodFill(0, y); // Left border
      if (isWhitePixel((y * width + (width - 1)) * 4)) floodFill(width - 1, y); // Right border
    }
  
    // Put modified image data back
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
  };
  
  
  
  // Function to apply a median filter
  const applyMedianFilter = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data.slice(); // Copy the original image data
  
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const neighbors = [];
  
        // Collect the 3x3 neighborhood pixels
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            neighbors.push(data[index]); // Red channel
          }
        }
  
        // Sort the neighbors and find the median
        neighbors.sort((a, b) => a - b);
        const median = neighbors[4]; // Middle value for odd-length array
  
        // Set the pixel to the median value
        const index = (y * width + x) * 4;
        data[index] = data[index + 1] = data[index + 2] = median; // Set RGB to median
      }
    }
  
    // Put the new image data back onto the canvas
    ctx.putImageData(new ImageData(data, width, height), 0, 0);
  };
  
  function fix(){
    setInaccurate(true);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Text as="div" size="5">Upload Image for License Plate Recognition</Text>
      <input style={{ marginTop: '20px' }} type="file" accept="image/*" onChange={onImageChange} />
      
      {imageUrl && (
        <div>
      <Text as="div" size="5" style={{ marginTop: '20px' }}>Uploaded Image</Text>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '500px', marginTop: '10px' }} />
        </div>
      )}

      <canvas id="outputCanvas" style={{ display: 'none' }}></canvas>

      {processedImageUrl && (
        <div>
      <Text as="div" size="5" style={{ marginTop: '20px' }}>Processed Image</Text>
          <img src={processedImageUrl} alt="Processed" style={{ maxWidth: '500px', marginTop: '10px' }} />
        </div>
      )}

      <Button onClick={handleTextRecognition} style={{ marginTop: '10px' }}>
        Recognize
      </Button>

      {recognizedText && (
        <div>
          <Text as="div" size="5" style={{ marginTop: '20px' }}>Recognized License Plate</Text>
          <p>{recognizedText}</p>
          <Text as="div" size="3">Is this recognition accurate</Text>
          <Button style={{ marginTop: '10px' }}>
            Yes
          </Button>
          <Button color='tomato' onClick={fix} style={{ marginTop: '10px' }}>
            No
          </Button>
          { inaccurate ?
          <Box as="div" style={{ marginTop: '20px' }}>
            <Text size="2">What is the actual value:</Text>
            <TextField.Root placeholder="LIcense Plate..." size="2">
            <TextField.Slot>
                    <Pencil2Icon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Button style={{ marginTop: '20px' }}>
              Save
            </Button>
          </Box> : null
          }
        </div>
      )}
    </div>
  );
}
