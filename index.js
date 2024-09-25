// Number of colors in the background gradient 
const bg_colors = 4;

function refresh_clock() {
  const hour_text = document.getElementById("hour");
  const min_text = document.getElementById("min");
  const sec_text = document.getElementById("sec");

  const date = new Date();
  const hour = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const sec = ("0" + date.getSeconds()).slice(-2);

  hour_text.textContent = hour;
  min_text.textContent = min;
  sec_text.textContent = sec;
}

function generate_pastel() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let hsl = rgb2hsl(r, g, b);
  hsl[1] = 0.9;
  hsl[2] = 0.8;

  let rgb = hsl2rgb(hsl[0], hsl[1], hsl[2]);

  return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
}

function rgb2hsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

function hsl2rgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

let gradient_colors = [];

// Generate random pastel colors
for (let i = 0; i < bg_colors; i++) {
  gradient_colors.push(generate_pastel());
}

// Construct gradient string
let gradient_style = "linear-gradient(to bottom right, ";
for (let j = 0; j < bg_colors; j++) {
  gradient_style += gradient_colors[j];
  if (j < bg_colors - 1) {
    gradient_style += ", ";
  }
}
gradient_style += ")";

// Apply gradient to body
document.body.style.background = gradient_style;

// Start the clock
refresh_clock();
setInterval(refresh_clock, 1000);
