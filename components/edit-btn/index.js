export class EditButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("edit-button")
            .addEventListener("click", listener);
    }

    getHTML() {
        return (
            `
                <button id="edit-button" class="btn btn-secondary" style="background: white; color: black; border: 1px solid white;" type="button">Изменить</button>
            `
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }

    updateText(text) {
        const btn = document.getElementById("edit-button");
        if (btn) btn.innerText = text;
    }
}
