import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    /* eslint-disable */
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "f4753fd9-d482-465c-9065-bed20cb5ad9c";

    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
    /* eslint-enable */
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
