export const showAlert = (type, msg) => {
  hideAlert();

  // type should be either error or success
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
};

export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
  window.setTimeout(hideAlert, 5000);
};
