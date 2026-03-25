export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="${data.src}" alt="img">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text flex-grow-1">${data.text}</p>
                    <div class="d-flex justify-content-between mt-auto">
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-outline-danger btn-sm" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            </div>`;
    }

    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById(`click-card-${data.id}`).addEventListener("click", clickListener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", (e) => {
            e.stopPropagation();
            deleteListener(data.id);
        });
    }
}
