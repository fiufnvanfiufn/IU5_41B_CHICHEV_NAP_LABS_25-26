import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://cafebrynza.ru/images/articles/5-poleznykh-svojstv-goryachej-edy_66a272bd082bc2.png",
                title: "Ежедневный гороскоп на еду.",
                text: "Узнайте, какая еда сегодня принесет вам удачу."
            },
            {
                id: 2,
                src: "https://www.tvrus.eu/wp-content/uploads/2025/05/goroskop-22-maya--960x639.jpg",
                title: "Ежедневный гороскоп.",
                text: "Узнайте ежедневный гороскоп для вас на сегодня"
            },
            {
                id: 3,
                src: "https://i.redd.it/tdz95mj3a0g51.jpg",
                title: "Небо сегодня",
                text: "Узнайте соприкосновение небесных тел на небе сегодня."
            },
        ];
    }

    onAddCard() {
        if (this.data.length > 0) {
            const firstItem = this.data[0];
            const newItem = {
                ...firstItem,
                id: Date.now(),
                title: `${firstItem.title} (Копия)`
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
            <div class="container mt-3">
                <div class="d-flex justify-content-center mb-3">
                    <button id="add-card-btn" class="btn btn-success">Добавить услугу</button>
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>`;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('add-card-btn').addEventListener('click', () => this.onAddCard());

        this.data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this), this.onDeleteCard.bind(this));
        });
    }
}
