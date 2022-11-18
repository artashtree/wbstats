import { wbApi } from "./api";

interface IXMLRecord {
  area: string;
  areaKey: string;
  itemKey: string;
  value: number;
}

const transformRecordsArrayToRecordsObject = (records: Array<IXMLRecord>) => {
  const newRecords = {};

  records.forEach((record) => {
    const key = record.areaKey;
    
    newRecords[key] = newRecords[key]
      ? newRecords[key]
      : { name: record.area };

    if (record.itemKey === "NY.GDP.MKTP.CD") {
      newRecords[key].gdp = record.value;
    }

    if (record.itemKey === "SP.POP.TOTL") {
      newRecords[key].population = record.value;
    }

    newRecords[key].gdpCapita = newRecords[key].gdp / newRecords[key].population;
    
    newRecords[key].expanded = false;
    newRecords[key].extract = "";
    newRecords[key].key = key;
  });

  return newRecords;
};

const transformXmlDataToArray = (str: string): Array<IXMLRecord> => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(str, "text/xml");
  const xmlData = xmlDoc.children[0];
  const records = xmlData.children;

  const newRecords: Array<IXMLRecord> = [];

  for (let i = 0; i < records.length; i++) {
    newRecords.push({
      area: records[i].getElementsByTagName("wb:country")[0].innerHTML,
      areaKey: records[i].getElementsByTagName("wb:countryiso3code")[0].innerHTML,
      itemKey: records[i].getElementsByTagName("wb:indicator")[0].id,
      value: parseInt(records[i].getElementsByTagName("wb:value")[0].innerHTML),
    });
  }

  return newRecords;
};

export const getData = async (year, itemsCount) => {
  const response = await Promise.all([
    wbApi.fetchGdp(year, itemsCount),
    wbApi.fetchPopulation(year, itemsCount),
  ]);

  const obj = transformRecordsArrayToRecordsObject([
    ...transformXmlDataToArray(response[0].data),
    ...transformXmlDataToArray(response[1].data),
  ]);

  const data = {};

  for (let itemKey in obj) {
    const item = obj[itemKey];
    item.gdpCapita = parseInt(item.gdp) / parseInt(item.population);
    item.expanded = false;
    item.extract = "";
    item.key = itemKey;
    data[itemKey] = item;
  }

  return data;
};

export const getWikiExtract = (response) => {
  const { pages } = response.data.query;
  for (let key in pages) {
    return pages[key];
  }
};

export const getSortedRecords = ({
  records,
  groupName,
  direction,
}) => {
  const sortedArray = Object.keys(records).sort((firstKey, secondKey) => {
    const first = records[firstKey][groupName];
    const second = records[secondKey][groupName];
    const a = first ? (first ? first : 0) : null;
    const b = second ? (second ? second : 0) : null;

    return direction === "desc" ? b - a : a - b;
  });

  const newRecords = {};
  sortedArray.forEach((itemKey) => (newRecords[itemKey] = records[itemKey]));

  return newRecords;
};
