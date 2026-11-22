const registroDataHora = document.querySelector("#datahora");
registroDataHora.value = new Date().toISOString();

for (const link of document.querySelectorAll("[data-modal]")) {
  const modal = document.getElementById(link.dataset.modal);
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    modal.showModal();
  });
  modal.addEventListener("close", () => link.focus());
}
