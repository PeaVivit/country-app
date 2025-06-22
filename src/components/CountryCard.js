// src/components/CountryCard.js
import React, { useState } from "react";

/**
 * Component สำหรับแสดงข้อมูลประเทศในรูปแบบ Card
 * @param {object} props - คุณสมบัติที่รับเข้ามา
 * @param {object} props.country - ข้อมูลประเทศ
 * @param {object} props.country.name - วัตถุชื่อประเทศ (common, official)
 * @param {object} props.country.flags - วัตถุข้อมูลธง (png, alt)
 * @param {number} [props.country.population] - จำนวนประชากร
 * @param {string} [props.country.region] - ภูมิภาค
 * @param {string[]} [props.country.capital] - เมืองหลวง (array)
 * @param {object} [props.country.currencies] - ข้อมูลสกุลเงิน
 * @param {object} [props.country.languages] - ข้อมูลภาษา
 * @param {string[]} [props.country.borders] - รายชื่อประเทศเพื่อนบ้าน (รหัส 3 ตัวอักษร)
 */
const CountryCard = ({ country }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsFlipped((prev) => !prev);
  };

  const currencyName = country.currencies
    ? Object.values(country.currencies)[0]?.name
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const flipCardStyle = {
    perspective: "1000px",
    width: "18rem",
    height: "24rem",
    cursor: "pointer",
  };

  const flipCardInnerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const flipCardFaceStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "1.75rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  };

  const flipCardBackStyle = {
    transform: "rotateY(180deg)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const holographicCardStyle = `
    relative overflow-hidden
    before:content-['']
    before:absolute
    before:inset-0
    before:bg-gradient-to-r
    
    before:opacity-0
    group-hover:before:opacity-100
    before:blur-md
    before:transition-opacity
    before:duration-500
    before:z-0

    after:content-['']
    after:absolute
    after:top-0
    after:left-[-75%]
    after:w-[50%]
    after:h-full
    after:bg-gradient-to-r
    after:from-white/10
    after:via-white/50
    after:to-white/10
    after:rotate-12
    after:transition-all
    after:duration-1000
    group-hover:after:left-[125%]
    after:z-10
  `;

  return (
    <div style={flipCardStyle} onClick={toggleFlip} className="group">
      <div style={flipCardInnerStyle}>
        {/* Front */}
        <div
          style={flipCardFaceStyle}
          className={`
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            flex flex-col
            ${holographicCardStyle}
          `}
        >
          <img
            src={country.flags.png}
            alt={country.flags.alt || `ธงชาติของ ${country.name.common}`}
            className="w-full h-40 object-cover rounded-t-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/CCCCCC/FFFFFF?text=ไม่พบธง";
            }}
          />
          <div className="p-12 flex flex-col flex-grow justify-center items-center z-20 relative">
            <h5 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {country.name.common}
            </h5>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ ...flipCardFaceStyle, ...flipCardBackStyle }}
          className={`
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            flex flex-col justify-between p-4
            ${holographicCardStyle}
          `}
        >
          <div className="flex flex-col flex-grow z-20 relative">
            <h5 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
              {country.name.common}
            </h5>
            <p className="text-gray-700 dark:text-gray-300 mb-1 mt-6 text-left">
              <span className="font-semibold">Population:</span>{" "}
              {country.population ? country.population.toLocaleString() : "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1 text-left">
              <span className="font-semibold">Region:</span>{" "}
              {country.region || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1 text-left">
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital && country.capital.length > 0
                ? country.capital.join(", ")
                : "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1 text-left">
              <span className="font-semibold">Currency:</span> {currencyName}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1 text-left">
              <span className="font-semibold">Languages:</span> {languages}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1 text-left">
              <span className="font-semibold">orders:</span>{" "}
              {country.borders && country.borders.length > 0
                ? country.borders.join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
