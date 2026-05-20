class PlanetListUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getPlanetList() {
        return `${this.baseUrl}/planetList`;
    }

    getPlanetListById(id) {
        return `${this.baseUrl}/planetList/${id}`;
    }

    createPlanetList() {
        return `${this.baseUrl}/planetList`;
    }

    removePlanetListById() {
        return `${this.baseUrl}/planetList/${id}`;
    }

    updatePlanetListById() {
        return `${this.baseUrl}/planetList/${id}`;
    }
}

export const planetListUrls = new PlanetListUrls();
