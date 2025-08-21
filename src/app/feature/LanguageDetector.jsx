import React, { useState, useEffect } from "react";

const LanguageDetector = () => {
  const [browserLanguage, setBrowserLanguage] = useState(null);
  useEffect(() => {
    if (navigator.language) {
      setBrowserLanguage(navigator.language);
    }
  }, []);
  return browserLanguage ? browserLanguage.split("-")[0] : "en";
};

export default LanguageDetector;
