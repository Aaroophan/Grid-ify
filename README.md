# Grid-ify - Interactive Data Visualization

![React](https://img.shields.io/badge/react-18.x-61DAFB.svg?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-5.x-646CFF.svg?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/three.js-r160-black.svg?logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-38B2AC.svg?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6.svg?logo=typescript&logoColor=white)

## 🎯 Project Purpose

Create a **visually rich, interactive tool** where users can input and manipulate 3D coordinates (as data) and instantly see corresponding visualizations. It’s not about equations or functions - it’s about **spatial storytelling** through visuals.

---

## 🧩 Core Features

### 1. **Real-Time Data-to-3D Mapping**
* **Input**: `X, Y, Z` coordinates via a table or grid-based UI.
* **Output**: Instantly plotted **3D points** on a Three.js scene.
* **Live Sync**: Changes to the dataset are immediately reflected across all visualizations, powered by reactive state management.

### 2. **Object Rendering Modes**
* **Points**: Small 3D spheres marking each coordinate.
* **Lines**: Connect points in order of entry, visualizing paths or sequences.
* **Vectors**: Draw arrows from origin to each point or between selected points to demonstrate magnitude and direction.
* **Toggle**: User can switch between these modes seamlessly via the floating toolbar.

### 3. **3D Graph Scene**
* **Rendering**: High-performance rendering using **Three.js** via **@react-three/fiber**.
* **Helpers**: Includes visual axis helpers (X=Red, Y=Green, Z=Blue) for spatial orientation.
* **Controls**: Full **searchOrbitControls** support to pan, zoom, and rotate the scene freely.
* **Interactivity**: Designed for immersive exploration of spatial data.

### 4. **Data Table**
* **Management**: Users input 3D coordinates in a comprehensive table/grid UI.
* **CRUD Operations**: Support for adding, editing, and deleting rows dynamically.
* **Validation**: Inputs are rigorously validated using **Zod** to ensure numeric integrity and complete entries.
* **State Sync**: All changes propagate immediately to the 3D scene via **Zustand**.

### 5. **Toolbar (with Lucide Icons)**
* **Modes**: Toggle between Point, Line, and Vector visualization modes.
* **Actions**: Reset the graph or clear all data with a single click.
* **UI**: Floating, accessible toolbar designed for quick engagement.

### 6. **UI Styling & Animation**
* **Styling**: Built with **Tailwind CSS** for a fully responsive, mobile-first layout.
* **Animations**: Integrated **Framer Motion** for sleek UI transitions, sliding panels, and button hover effects.
* **Theme**: Modern "Glassmorphism" aesthetic with dark gradients and translucent elements.

---

## 🧱 Tech Stack

### Frontend Core
*   **[React 18](https://react.dev/)**: Component-based UI library.
*   **[TypeScript](https://www.typescriptlang.org/)**: Static typing for robust application development.
*   **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for blazing fast builds.

### 3D & Graphics
*   **[Three.js](https://threejs.org/)**: JavaScript 3D library.
*   **[@react-three/fiber](https://docs.pmndrs.assets/react-three-fiber)**: React renderer for Three.js.
*   **[@react-three/drei](https://github.com/pmndrs/drei)**: Useful helpers for react-three-fiber.

### State & Validation
*   **[Zustand](https://docs.pmndrs.assets/zustand)**: Small, fast, and scalable bearbones state-management solution.
*   **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.

### Styling & UI
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.
*   **[Framer Motion](https://www.framer.com/motion/)**: Production-ready motion library for React.
*   **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icons.

---

## 📦 Installation & Getting Started

Follow these steps to set up the project locally for development.

### Prerequisites
- **Node.js**: v16.0.0 or higher.
- **npm** (v7+) or **yarn**.

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Aaroophan/Grid-ify.git
    cd Grid-ify
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will actiavte at `http://localhost:5173`.

---

## 🔨 Usage Guide

### Building for Production
To generate a production-ready build (outputs to `docs/` folder):
```bash
npm run build
```

### Deployment
This project is configured for **GitHub Pages** deployment:
```bash
npm run deploy
```

### Linting
Ensure code quality by running the linter:
```bash
npm run lint
```

---

## 📂 Project Structure

A detailed overview of the source code organization:

```
e:/Projects/Grid-ify/
├── docs/               # Production build output (for GitHub Pages)
├── public/             # Static assets (images, icons)
├── src/
│   ├── components/     # UI Components
│   │   ├── DataTable.tsx   # React component for data entry
│   │   ├── ThreeScene/     # 3D Rendering logic
│   │   └── Toolbar.tsx     # Control interface
│   ├── store/          # Global State Managers
│   │   └── useStore.ts     # Zustand store implementation
│   ├── types/          # TypeScript Interfaces & Types
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root Application Layout
│   ├── main.tsx        # Application Entry Point
│   └── index.css       # Global Styles & Tailwind Imports
├── index.html          # HTML Entry Point
├── package.json        # Project Manifest & Scripts
├── tailwind.config.js  # Tailwind CSS Configuration
└── vite.config.ts      # Vite Bundler Configuration
```

---

## 🧠 Optional Enhancements (Future Scope)

* **Export/Import**: Save datasets as CSV/JSON files.
* **Bookmarks**: Save view configurations and camera angles.
* **Interactivity**: 3D labels or tooltips on hover over data points.
* **Animation**: Smooth transitions between data updates.
* **Timeline**: Time-based movement to show data trends over time.

---

## 👥 Target Users / Use Cases

* **Designers**: Visualize layout or abstract architectural data.
* **Developers**: Debug or explore 3D positional data algorithms.
* **Educators**: Teach spatial reasoning and coordinate geometry visually.
* **Engineers**: Simulate 3D vectors and spatial data flows.

---

## 🧭 Summary

This isn't just a calculator. It’s a **real-time 3D graphing interface** for playing with data visually — where the **table is the code**, and the 3D scene is the vivid output.

---

# 👨‍💻 About the Creator

**Aaroophan Varatharajan**
**Full Stack Software Engineer | MSc in Computer Science (In Progress) | Metadata-Driven Systems | Next.js, React, JavaScript/TypeScript | C# (.NET) | Node.js | Python (FastAPI) | T-SQL | PostgreSQL | MongoDB | Agile Team Player | Blog Writer**

I am **Aaroophan Varatharajan** and I am the developer of Grid-ify.

I am a **Software Engineer** with expertise in **Next.js**, **React**, **TypeScript**, and **ASP.NET Core**, I specialize in designing robust, scalable systems and metadata-driven UIs. I work on Grid-ify to reflect my passion for combining clean architecture with immersive user experiences.

I thrive in building data-driven web applications and distributed multi-service pipelines. I am currently focused on advancing my expertise in **Computer Science** and **AI/ML integration** at the **University of Moratuwa**.

### 🌐 Connect
- **Portfolio**: [aaroophan.dev](https://aaroophan.dev)
- **GitHub**: [github.com/Aaroophan](https://github.com/Aaroophan)
- **Instagram**: [@Aaroophan](https://instagram.com/Aaroophan)
- **LinkedIn**: [linkedin.com/in/aaroophan](https://linkedin.com/in/aaroophan)
- **Medium**: [aaroophan.medium.com](https://aaroophan.medium.com)
- **Email**: arophn@gmail.com

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to report a bug, please feel free to open an issue.

1.  **Fork** the project.
2.  **Branch** out (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the branch (`git push origin feature/AmazingFeature`).
5.  **Open a Pull Request**.

---

<div align="center">
  <p>Made by <strong>Aaroophan Varatharajan</strong></p>
  <a href="https://github.com/Aaroophan">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/aaroophan">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="http://aaroophan.dev">
    <img src="https://img.shields.io/badge/Portfolio-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Portfolio"/>
  </a>
</div>