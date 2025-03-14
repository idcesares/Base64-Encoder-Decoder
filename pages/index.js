import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Loader2, Copy, AlertCircle } from 'lucide-react';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const title = "Base64 Encoder/Decoder | Free Online Tool";
  const description = "Easily encode and decode text to and from Base64 format with our free online tool. Fast, secure, and user-friendly.";

  const [isEncoding, setIsEncoding] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Define theme-based classes
  const accentTextColor = isEncoding ? 'text-indigo-600' : 'text-purple-600';
  const bgGradient = isEncoding ? 'from-purple-100 to-blue-200' : 'from-blue-200 to-purple-100';
  const primaryGradient = isEncoding 
    ? 'from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:from-indigo-700 active:to-purple-800' 
    : 'from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 active:from-purple-800 active:to-indigo-700';
  const toggleBgColor = isEncoding ? 'bg-indigo-600' : 'bg-purple-600';
  const inputBorderFocus = isEncoding 
    ? 'border-indigo-200 focus:ring-indigo-500' 
    : 'border-purple-200 focus:ring-purple-500';
  const resultBg = isEncoding ? 'bg-indigo-50 border-indigo-200' : 'bg-purple-50 border-purple-200';
  const copyButtonBg = isEncoding 
    ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
    : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500';

  const handleToggle = () => {
    // Add smooth transition effect
    setIsTransitioning(true);
    setTimeout(() => {
      setIsEncoding(!isEncoding);
      setInput('');
      setOutput('');
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAction = () => {
    // Add warning if there's no input
    if (!input.trim()) {
      toast.warning('Please enter text to process', {
        icon: <AlertCircle className="text-amber-500" />,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        if (isEncoding) {
          setOutput(btoa(input));
        } else {
          setOutput(atob(input));
        }
      } catch (error) {
        if (!isEncoding) {
          toast.error('Invalid Base64 input', {
            position: "top-center",
          });
          setOutput('Error: Invalid Base64 format');
        } else {
          toast.error('Encoding error occurred', {
            position: "top-center",
          });
          setOutput('Error: Unable to encode text');
        }
      } finally {
        setIsLoading(false);
      }
    }, 500); // Simulate processing time
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => toast.error('Failed to copy to clipboard'));
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="base64, encoder, decoder, online tool, text conversion" />
      </Head>
      <main>
        <div className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-500 ease-in-out flex flex-col items-center justify-center p-4`}>
          <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6 mb-4 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <h1 className={`text-3xl font-bold text-center mb-6 ${accentTextColor} transition-colors duration-300`}>
              Base64 {isEncoding ? 'Encoder' : 'Decoder'}
            </h1>
            
            <div className="flex items-center justify-center space-x-4 bg-gray-100 p-3 rounded-full">
              <span className={`text-sm transition-colors duration-300 ${!isEncoding ? accentTextColor + ' font-bold' : 'text-gray-500'}`}>
                Decode
              </span>
              <Switch.Root
                checked={isEncoding}
                onCheckedChange={handleToggle}
                className={`${toggleBgColor} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
              >
                <span
                  className={`${
                    isEncoding ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out`}
                  aria-hidden="true"
                />
              </Switch.Root>
              <span className={`text-sm transition-colors duration-300 ${isEncoding ? accentTextColor + ' font-bold' : 'text-gray-500'}`}>
                Encode
              </span>
            </div>
            
            <textarea
              className={`w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out ${inputBorderFocus}`}
              rows="4"
              placeholder={isEncoding ? "Enter text to encode" : "Enter Base64 to decode"}
              value={input}
              onChange={handleInputChange}
              aria-label={isEncoding ? "Text to encode" : "Base64 to decode"}
            />
            
            <button 
              className={`w-full py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                        bg-gradient-to-r ${primaryGradient}
                        text-white font-bold text-lg shadow-md hover:shadow-lg active:shadow-inner`}
              onClick={handleAction}
              disabled={isLoading}
              aria-label={isEncoding ? "Encode text" : "Decode Base64"}
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                ) : null}
                <span className="relative">
                  {isEncoding ? 'Encode' : 'Decode'}
                  <span className="absolute inset-x-0 -bottom-1 h-1 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-50"></span>
                </span>
              </div>
            </button>
            
            {output && (
              <div className="mt-6 animate-fadeIn">
                <h2 className={`text-lg font-semibold mb-2 ${accentTextColor} transition-colors duration-300`}>Result:</h2>
                <div className={`${resultBg} p-3 rounded-md min-h-[60px] break-all border relative transition-colors duration-300`}>
                  {output}
                  <button 
                    onClick={handleCopy} 
                    className={`absolute top-2 right-2 p-1 text-white rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${copyButtonBg}`}
                    aria-label="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Isaac D&apos;Césares @ <a href="https://dcesares.dev" target="_blank" rel="noopener noreferrer" className={`${accentTextColor} hover:underline transition-colors duration-300`}>dcesares.dev</a>
          </div>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}