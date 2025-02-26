"use client";

import { useEffect, useState } from "react";

const CustomTranslateButton = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    (
      window as unknown as { googleTranslateElementInit: () => void }
    ).googleTranslateElementInit = () => {
      new (
        window as typeof window & {
          google: {
            translate: {
              TranslateElement: new (options: object, element: string) => void;
            };
          };
        }
      ).google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  const translatePage = (lang: string) => {
    setCurrentLang(lang);
    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = lang;
      selectElement.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      {currentLang === "en" ? (
        <button
          onClick={() => translatePage("id")}
          className="rounded-full text-2xl leading-none"
        >
          🇬🇧
        </button>
      ) : (
        <button
          onClick={() => translatePage("en")}
          className="rounded-full text-2xl leading-none"
        >
          🇮🇩
        </button>
      )}
    </div>
  );
};

export default CustomTranslateButton;
