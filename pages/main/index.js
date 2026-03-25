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
            { id: 3, src: "https://novostipmr.com/sites/default/files/field/image/201807/1524154364_ui-59bf3e630e0dc9.17432988.jpeg", title: "Небо сегодня", tags: ['Планеты', 'Транзит'], nums: [4, 9, 2, 5, 6], text: "Узнайте соприкосновение небесных тел на небе сегодня." },
        ];
    }



    renderProducts() {
        const productList = document.getElementById('product-list');
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

    onAddCard() {
        if (this.data.length > 0) {
            const firstItem = this.data[0];
            const newItem = {
                ...firstItem,
                id: Date.now(),
                title: `${firstItem.title}`
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
                        <div class="col-md-4">
                            <h2 style="color: #ffcc33; margin: 0;">Наши услуги</h2>
                        </div>
                        <div class="col-md-4">
                            <input type="text" id="search-input" class="form-control"
                                   style="background: #1a1b3a; border: 1px solid #4b4d8a; color: white ;">
                        </div>
                        <div class="col-md-2">
                            <select id="tag-filter" class="form-select"
                                    style="background: #1a1b3a; border: 1px solid #4b4d8a; color: white;">
                                <option value="all">Все теги</option>
                                <option value="Удача">Удача</option>
                                <option value="Звезды">Звезды</option>
                                <option value="Планеты">Планеты</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button id="add-card-btn" class="btn w-100" style="background-color: #ffcc33; color: #050714; font-weight: bold;">Добавить</button>
                        </div>
                    </div>
                    <div id="product-list" class="row row-cols-1 row-cols-md-3 g-4"></div>
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
