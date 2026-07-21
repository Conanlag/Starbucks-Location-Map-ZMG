const fs = require("fs");
const path = require("path");

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

// index.html
const template = fs.readFileSync(
  path.join(__dirname, "src/index.html"),
  "utf8"
);

const index = template.replace(
  /\$\{GOOGLE_MAPS_API_KEY\}/g,
  process.env.GOOGLE_MAPS_API_KEY
);

fs.writeFileSync(
  path.join(__dirname, "src/index.html"),
  index
);

console.log("Environment and index generated.");