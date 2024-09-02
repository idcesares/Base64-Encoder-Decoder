import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Loader2 } from 'lucide-react';
import Head from 'next/head';

export default function Home() {

  const title = "Base64 Encoder/Decoder | Free Online Tool";
  const description = "Easily encode and decode text to and from Base64 format with our free online tool. Fast, secure, and user-friendly.";

  const [isEncoding, setIsEncoding] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsEncoding(!isEncoding);
    setInput('');
    setOutput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (isEncoding) {
        setOutput(btoa(input));
      } else {
        try {
          setOutput(atob(input));
        } catch (error) {
          setOutput('Invalid Base64 input');
        }
      }
      setIsLoading(false);
    }, 500); // Simulate processing time
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="base64, encoder, decoder, online tool, text conversion" />
      </Head>
    <main>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6 mb-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Base64 Encoder/Decoder</h1>
        
        <div className="flex items-center justify-center space-x-4 bg-gray-100 p-3 rounded-full">
          <span className={`text-sm transition-colors duration-300 ${!isEncoding ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>Decode</span>
          <Switch.Root
            checked={isEncoding}
            onCheckedChange={handleToggle}
            className={`${
              isEncoding ? 'bg-indigo-600' : 'bg-gray-400'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                isEncoding ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch.Root>
          <span className={`text-sm transition-colors duration-300 ${isEncoding ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>Encode</span>
        </div>
        
        <textarea
          className="w-full p-3 border-2 border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
          rows="4"
          placeholder={isEncoding ? "Enter text to encode" : "Enter Base64 to decode"}
          value={input}
          onChange={handleInputChange}
        />
        
        <button 
          className="w-full py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                    bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:from-indigo-700 active:to-purple-800
                    text-white font-bold text-lg shadow-md hover:shadow-lg active:shadow-inner"
          onClick={handleAction}
          disabled={isLoading}
        >
          <div className="flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : null}
            <span className="relative">
              {isEncoding ? 'Encode' : 'Decode'}
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-50"></span>
            </span>
          </div>
        </button>
        
        {output && (
          <div className="mt-6 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2 text-indigo-600">Result:</h2>
            <div className="bg-indigo-50 p-3 rounded-md min-h-[60px] break-all border border-indigo-200">
              {output}
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Isaac D&apos;Césares @ <a href="https://dcesares.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">dcesares.dev</a>
      </div>
    </div>
    </main>
    </>
);}