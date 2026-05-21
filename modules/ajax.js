class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async get(url, callback) {
        try {
            const response = await fetch(url);
            const data = await response.json().catch(() => null);
            callback(data, response.status);
        } catch (e) {
            console.error('Ошибка GET запроса:', e);
            callback(null, 500);
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async post(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json().catch(() => null);
            callback(responseData, response.status);
        } catch (e) {
            console.error('Ошибка POST запроса:', e);
            callback(null, 500);
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async patch(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json().catch(() => null);
            callback(responseData, response.status);
        } catch (e) {
            console.error('Ошибка PATCH запроса:', e);
            callback(null, 500);
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async delete(url, callback) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            // При удалении сервер может вернуть пустой ответ
            let data = null;
            try {
                data = await response.json();
            } catch (e) {
                // Если контента нет, просто оставляем null
            }
            callback(data, response.status);
        } catch (e) {
            console.error('Ошибка DELETE запроса:', e);
            callback(null, 500);
        }
    }
}

export const ajax = new Ajax();
