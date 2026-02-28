function isExistingSession() {
  const loadedBefore = sessionStorage.getItem("firstLoad");
  if (!loadedBefore) {
    sessionStorage.setItem("firstLoad", "1");
    // Make a request to server to set sessions up
  }
}

isExistingSession();
