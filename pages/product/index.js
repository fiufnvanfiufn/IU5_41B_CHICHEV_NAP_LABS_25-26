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
            { id: 1, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Venus_from_Mariner_10.jpg/960px-Venus_from_Mariner_10.jpg", title: "Венера", tags: ['Любовь и отношения', 'Финансовая стабильность'], nums: [5, 6, 2, 7, 4], text: "Она определяет, как человек выражает чувства, его эстетические вкусы, отношение к материальным ценностям и выбор партнера." },
            { id: 2, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mars_Valles_Marineris_EDIT.jpg/960px-Mars_Valles_Marineris_EDIT.jpg", title: "Марс", tags: ['Достижение', 'Источник личной энергии'], nums: [5, 6, 2, 7, 4], text: "Символизирует энергию, волю, активные действия, самоутверждение и сексуальность. " },
            { id: 3, src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Uranus_Voyager2_color_calibrated.png", title: "Уран", tags: ['Интуиция', 'Перемены сознания'], nums: [5, 6, 2, 7, 4], text: "Символизирующая свободу, революционные перемены, озарения, технологии и независимость." },
            { id: 4, src: "https://static.wikia.nocookie.net/rustarwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20120529135204", title: "Альдераан", tags: ['Континентальный климат', 'Гуманоиды'], nums: [5, 6, 2, 7, 4], text: "Приятный теплый климат." },
            { id: 5, src: "https://static.wikia.nocookie.net/project-hail-mary-andy-weir/images/b/bf/Erid_%28Movie%29.png/revision/latest?cb=20260327015426", title: "Эрида", tags: ['Сильное давление', 'Высокая температура'], nums: [10, 2, 3, 8, 1], text: "Полна интересной внеземной жизни" },
            { id: 6, src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Africa_and_Europe_from_a_Million_Miles_Away.png", title: "Земля", tags: ['Стабильность', 'Надежность'], nums: [4, 9, 2, 5, 6], text: "Фундамент, отвечающий за материальную сферу и устойчивость. " },
        ];
        return data.find(item => item.id === Number(this.id));
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
    return `
    <div id="product-page"
         style="background-color: black; min-height: 100vh; padding: 0px; margin: 0px; color: white;">
    </div>`;
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
