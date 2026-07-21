const fs = require("fs");
const path = require("path");

// Generar environment
const envContent = `
export const environment = {
  production: false,
  googleMapsApiKey: "${process.env.GOOGLE_MAPS_API_KEY}"
};
`;

const envDir = path.join(__dirname, "src/environments");
fs.mkdirSync(envDir, { recursive: true });

fs.writeFileSync(
  path.join(envDir, "environment.development.ts"),
  envContent
);

// Generar index.html
const templatePath = path.join(__dirname, "src/index.html.template");
const outputPath = path.join(__dirname, "src/index.html");

const template = fs.readFileSync(templatePath, "utf8");

const output = template.replace(
  /\$\{GOOGLE_MAPS_API_KEY\}/g,
  process.env.GOOGLE_MAPS_API_KEY
);

fs.writeFileSync(outputPath, output);

console.log("Environment and index generated.");