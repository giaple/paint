import { useState, useEffect } from "react";
export default function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setShowLoader(false), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {showLoader ? (
        <div className="loader-wrap">
          <div className="preloader">
            <div id="handle-preloader" className="handle-preloader">
              <div className="animation-preloader">
                <div className="spinner" />
                <div className="txt-loading">
                  <span data-text-preloader="N" className="letters-loading">
                    N
                  </span>
                  <span data-text-preloader="O" className="letters-loading">
                    O
                  </span>
                  <span data-text-preloader="O" className="letters-loading">
                    O
                  </span>
                  <span data-text-preloader="K" className="letters-loading">
                    K
                  </span>
                  <span data-text-preloader="-" className="letters-loading">
                    -
                  </span>
                  <span data-text-preloader="N" className="letters-loading">
                    N
                  </span>
                  <span data-text-preloader="A" className="letters-loading">
                    A
                  </span>
                  <span data-text-preloader="I" className="letters-loading">
                    I
                  </span>
                  <span data-text-preloader="L" className="letters-loading">
                    L
                  </span>
                  <span data-text-preloader="S" className="letters-loading">
                    S
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
