import { adminLoginTemplate } from "./admin-login-template.js";
import { createListingTemplate } from "./create-listing-template.js";

export function adminPage(loginStatus) {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <script
        src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js"
        integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz"
        crossorigin="anonymous"
      ></script>
    </head>
    <body>
      ${loginStatus ? createListingTemplate() : adminLoginTemplate()}
      
      <script src="./setup-session.js" type="module"></script>
    </body>
  </html>
`;
}
