export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col">
                <div class="card h-100 shadow" style="background-color: #1a1b3a; border: 2px solid #4b4d8a; border-radius: 20px; color: #d1d1e9;">
                    <img src="${data.src}" class="card-img-top" style="height: 160px; object-fit: cover; border-radius: 18px 18px 0 0; border-bottom: 1px solid #4b4d8a;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" style="color: #ffcc33;">${data.title}</h5>
                        <p class="card-text small flex-grow-1">${data.text}</p>
                        <div class="mt-auto d-flex flex-column gap-2">
                            <button class="btn btn-sm w-100" id="click-card-${data.id}" data-id="${data.id}" style="background-color: #ffcc33; color: #050714; font-weight: bold; border: none; border-radius: 10px; height: 35px;">
                                Подробнее
                            </button>
                            <button class="btn btn-sm btn-outline-danger w-100" id="delete-card-${data.id}" style="border-radius: 10px;">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById(`click-card-${data.id}`).addEventListener("click", clickListener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", () => {
            deleteListener(data.id);
        });
    }
}
