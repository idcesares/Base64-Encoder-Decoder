## Base64 Encoder/Decoder

This is a simple React-based web application that provides a user-friendly interface for encoding and decoding text to and from Base64 format. The app utilizes the `btoa()` and `atob()` JavaScript functions for the core encoding and decoding operations.

### Features

* **Toggle between Encode and Decode modes:** A visually appealing toggle switch allows users to seamlessly switch between encoding and decoding functionalities.
* **Real-time input and output:** The app provides instant feedback, displaying the encoded or decoded result as the user types or pastes their input.
* **Loading indicator:** A loading animation provides visual feedback during the encoding/decoding process, enhancing the user experience.
* **Error handling:** The app gracefully handles invalid Base64 input during decoding, displaying a clear error message.
* **Responsive design:** The app is designed to work well on various screen sizes, ensuring accessibility across different devices.

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/base64-encoder-decoder.git
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
* **next/head:** A Next.js component for managing the head section of your pages.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.