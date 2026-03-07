export function adminLoginTemplate(message = "") {
  return /*html*/ `
  <div class="login">
    <form class="login__form" hx-post="/login" hx-target=".login" hx-swap="outerHTML">
      <label for="username">Username</label>
      <input
       type="text"
       name="username"
       id="username"
       maxlength="10"
       required>

      <label for="password">Password</label>
      <input
       type="password"
       name="password"
       id="password"
       maxlength="16"
       minlength="6"
       required>
      <button type="submit">Login</button>
      <button type="submit" formaction="/new-account">New account</button>
    </form>
    <h3 class="login__message">${message}</h3>
  </div>`;
}
