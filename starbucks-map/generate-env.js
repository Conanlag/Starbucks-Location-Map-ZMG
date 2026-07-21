const fs = require("fs");
const path = require("path");

const content = `
export const environment = {
  production: false,
  googleMapsApiKey: "${process.env.GOOGLE_MAPS_API_KEY}",
  apiUrl: "${process.env.API_URL}"
};
`;

const envDir = path.join(__dirname, "src/environments");

fs.mkdirSync(envDir, { recursive: true });

fs.writeFileSync(path.join(envDir, "environment.ts"), content);
fs.writeFileSync(path.join(envDir, "environment.development.ts"), content);

console.log("Environment files generated");