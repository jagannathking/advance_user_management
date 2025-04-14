# Advanced Profile Manager

A ReactJS application designed to manage user profiles effectively. It utilizes Redux for state management and persists data using a custom localStorage hook.

## ✨ Features

*   **Add New Profiles:** Add user profiles via a modal form.
*   **View Profiles:** Display all profiles in a responsive card grid.
*   **Edit Profiles:** Update existing profile information through an edit modal.
*   **Search:** Dynamically search profiles by name, email, description, etc.
*   **Filter:** Filter profiles by language, education, and specialization using toggleable filter options.
*   **Persistence:** User data is saved to the browser's localStorage and reloaded on startup.

## 🛠️ Tech Stack

*   React (Functional Components & Hooks)
*   Redux (for global state management)
*   React-Redux
*   Tailwind CSS (for styling)
*   `uuid` (for unique IDs)
*   `react-icons` (for icons)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd advanced-profile-manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

4.  Open your browser and navigate to `http://localhost:3000`.

## 📂 Folder Structure

src/
├── components/ # UI Components (Forms, Cards, Modals, etc.)
├── hooks/ # Custom React Hooks (useLocalStorage)
├── redux/ # Redux related files (actions, reducers, store)
├── App.jsx # Main application component
└── index.js # Application entry point

