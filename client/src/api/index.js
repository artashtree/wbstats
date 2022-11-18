import axios from 'axios';

export const wbApi = {
    async fetchPopulation(year, itemsCount) {
        const url = `/api/getPopulation/${year}/${itemsCount}`;
        const response = await axios.get(url);
        return response;
    },
    async fetchGdp(year, itemsCount) {
        const url = `/api/getGdp/${year}/${itemsCount}`;
        const response = await axios.get(url);
        return response;
    },
};

export const wikiApi = {
    async getShortWikiInfo(itemName) {
        const url = `/api/fetchShortWikiInfo/${itemName}`;
        const response = await axios.get(url);
        return response;
    },
};
