'use client';

import { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';

interface ImageUploadProps {
  onImageCapture: (image: string | File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageCapture }) => {
  const [showCamera, setShowCamera] = useState(false);
  const camera = useRef<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture(file);
    }
  };

  const handleCameraCapture = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      onImageCapture(photo);
      setShowCamera(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {showCamera ? (
        <div className="relative w-full h-[400px]">
          <Camera ref={camera} />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={handleCameraCapture}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Take Photo
            </button>
            <button
              onClick={() => setShowCamera(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowCamera(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Open Camera
            </button>
            <label className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors cursor-pointer">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-center text-gray-600">
            Take a photo of your fridge or upload an image to get recipe suggestions
          </p>
        </div>
      )}
    </div>
  );
}; 