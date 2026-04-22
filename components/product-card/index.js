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
                <div class="card h-100"
                     style="background: black; border: 1px solid white; border-radius: 16px; color: white; overflow: hidden;">

                    <div style="height: 200px; background: black; overflow: hidden;">
                        <img src="${data.src}"
                             style="width: 100%; height: 100%; object-fit: cover;"
                             alt="${data.title}">
                    </div>

                    <div class="card-body d-flex flex-column">

                        <h5 style="color: white;">${data.title}</h5>

                        <p style="color: #aaa; font-size: 0.8rem; margin-bottom: 5px;">
                            ${tagString}
                        </p>

                        <p class="small flex-grow-1" style="color: #ccc;">
                            ${data.text}
                        </p>

                        <div style="border: 1px solid white;
                                    padding: 6px;
                                    border-radius: 10px;
                                    text-align: center;
                                    font-size: 0.9rem;
                                    font-weight: bold;
                                    margin-bottom: 10px;
                                    background: black;
                                    color: white;">
                            Энергия дня: ${astroIndex}
                        </div>

                        <div class="d-flex flex-column gap-2">

                            <button class="btn btn-sm"
                                    id="move-${data.id}"
                                    style="background: transparent; border: 1px solid white; color: white; border-radius: 10px;">
                                В начало
                            </button>

                            <div class="d-flex gap-2">

                                <button class="btn btn-sm w-100"
                                        id="click-${data.id}"
                                        data-id="${data.id}"
                                        style="background: transparent; border: 1px solid white; color: white; border-radius: 10px;">
                                    Подробнее
                                </button>

                                <button class="btn btn-sm w-100"
                                        id="delete-${data.id}"
                                        style="background: transparent; border: 1px solid white; color: white; border-radius: 10px;">
                                    Удалить
                                </button>

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
