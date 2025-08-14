import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let scanner = null;

    if (scanning) {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      });

      scanner.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanning]);

  const onScanSuccess = (decodedText) => {
    // Предполагаем, что QR-код содержит ID товара
    const productId = decodedText;
    navigate(`/product/${productId}`);
  };

  const onScanError = (error) => {
    console.warn(`QR Code scan error: ${error}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-20 right-4 z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v4m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            <span>Сканировать QR</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div id="reader" className="w-64 h-64"></div>
            <button
              onClick={() => setScanning(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QRScanner; 