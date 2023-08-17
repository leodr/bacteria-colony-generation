import React from "react";
import { ISettings } from "./settings-interface";

interface SettingsProps {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

export function Settings({ settings, setSettings }: SettingsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof ISettings;
    const value =
      event.target.type === "range"
        ? parseInt(event.target.value, 10)
        : event.target.value;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <form>
      <div>
        <label>
          Canvas Width:
          <input
            type="number"
            name="canvasWidth"
            value={settings.canvasWidth}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Canvas Height:
          <input
            type="number"
            name="canvasHeight"
            value={settings.canvasHeight}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Background Color:
          <input
            type="color"
            name="backgroundColor"
            value={settings.backgroundColor}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Bounding Circle Color:
          <input
            type="color"
            name="boundingCircleColor"
            value={settings.boundingCircleColor}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Random Circle Color:
          <input
            type="color"
            name="randomCircleColor"
            value={settings.randomCircleColor}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Padding:
          <input
            type="range"
            name="padding"
            min="0"
            max="200"
            value={settings.padding}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Min Circle Size:
          <input
            type="number"
            name="minCircleSize"
            value={settings.minCircleSize}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Max Circle Size:
          <input
            type="number"
            name="maxCircleSize"
            value={settings.maxCircleSize}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}
