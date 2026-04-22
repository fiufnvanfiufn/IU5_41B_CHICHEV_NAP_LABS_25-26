import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const data = [
            { id: 1, src: "https://cafebrynza.ru/images/articles/5-poleznykh-svojstv-goryachej-edy_66a272bd082bc2.png", title: "Гороскоп еды", text: "Узнайте, какая еда сегодня принесет вам удачу." },
            { id: 2, src: "https://www.tvrus.eu/wp-content/uploads/2025/05/goroskop-22-maya--960x639.jpg", title: "Ежедневный гороскоп", text: "Узнайте ежедневный гороскоп для вас на сегодня." },
            { id: 3, src: "https://i.redd.it/tdz95mj3a0g51.jpg", title: "Небо сегодня", text: "Узнайте соприкосновение небесных тел на небе сегодня." },
        ];
        return data.find(item => item.id === Number(this.id));
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page" style="background-color: #050714; min-height: 100vh; padding: 20px;"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
