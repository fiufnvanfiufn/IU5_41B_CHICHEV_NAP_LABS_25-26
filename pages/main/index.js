import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.planetList = this.getPlanets();
        this.filteredData = [...this.planetList];
    }

    getPlanets() {
        return [
            { id: 1, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/960px-Venus_from_Mariner_10.jpg", title: "Венера", tags: ['Любовь и отношения', 'Финансовая стабильность'], nums: [5, 6, 2, 7, 4], text: "Она определяет, как человек выражает чувства, его эстетические вкусы, отношение к материальным ценностям и выбор партнера." },
            { id: 2, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mars_Valles_Marineris_EDIT.jpg/960px-Mars_Valles_Marineris_EDIT.jpg", title: "Марс", tags: ['Достижение', 'Источник личной энергии'], nums: [5, 6, 2, 7, 4], text: "Символизирует энергию, волю, активные действия, самоутверждение и сексуальность. " },
            { id: 3, src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Uranus_Voyager2_color_calibrated.png", title: "Уран", tags: ['Интуиция', 'Перемены сознания'], nums: [5, 6, 2, 7, 4], text: "Символизирующая свободу, революционные перемены, озарения, технологии и независимость." },
            { id: 4, src: "https://static.wikia.nocookie.net/rustarwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20120529135204", title: "Альдераан", tags: ['Континентальный климат', 'Гуманоиды'], nums: [5, 6, 2, 7, 4], text: "Приятный теплый климат." },
            { id: 5, src: "https://static.wikia.nocookie.net/project-hail-mary-andy-weir/images/b/bf/Erid_%28Movie%29.png/revision/latest?cb=20260327015426", title: "Эрида", tags: ['Сильное давление', 'Высокая температура'], nums: [10, 2, 3, 8, 1], text: "Полна интересной внеземной жизни" },
            { id: 6, src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Africa_and_Europe_from_a_Million_Miles_Away.png", title: "Земля", tags: ['Стабильность', 'Надежность'], nums: [4, 9, 2, 5, 6], text: "Фундамент, отвечающий за материальную сферу и устойчивость. " },
        ];
    }

    filterPlanets() {
        const searchValue = document.getElementById('search-input').value.toLowerCase();
        const tagValue = document.getElementById('tag-filter').value;

        this.filteredData = this.planetList.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchValue);
            const matchesTag = tagValue === 'all' || item.tags.includes(tagValue);
            return matchesSearch && matchesTag;
        });

        this.renderProducts();
    }

    renderProducts() {
        const productList = document.getElementById('main-page');
        if (!productList) return;

        productList.innerHTML = '';
        this.filteredData.forEach((item) => {
            const productCard = new ProductCardComponent(productList);
            productCard.render(
                item,
                this.clickPlanet.bind(this),
                this.onDeletePlanet.bind(this),
                this.MovePlanetToTop.bind(this)
            );
        });
    }

    MovePlanetToTop(id) {
        const index = this.planetList.findIndex(item => item.id === id);
        if (index !== -1) {
            const element = this.planetList.splice(index, 1)[0];
            this.planetList.unshift(element);
            this.filterPlanets();
        }
    }

    onAddPlanet() {
        if (this.planetList.length > 0) {
            const firstItem = this.planetList[0];
            const newItem = {
                ...firstItem,
                id: Date.now(),
                title: `${firstItem.title} (копия)`
            };
            this.planetList.push(newItem);
            this.filterPlanets();
        }
    }

    onDeletePlanet(id) {
        this.planetList = this.planetList.filter(item => item.id !== Number(id));
        this.filterPlanets();
    }

    clickPlanet(e) {
        const planetID = e.currentTarget.dataset.id || e.target.closest('button').dataset.id;
        const productPage = new ProductPage(this.parent, planetID);
        productPage.render();
    }

    getHTML() {
    return `
        <div style="background-color: black; min-height: 100vh; padding-top: 0px;">
            <div class="container">
                <div class="row g-3 mb-4 align-items-center">
                    <div class="col-md-3">
                        <h2 style="color: white; margin: 0;">Планеты</h2>
                    </div>

                    <div class="col-md-4">
                        <input type="text" id="search-input" class="form-control"
                               style="background: black; border: 1px solid white; color: white;"
                               placeholder="Поиск...">
                    </div>

                    <div class="col-md-3">
                        <select id="tag-filter" class="form-select"
                                style="background: black; border: 1px solid white; color: white;">
                            <option value="all">Все теги</option>
                            <option value="Любовь и отношения">Любовь и отношения</option>
                            <option value="Финансовая стабильность">Финансовая стабильность</option>
                            <option value="Достижение">Достижение</option>
                            <option value="Источник личной энергии">Источник личной энергии</option>
                            <option value="Интуиция">Интуиция</option>
                            <option value="Перемены сознания">Перемены сознания</option>
                            <option value="Стабильность">Стабильность</option>
                            <option value="Надежность">Надежность</option>
                        </select>
                    </div>

                    <div class="col-md-2 text-end">
                        <button id="add-card-btn"
                            class="btn w-100"
                            style="background-color: black; border: 1px solid white; color: white; border-radius: 10px;">
                            Добавить
                        </button>
                    </div>
                </div>

                <div id="main-page"
                     class="row row-cols-1 row-cols-md-3 g-4 justify-content-start">
                </div>
            </div>
        </div>`;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('search-input').addEventListener('input', () => this.filterPlanets());
        document.getElementById('tag-filter').addEventListener('change', () => this.filterPlanets());
        document.getElementById('add-card-btn').addEventListener('click', () => this.onAddPlanet());

        this.renderProducts();
    }
}
