import axios from 'axios';

export const wbApi = {
    async fetchPopulation(year: number, itemsCount: number) {
        const url = `/getPopulation/${year}/${itemsCount}`;
        const response = await axios.get(url);
        return response;
    },
    async fetchGdp(year: number, itemsCount: number) {
        const url = `/getGdp/${year}/${itemsCount}`;
        const response = await axios.get(url);
        return response;
    },
};

export const wikiApi = {
    async getShortWikiInfo(itemName: string) {
        const url = `/fetchShortWikiInfo/${itemName}`;
        const response = await axios.get(url);
        return response;
    },
};
