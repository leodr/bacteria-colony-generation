import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { Settings } from "./Settings";
import { ISettings } from "./settings-interface";

function initSettings(): ISettings {
  const savedSettings = localStorage.getItem("circleAppSettings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    canvasWidth: 512,
    canvasHeight: 512,
    backgroundColor: "#FF0000",
    boundingCircleColor: "#FFFFFF",
    randomCircleColor: "#000000",
    padding: 0,
    minCircleSize: 5,
    maxCircleSize: 25,
  };
}

export function App() {
  const [settings, setSettings] = useState<ISettings>(initSettings);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Persist settings to local storage when they're changed
  useEffect(() => {
    localStorage.setItem("circleAppSettings", JSON.stringify(settings));
  }, [settings]);

  function handleDownload() {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `generated_bacteria_${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  }

  return (
    <div>
      <Settings settings={settings} setSettings={setSettings} />
      <Canvas settings={settings} canvasRef={canvasRef} />
      <div>
        <button onClick={handleDownload}>Download Image</button>
      </div>
    </div>
  );
}
