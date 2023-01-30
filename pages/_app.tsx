import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {SITE_KEY} from "../config/index"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </>
  );
}
