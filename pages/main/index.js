import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { EditPage } from "../edit/index.js";
import { ajax } from "../../modules/ajax.js";
import { planetListUrls } from "../../modules/planetListUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    get pageRoot() {
        return document.getElementById('product-list');
    }


    getPlanet() {
        ajax.get(planetListUrls.getPlanetList(), (data) => {
            console.log('Данные с сервера:', data);
            this.data = data;

            if (!data || !Array.isArray(data) || data.length === 0) {
                return;
            }

            if (this.pageRoot) {
                this.pageRoot.innerHTML = '';
            }

            this.renderData(this.data);
        });
    }

    renderData(items) {
        if (!items) {
            console.log("Рендеринг не запущен")
            return;
        }
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);

            productCard.render(
                item,
                this.clickPlanet.bind(this),
                this.onDeletePlanet.bind(this),
                (id) => this.openEditPage(id)
            );
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('search-btn')?.addEventListener('click', () => this.filterPlanets());
        document.getElementById('add-card-btn')?.addEventListener('click', () => this.onAddPlanet());

        this.getPlanet();
    }

    clickPlanet(e) {
        const target = e.target;

        if (target.classList.contains('delete-btn') || target.innerText.includes('Удалить')) {
            const id = Number(target.dataset.id);
            this.onDeletePlanet(id);
            return;
        }

        const card = target.closest('[data-id]');
        if (card) {
            const cardId = Number(card.dataset.id);
            const productPage = new ProductPage(this.parent, cardId, this.data);
            productPage.render();
        }

        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.openEditPage(id);
            });
        });
    }


    filterPlanets() {
        const searchValue = document.getElementById('search-input').value.trim();
        const tagValue = document.getElementById('tag-filter').value;

        let url = planetListUrls.getPlanetList();

        const params = [];

        if (searchValue) {
            params.push(`search=${encodeURIComponent(searchValue)}`);
        }

        if (tagValue && tagValue !== 'all') {
            params.push(`tag=${encodeURIComponent(tagValue)}`);
        }

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        ajax.get(url, (filteredData) => {
            if (this.pageRoot) {
                this.pageRoot.innerHTML = '';
            }


            this.renderData(filteredData);
        });
    }

    MovePlanetToTop(id) {
        const index = this.data.findIndex(item => Number(item.id) === id);
        if (index !== -1) {
            const element = this.data.splice(index, 1)[0];
            this.data.unshift(element);
            this.filterPlanets();
        }
    }



    onAddPlanet = () => {
        if (!this.data || this.data.length === 0) {
            alert('Нет данных для клонирования');
            return;
        }

        const firstItem = this.data[0];
        const newItemData = {
            src: firstItem.src,
            title: `${firstItem.title} (Новая)`,
            nums: firstItem.nums,
            tags:firstItem.tags,
            text: firstItem.text || firstItem.description || ""
        };

        const url = planetListUrls.getPlanetList();

        ajax.post(url, newItemData, (response) => {
            console.log('Планета создана:', response);

            if (this.pageRoot) {
                this.pageRoot.innerHTML = '';
            }

            this.getPlanet();
        });
    };

    onUpdatePlanet(id, updatedData) {
        const url = `${planetListUrls.getPlanetList()}/${id}`;

        ajax.patch(url, updatedData, (response) => {

            this.getPlanet();
        });
    }



    openEditPage(id) {
        this.parent.innerHTML = '';

        const editPage = new EditPage(this.parent, id, () => {
            this.parent.innerHTML = '';
            this.render();
        });

        editPage.getPlanet();
    }

    onDeletePlanet(id) {
        const url = `${planetListUrls.getPlanetList()}/${id}`;

        ajax.delete(url, (response) => {
            console.log(`Планета с id ${id} успешно удалена на сервере`);

            this.getPlanet();
        });
    }

    getHTML() {
        return `
        <div style="background-color: black; min-height: 100vh; padding-top: 0px;">
            <div class="container">
                <div class="row g-3 mb-4 align-items-center">
                    <div class="col-md-4">
                        <h2 style="color: white; margin: 0;">Наши услуги</h2>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input type="text" id="search-input" class="form-control"
                                   style="background: black; border: 1px solid white; color: white;"
                                   placeholder="Поиск...">
                            <button id="search-btn" class="btn" type="button"
                                    style="background: transparent; border: 1px solid white; color: white;">
                                Найти
                            </button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select id="tag-filter" class="form-select"
                                style="background: black; border: 1px solid white; color: white;">
                            <option value="all">Все теги</option>
                            <option value="Любовь и отношения">Любовь и отношения</option>
                            <option value="Достижение">Достижение</option>
                            <option value="Интуиция">Интуиция</option>
                            <option value="Континентальный климат">Континентальный климат</option>
                            <option value="Сильное давление">Сильное давление</option>
                            <option value="Стабильность">Стабильность</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <button id="add-card-btn" class="btn w-100"
                                style="background: transparent; border: 1px solid white; color: white;">
                            Добавить
                        </button>
                    </div>
                </div>
                <div id="product-list" class="row row-cols-1 row-cols-md-3 g-4"></div>
            </div>
        </div>`;
    }
}
