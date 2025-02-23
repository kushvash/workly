// pages/_app.js
import "../styles/globals.css"; // Import global CSS (including Tailwind directives)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />; // Render the page component
}

export default MyApp;