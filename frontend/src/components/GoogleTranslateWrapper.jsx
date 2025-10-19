import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';

const GoogleTranslateWrapper = () => {
  useEffect(() => {
    GoogleTranslate.init();
  }, []);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const handleClick = () => {
    const dropdown = document.querySelector(".goog-te-gadget .goog-te-combo");
    if(dropdown) {
      dropdown.style.display = isDropdownVisible ? "none" : "block";
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" px-3 py-3 border border-gray-600 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
    >
      <Globe className="w-5 h-5 text-white" />
      <div
        id="google_translate_element"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default GoogleTranslateWrapper;