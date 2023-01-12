export function isDarkColor(
  hexColor: string,
  options: { override?: Record<string, boolean> } = {}
) {
  if (options && options.override) {
    var overridedColor = Object.keys(options.override).find(function (k) {
      return k.toLowerCase() === hexColor.toLowerCase();
    });
    if (overridedColor !== undefined) {
      return options.override[overridedColor];
    }
  }

  var rgb = hexToRgb(hexColor);
  var r = rgb?.r ?? 0;
  var g = rgb?.g ?? 0;
  var b = rgb?.b ?? 0;

  var colorArray = [r / 255, g / 255, b / 255].map(function (v) {
    if (v <= 0.03928) {
      return v / 12.92;
    }

    return Math.pow((v + 0.055) / 1.055, 2.4);
  });

  var luminance =
    0.2126 * colorArray[0] + 0.7152 * colorArray[1] + 0.0722 * colorArray[2];

  return luminance <= 0.179;
}

export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
