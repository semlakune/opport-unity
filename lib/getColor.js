'use client';

import ColorThief from 'colorthief';

/**
 * Get pastel dominant color from image source.
 * @param {string} src - Source URL of the image.
 * @param {boolean} pastel - Flag indicating if the color should be converted to a pastel tone.
 * @returns {Promise<string>} - Resolves with the pastel dominant color in RGB format.
 */
function getColorFromImg({ src, pastel = false }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        let color = colorThief.getColor(img);

        if (pastel) {
          const factor = 0.7;
          color = [
            Math.round((255 - color[0]) * factor + color[0]),
            Math.round((255 - color[1]) * factor + color[1]),
            Math.round((255 - color[2]) * factor + color[2]),
          ];
        }

        resolve(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load the image."));
    };

    img.src = src;
  });
}

export default getColorFromImg;