import React, { useState } from "react";
import ExerciseVisual from "./ExerciseVisual";

export default function ExerciseMedia({ id, visualType }) {
  const [srcIndex, setSrcIndex] = useState(0);

  // Clean filename: e.g. "d1_e1" -> "d1e1"
  const cleanId = id.replace("_", "");

  // List of possible file paths to search for
  const fileSources = [
    `/gifs/${cleanId}.gif`,      // inside a "gifs" subfolder, e.g. /gifs/d1e1.gif (served from public/gifs)
    `/gifs/${cleanId}.jpg`,      // support jpg format, e.g. d4e1.jpg
    `/gifs/${cleanId}.png`,      // support png format
    `/gifs/${cleanId}.jpeg`,     // support jpeg format
    `/exercises/${cleanId}.gif`, // inside an "exercises" subfolder, e.g. /exercises/d1e1.gif
    `/${cleanId}.gif`,           // flat in public folder root, e.g. /d1e1.gif
    `/${id}.gif`,                // flat in public folder root with underscore, e.g. /d1_e1.gif
  ];

  const handleImageError = () => {
    if (srcIndex < fileSources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      // All image sources failed, trigger SVG fallback code
      setSrcIndex(-1);
    }
  };

  // If we cycled through all sources and failed, render the SVG
  if (srcIndex === -1) {
    return <ExerciseVisual type={visualType} />;
  }

  return (
    <div className="w-full h-40 md:h-48 relative flex items-center justify-center overflow-hidden bg-zinc-950/85 rounded-xl border border-zinc-900/80 p-1">
      <img
        src={fileSources[srcIndex]}
        onError={handleImageError}
        alt="Exercise Demonstration"
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </div>
  );
}
