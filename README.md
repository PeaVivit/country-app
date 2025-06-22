🌍 Country Explorer
A sleek and interactive web application built with React, allowing users to explore countries, search dynamically by various criteria, and navigate through a paginated list with a seamless user experience.

✨ Features
Dynamic Search: 🔍 Search countries by their common name, capital city, or currency name. Results update in real-time as you type, providing instant feedback.

Pagination: 📄 Efficiently browse through a large list of countries with intuitive pagination controls, enhancing navigation.

Dark Mode Toggle: 🌙↔️☀️ Switch effortlessly between light and dark themes for comfortable viewing in any environment. Your preference is intelligently saved locally!

Responsive Design: 📱💻 Optimized for a flawless experience across all devices, from mobile phones to large desktop screens, ensuring accessibility and usability.

Skeleton Loader: ⏳ Enjoy a smooth loading experience with elegant content placeholders that mimic the UI structure, reducing perceived wait times before data is fully fetched.

Expandable Country Cards: ➕ Each country card features a toggleable section to reveal more detailed information like population, region, capital, currencies, languages, and bordering countries, keeping the initial view clean.

API Integration: 🌐 Fetches comprehensive and up-to-date country data from the reliable REST Countries API.

🛠️ Technologies Used
Technology

Description

React

A JavaScript library for building dynamic user interfaces.

Tailwind CSS

A utility-first CSS framework for rapidly building custom designs with speed and flexibility.

Lucide React

A beautiful and customizable collection of SVG icons, integrated for clear visual cues.

📦 Installation & Setup
Follow these simple steps to get the project up and running on your local machine:

Clone the repository:

git clone https://github.com/your-username/country-explorer.git
cd country-explorer

(Note: Replace https://github.com/your-username/country-explorer.git with your actual repository URL if you've pushed it to GitHub.)

Install dependencies:
Ensure you have Node.js and npm (Node Package Manager) installed.

npm install

Configure Tailwind CSS:
Verify your tailwind.config.js in the root directory is correctly set up to scan your source files for Tailwind classes. It should appear as follows:

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode based on a 'dark' class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {}, // Extend default Tailwind theme
  },
  plugins: [], // Add any Tailwind plugins here
}

Also, confirm your src/index.css includes the essential Tailwind directives and custom font import:

/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Google Font - Inter for a modern and clean typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif; /* Apply Inter font to the body */
}

Run the development server:

npm start

This command will launch the application in your default browser at http://localhost:3000 (or another available port).

🎮 Usage
Search Bar: Effortlessly filter countries by typing their common name, capital city, or currency name into the search bar at the top.

Country Cards: Each interactive card prominently displays the country's flag and common name.

"More Info" Button: Click this intuitive button on any card to seamlessly expand or collapse additional details, providing a clutter-free interface.

Dark Mode Toggle: Utilize the elegant sun/moon icon button in the header to effortlessly switch between light and dark themes, adapting to your visual comfort.

Pagination: Navigate through extensive lists of countries using the clear "Previous", "Next", and numbered buttons located at the bottom, ensuring smooth browsing.

🚀 Deployment on Vercel
This project is meticulously configured and ready for effortless deployment on Vercel!

Live Site 👉 Your Live Site URL Here

🙏 Credits
Country Data: Generously provided by the REST Countries API.

Icons: Beautifully crafted and integrated from Lucide React.

Styling: Powerfully facilitated by the utility-first framework Tailwind CSS.