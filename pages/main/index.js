import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
        this.filteredData = [...this.data];
    }

    getData() {
        return [
            { id: 1, src: "https://cafebrynza.ru/images/articles/5-poleznykh-svojstv-goryachej-edy_66a272bd082bc2.png", title: "Гороскоп еды", tags: ['Удача', 'Завтрак'], nums: [5, 6, 2, 7, 4], text: "Узнайте, какая еда сегодня принесет вам удачу." },
            { id: 2, src: "https://www.tvrus.eu/wp-content/uploads/2025/05/goroskop-22-maya--960x639.jpg", title: "Ежедневный гороскоп", tags: ['Звезды', 'Судьба'], nums: [10, 2, 3, 8, 1], text: "Узнайте ежедневный гороскоп для вас на сегодня." },
            { id: 3, src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Africa_and_Europe_from_a_Million_Miles_Away.png", title: "Небо сегодня", tags: ['Планеты', 'Транзит'], nums: [4, 9, 2, 5, 6], text: "Узнайте соприкосновение небесных тел на небе сегодня." },
        ];
    }

    filterData() {
        const searchValue = document.getElementById('search-input').value.toLowerCase();
        const tagValue = document.getElementById('tag-filter').value;

        this.filteredData = this.data.filter(item => {
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
                this.clickCard.bind(this),
                this.onDeleteCard.bind(this),
                this.onMoveToTop.bind(this)
            );
        });
    }

    onMoveToTop(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            const element = this.data.splice(index, 1)[0];
            this.data.unshift(element);
            this.filterData();
        }
    }

    onAddCard() {
        if (this.data.length > 0) {
            const firstItem = this.data[0];
            const newItem = {
                ...firstItem,
                id: Date.now(),
                title: `${firstItem.title} (копия)`
            };
            this.data.push(newItem);
            this.filterData();
        }
    }

    onDeleteCard(id) {
        this.data = this.data.filter(item => item.id !== Number(id));
        this.filterData();
    }

    clickCard(e) {
        const cardId = e.currentTarget.dataset.id || e.target.closest('button').dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    getHTML() {
        return `
            <div style="background-color: #050714; min-height: 100vh; padding-top: 20px;">
                <div class="container">
                    <div class="row g-3 mb-4 align-items-center">
                        <div class="col-md-3">
                            <h2 style="color: #ffcc33; margin: 0;">Наши услуги</h2>
                        </div>
                        <div class="col-md-4">
                            <input type="text" id="search-input" class="form-control"
                                   style="background: #1a1b3a; border: 1px solid #4b4d8a; color: white !important;"
                                   placeholder="Поиск по названию...">
                        </div>
                        <div class="col-md-3">
                            <select id="tag-filter" class="form-select"
                                    style="background: #1a1b3a; border: 1px solid #4b4d8a; color: white !important;">
                                <option value="all">Все теги</option>
                                <option value="Удача">Удача</option>
                                <option value="Звезды">Звезды</option>
                                <option value="Планеты">Планеты</option>
                                <option value="Завтрак">Завтрак</option>
                                <option value="Судьба">Судьба</option>
                                <option value="Транзит">Транзит</option>
                            </select>
                        </div>
                        <div class="col-md-2 text-end">
                            <button id="add-card-btn" class="btn w-100" style="background-color: #ffcc33; color: #050714; font-weight: bold; border-radius: 10px;">Добавить</button>
                        </div>
                    </div>
                    <div id="main-page" class="row row-cols-1 row-cols-md-3 g-4 justify-content-start"></div>
                </div>
            </div>`;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('search-input').addEventListener('input', () => this.filterData());
        document.getElementById('tag-filter').addEventListener('change', () => this.filterData());
        document.getElementById('add-card-btn').addEventListener('click', () => this.onAddCard());

        this.renderProducts();
    }
}
