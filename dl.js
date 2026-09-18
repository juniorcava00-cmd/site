window.TITAN_SETUP = "https://github.com/juniorcava00-cmd/site/releases/download/v1.0/TitanTurboPRO-V1809.zip";
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-setup]");
  if (!a) return;
  e.preventDefault();
  window.location.href = window.TITAN_SETUP;
});
