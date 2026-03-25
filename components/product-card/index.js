export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    concatenate(arr, separator) { return arr.join(separator); }

    getMaxDiff(nums) {
        if (nums.length < 4) return 0;
        let sorted = [...nums].sort((a, b) => a - b);
        let n = sorted.length;
        return (sorted[n-1] * sorted[n-2]) - (sorted[0] * sorted[1]);
    }

    getHTML(data) {
        const tagString = this.concatenate(data.tags, ' ');
        const astroIndex = this.getMaxDiff(data.nums);

        return `
            <div class="col">
                <div class="card h-100 shadow" style="background-color: #1a1b3a; border: 2px solid #4b4d8a; border-radius: 20px; color: #d1d1e9; overflow: hidden;">

                    <div style="height: 200px; background: #050714; overflow: hidden;">
                        <img src="${data.src}" style="width: 100%; height: 100%; object-fit: cover;" alt="${data.title}">
                    </div>

                    <div class="card-body d-flex flex-column">
                        <h5 style="color: #ffcc33;">${data.title}</h5>
                        <p style="color: #8e90c1; font-size: 0.8rem; margin-bottom: 5px;">${tagString}</p>
                        <p class="small flex-grow-1" style="color: #b0b2d8;">${data.text}</p>

                        <div style="color: #ffcc33; border: 1px solid #4b4d8a; padding: 5px; border-radius: 10px; text-align: center; font-size: 0.9rem; font-weight: bold; margin-bottom: 10px; background: #050714;">
                            Энергия дня: ${astroIndex}
                        </div>

                        <div class="d-flex flex-column gap-2">
                            <button class="btn btn-sm" id="move-${data.id}" style="background: #4b4d8a; color: white; border-radius: 10px;">В начало</button>
                            <div class="d-flex justify-content-between gap-2">
                                <button class="btn btn-sm w-100" id="click-${data.id}" data-id="${data.id}" style="background: #ffcc33; color: #050714; font-weight: bold; border-radius: 10px;">Подробнее</button>
                                <button class="btn btn-sm btn-outline-danger" id="delete-${data.id}" style="border-radius: 10px;">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    render(data, clickListener, deleteListener, moveListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        // Добавляем обработчики
        document.getElementById(`click-${data.id}`).onclick = clickListener;
        document.getElementById(`delete-${data.id}`).onclick = () => deleteListener(data.id);
        document.getElementById(`move-${data.id}`).onclick = () => moveListener(data.id);
    }
}
