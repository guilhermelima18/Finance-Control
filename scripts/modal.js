function openModal() {
    const modal = document.querySelector(".modal-overlay");
    const transaction = document.querySelector(".new-transaction");

    transaction.addEventListener("click", () => {
        modal.classList.add("active");
    })

}
openModal();

function closeModal() {
    const modal = document.querySelector(".modal-overlay");
    const cancel = document.querySelector(".button-actions #cancel");

    cancel.addEventListener("click", () => {
        modal.classList.remove("active");
    })
}
closeModal();