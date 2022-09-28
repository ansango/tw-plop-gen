import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useTheme, themes } from "./components/Theme";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <a
          className="btn btn-ghost btn-circle"
          href="https://vitejs.dev"
          target="_blank"
        >
          <img src="/vite.svg" alt="Vite logo" className="w-8" />
        </a>
      </div>

      <div className="navbar-end">
        <ul className="dropdown dropdown-end">
          <li tabIndex={0}>
            <button className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow rounded-box w-52"
            >
              {themes.map((themeMap) => {
                const isActive =
                  theme === themeMap
                    ? "btn btn-link btn-active"
                    : "btn btn-link";
                return (
                  <li key={themeMap}>
                    <button
                      onClick={() => setTheme(themeMap)}
                      className={isActive}
                    >
                      {themeMap}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-base h-screen flex flex-col justify-between container mx-auto space-y-10">
      <Navbar />
      <div className="m-auto ">
        <div className="max-w-lg mx-auto flex justify-center items-center space-x-10">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" alt="Vite logo" className="w-16" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} alt="React logo" className="w-16" />
          </a>
        </div>
        <div className="max-w-lg mx-auto text-center space-y-16">
          <h1 className="text-3xl">Vite + React</h1>
          <div className="space-y-10">
            <button className="btn btn-primary" onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
