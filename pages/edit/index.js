import { ajax } from "../../modules/ajax.js";
import { planetListUrls } from "../../modules/planetListUrls.js";

export class EditPage {
    constructor(parent, id, onBack) {
        this.parent = parent;
        this.id = id;
    }


    getPlanet() {
        const url = `${planetListUrls.getPlanetList()}/${this.id}`;
        ajax.get(url, (data) => {
            this.render(data);
        });
    }

    getHTML(data) {
        if (!data) return '<p>Ошибка загрузки данных</p>';

        const tagsValue = data.tags || '';

        return `
            <div class="container mt-5">
                <h1>Редактирование: ${data.title || 'Без названия'}</h1>
                <form id="edit-form" class="mt-4">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" class="form-control" id="edit-title" value="${data.title || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ссылка на изображение</label>
                        <input type="text" class="form-control" id="edit-src" value="${data.src || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea class="form-control" id="edit-text" rows="3">${data.text || ""}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Теги</label>
                        <input type="text" class="form-control" id="edit-tags" value="${tagsValue}">
                    </div>
                    <button type="submit" class="btn btn-success">Сохранить изменения</button>
                </form>
            </div>
        `;
    }

    onSave = () => {
        const title = document.getElementById('edit-title').value;
        const src = document.getElementById('edit-src').value;
        const text = document.getElementById('edit-text').value;
        const tags = document.getElementById('edit-tags').value;

        const updatedData = {
            title,
            src,
            text,
            tags,
            nums: this.currentNums
        };

        const url = `${planetListUrls.getPlanetList()}/${this.id}`;

        ajax.patch(url, updatedData, () => {});
    }

    render(data) {
        this.parent.innerHTML = this.getHTML(data);
        this.addListeners();
    }

    addListeners() {
        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.onSave();
        });

    }

}
