import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
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
        ]
    }

render() {
    this.parent.innerHTML = ''
    const html = this.getHTML()
    this.parent.insertAdjacentHTML('beforeend', html)

    const data = this.getData()
    data.forEach((item) => {
        const productCard = new ProductCardComponent(this.pageRoot)
        productCard.render(item, this.clickCard.bind(this))
    })
}

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    clickCard(e) {
    const cardId = e.target.dataset.id

    const productPage = new ProductPage(this.parent, cardId)
    productPage.render()
        }

}
