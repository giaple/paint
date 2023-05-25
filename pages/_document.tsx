import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Jquery plugin*/}
        <Script strategy="beforeInteractive" src="/js/jquery.js"/>
        <Script strategy="lazyOnload" src="/js/jquery-ui.min.js"/>
        <Script strategy="lazyOnload" src="/js/jquery.fancybox.js"/>
        <Script strategy="lazyOnload" src="/js/jquery.nice-select.min.js"/>
        <Script strategy="lazyOnload" src="/js/popper.min.js"/>
        <Script strategy="lazyOnload" src="/js/bootstrap.min.js"/>
        <Script strategy="lazyOnload" src="/js/owl.js"/>
        <Script strategy="lazyOnload" src="/js/wow.js"/>
        <Script strategy="lazyOnload" src="/js/validation.js"/>
        <Script strategy="lazyOnload" src="/js/appear.js"/>
        <Script strategy="lazyOnload" src="/js/scrollbar.js"/>
        <Script strategy="lazyOnload" src="/js/plugins.js"/>
        <Script strategy="lazyOnload" src="/js/text_animation.js"/>

        {/* Main js*/}
        <Script strategy="lazyOnload" src="/js/script.js"/>
        <Script
         strategy="lazyOnload"
          src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
        />

        <Script strategy="lazyOnload" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"/>
        <Script strategy="lazyOnload" src="//embed.typeform.com/next/embed.js" data-hj-allow-iframe=""/>
        

      </body>
    </Html>
  );
}
