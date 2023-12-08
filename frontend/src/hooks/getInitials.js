export function getUserInitials(username) {
  if (typeof username !== "string" || !username.trim()) {
    return "";
  }

  const names = username.split(" ");
  let initials = "";

  if (names.length > 0) {
    initials += names[0].charAt(0).toUpperCase(); // Add first initial

    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase(); // Add last initial
    }
  }

  return initials;
}
