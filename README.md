## Base64 Encoder/Decoder

This is a simple React-based web application that provides a user-friendly interface for encoding and decoding text to and from Base64 format. The app now supports full Unicode input using custom encoding utilities and exposes a server API for processing large payloads.

### Official Website

[https://base64.dcesares.dev/](https://base64.dcesares.dev/)

### Features

* **Toggle between Encode and Decode modes:** A visually appealing toggle switch allows users to seamlessly switch between encoding and decoding functionalities.
* **Real-time input and output:** The app provides instant feedback, displaying the encoded or decoded result as the user types or pastes their input.
* **Unicode support:** Text is encoded/decoded with full Unicode compatibility.
* **Server API:** Send POST requests to `/api/base64` to encode or decode data on the server.
* **Loading indicator:** A loading animation provides visual feedback during the encoding/decoding process, enhancing the user experience.
* **Error handling:** The app gracefully handles invalid Base64 input during decoding, displaying a clear error message.
* **Responsive and accessible design:** Keyboard focus outlines and ARIA attributes help ensure accessibility across different devices.

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/idcesares/Base64-Encoder-Decoder.git
   ```

2. **Install dependencies:**

   ```bash
   cd base64-encoder-decoder
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in your browser:**

   The app should now be running at `http://localhost:3000`.

### Usage

1. **Select mode:** Choose whether you want to encode or decode text using the toggle switch.
2. **Enter input:** Type or paste your text or Base64 string into the input area.
3. **Click the button:** Click the "Encode" or "Decode" button to perform the desired operation.
4. **View the result:** The encoded or decoded output will be displayed in the result area.

### Dependencies

* **React:** The core JavaScript library for building user interfaces.
* **@radix-ui/react-switch:** A library providing accessible and customizable switch components.
* **lucide-react:** A collection of beautifully simple icons.

### Testing

Run the Jest test suite with:

```bash
npm test
```

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

### SEO and GEO

This project applies common search engine optimization (SEO) patterns including descriptive meta tags and structured data. The code is also formatted to help generative engines (GEO) understand the content. Results may vary and no ranking is guaranteed.

The site now includes a `robots.txt` file to guide crawlers and a `sitemap.xml` for better page discovery. Both files live in the `public/` directory and are served from the site root.

### Author

[Isaac D'Césares](https://dcesares.dev)

### Disclaimer

This tool is provided for educational purposes. There is no guarantee of performance for SEO or GEO techniques. Use it at your own risk.
