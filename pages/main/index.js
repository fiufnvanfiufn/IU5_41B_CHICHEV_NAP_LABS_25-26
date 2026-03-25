import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
    }

    getData() {
        return [
            { id: 1, src: "https://cafebrynza.ru/images/articles/5-poleznykh-svojstv-goryachej-edy_66a272bd082bc2.png", title: "Гороскоп еды", text: "Узнайте, какая еда сегодня принесет вам удачу." },
            { id: 2, src: "https://www.tvrus.eu/wp-content/uploads/2025/05/goroskop-22-maya--960x639.jpg", title: "Ежедневный гороскоп", text: "Узнайте ежедневный гороскоп для вас на сегодня." },
            { id: 3, src: "https://i.redd.it/tdz95mj3a0g51.jpg", title: "Небо сегодня", text: "Узнайте соприкосновение небесных тел на небе сегодня." },
        ];
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
            this.render();
        }
    }

    onDeleteCard(id) {
        this.data = this.data.filter(item => item.id !== Number(id));
        this.render();
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div style="background-color: #050714; min-height: 100vh; padding-top: 20px;">
                <div class="container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 style="color: #ffcc33;">Наши услуги</h2>
                        <button id="add-card-btn" class="btn" style="background-color: #ffcc33; color: #050714; font-weight: bold; border-radius: 10px;">Добавить услугу</button>
                    </div>
                    <div id="main-page" class="row row-cols-1 row-cols-md-3 g-4 justify-content-start"></div>
                </div>
            </div>`;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('add-card-btn').addEventListener('click', () => this.onAddCard());

        this.data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this), this.onDeleteCard.bind(this));
        });
    }
}
