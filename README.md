# ThinkBoard

ThinkBoard is a modern, full-stack MERN (MongoDB, Express, React, Node.js) note-taking application enhanced with GenAI features powered by OpenAI. It allows users to create, edit, organize, and summarize notes with a beautiful, responsive UI built using Tailwind CSS.

---

## ✨ Features

- **Create, Edit, and Delete Notes**  
  Simple and intuitive interface for managing your notes.

- **AI-Powered Note Summarization**  
  Instantly generate concise summaries of your notes using OpenAI.

- **GenAI Features**  
  - Content generation from prompts
  - Smart title suggestions
  - Automatic tagging/categorization
  - Semantic search
  - Note translation
  - Grammar and spell checking
  - Question answering from notes
  - Voice-to-note (speech-to-text)
  - Personalized quiz/flashcard generator

- **Responsive Design**  
  Built with Tailwind CSS for a seamless experience on all devices.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI Integration:** OpenAI API (GPT models)
- **Notifications:** react-hot-toast

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/thinkboard.git
cd thinkboard
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

#### Backend `.env`
```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### 4. Run the Application

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend
```bash
cd ../frontend
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🧠 AI Integration

- To use GenAI features, [get your OpenAI API key](https://platform.openai.com/api-keys) and add it to your backend `.env` file.
- All AI requests are securely handled on the backend.

---

## 📁 Project Structure

```
/backend      # Express API, MongoDB models, OpenAI integration
/frontend     # React app, Tailwind CSS, pages and components
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

MIT

---

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/)
