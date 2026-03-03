async function isExistingSession() {
  const loadedBefore = sessionStorage.getItem("firstLoad");
  if (!loadedBefore) {
    sessionStorage.setItem("firstLoad", "1");
    // Request to server to set session up
    await fetch("/create-session", {
      method: "POST",
    });
  }
}
await isExistingSession();
