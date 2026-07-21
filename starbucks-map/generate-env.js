const fs = require("fs");
const path = require("path");

const content = `
export const environment = {
  production: false,
  googleMapsApiKey: "${process.env.GOOGLE_MAPS_API_KEY}",
  apiUrl: "${process.env.API_URL}"
};
`;

fs.mkdirSync(path.join(__dirname, "src/environments"), { recursive: true });

fs.writeFileSync(
  path.join(__dirname, "src/environments/environment.development.ts"),
  content
);

console.log("environment.development.ts generated");