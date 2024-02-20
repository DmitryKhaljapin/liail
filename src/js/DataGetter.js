import { defaultData } from '../assets/defaultData.js';

export class DataGetter {
    static async #getDataFromServer(apiUrl) {
        if (!apiUrl) return JSON.parse(defaultData);

        const response = await fetch(apiUrl);
        if (response.ok) {
            return await response.json();
        } else {
            return false;
        }
    }

    static #normalizeData(data) {
        function normalize(parentService) {
            data.services.forEach((service) => {
                if (service.head === parentService.id) {
                    if (!parentService?.services) parentService.services = [];
                    parentService.services.push(service);
                    normalize(service);
                }
                else {
                    if (parentService.services) parentService.services.sort((service1, service2) => service1.sorthead - service2.sorthead)
                    return;
                }
            });
        }
        const normalizedData = {
            id: null,
            services: [],
        };

        normalize(normalizedData)

        return normalizedData;
    }

    static async getData(apiUrl) {
        const data = await DataGetter.#getDataFromServer(apiUrl);
        const normalizedData = DataGetter.#normalizeData(data)
        return normalizedData;
    }
}