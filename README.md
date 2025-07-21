# README.md

# SmartHelp.AI

SmartHelp.AI is a micro-SaaS application that allows businesses to create a custom AI chatbot based on their website's FAQ or support content. Users can upload documents or paste text, and the chatbot will respond to user inquiries using the provided content.

## Features

1. **Upload FAQ/Docs**: Users can upload FAQ documents in .txt or .pdf format or paste text directly into the application.
2. **AI Chat Interface**: A user-friendly chat interface that mimics ChatGPT, responding only with the uploaded content.
3. **Context-Based Answering**: Utilizes OpenAI's API with a system prompt to ensure responses are relevant and limited to the provided content.
4. **Embed Code Generator**: Generates simple `<iframe>` or script code for easy integration into any website.
5. **Chat History**: Optionally saves chat history per user session for reference.

## Tech Stack

- **Frontend**: React, Tailwind CSS, and a Chat UI similar to ChatGPT.
- **Backend**: Node.js and Express.
- **Database**: MongoDB for storing knowledge and chat logs.
- **AI**: OpenAI GPT API for context-based responses.
- **Optional Advanced**: LangChain or vector databases for future enhancements.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd smarthelp-ai-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Upload your FAQ documents or paste text into the application.
- Interact with the AI chatbot to get answers based on your uploaded content.
- Use the embed code generator to integrate the chatbot into your website.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT API.
- Tailwind CSS for the styling framework.
- React for the frontend library.

---

This README provides an overview of the SmartHelp.AI project, its features, tech stack, and instructions for getting started.