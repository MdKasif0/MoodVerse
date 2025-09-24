# MoodVerse

**Find a verse that speaks to your heart.**

MoodVerse is a serene and beautifully designed web application that provides inspirational verses from the Quran tailored to your current mood. Whether you're feeling hopeful, patient, grateful, or facing challenges, MoodVerse offers a moment of reflection and comfort.

![MoodVerse Screenshot](https://moodverse.app/screenshot.png) <!-- Placeholder for a screenshot -->

---

## ✨ Features

- **📖 Mood-Based Discovery:** Select from a range of moods like 'Hopeful', 'Sad', 'Stress', and 'Grateful' to find a relevant verse.
- **📚 Rich Verse Collection:** Features a curated collection of over 300 verses from the Quran.
- **🎨 Themed Visuals:** Each mood is paired with a unique, aesthetically pleasing color palette and background texture.
- **🔀 Multiple Discovery Modes:** Get a verse for your mood, a random verse, or the special 'Verse of the Day'.
- **❤️ Favorites:** Save your most cherished verses to your personal collection, stored locally in your browser.
- **🔗 Tafsir Links:** Tap the verse reference to open a modal with the full citation and a direct link to Quran.com for deeper study.
- **📋 Copy to Clipboard:** Easily copy the verse and its reference to share with others.
- **📱 Fully Responsive:** A seamless experience on desktop, tablet, and mobile devices.
- **⚡ Fast & Offline-Ready:** Built as a Progressive Web App (PWA), MoodVerse loads quickly and works even without an internet connection.

---

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** Custom SVG components
- **Offline Support:** Service Worker API

---

## 🚀 Getting Started

Follow these instructions to get a local copy of MoodVerse up and running on your machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 16 or later) and npm installed.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/moodverse.git
    cd moodverse
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

---

## 📁 Project Structure

The project follows a standard React application structure:

```
moodverse/
├── public/
│   ├── favicon.svg         # Application favicon
│   ├── sw.js               # Service worker for PWA functionality
│   └── verses.json         # The core data file with all verses
├── src/
│   ├── components/
│   │   ├── icons/          # SVG icon components
│   │   ├── MoodSelector.tsx
│   │   ├── VerseDisplay.tsx
│   │   └── ...             # Other reusable components
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point for React
│   ├── types.ts            # TypeScript type definitions
│   └── ...
├── .gitignore
├── index.html              # Main HTML file
├── package.json
└── Readme.md
```

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features, improvements, or bug fixes, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code follows the existing style and that you test your changes thoroughly.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Verse translations are sourced from various respected Islamic resources.
- Font families used are [Inter](https://fonts.google.com/specimen/Inter) and [Merriweather](https://fonts.google.com/specimen/Merriweather).
