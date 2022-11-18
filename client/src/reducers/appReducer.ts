import {} from 'react-redux'
import * as types from '../actions/types';
import { getSortedRecords } from '../helper';

const initialState = {
    searchTerm: '',
    contextYear: '',
    isFetching: false,
    isFailed: false,
    itemsCount: 300,
    sorting: {
        direction: '',
        groupName: '',
    },
    records: {},
    filteredRecords: {},
};

export type State = typeof initialState;

export default function (state: State = initialState, action) {
    switch (action.type) {
        case types.FETCH_WB_DATA: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case types.FETCH_WB_DATA_SUCCESS: {
            const { searchTerm } = state;
            const records = action.payload;
            const filteredRecords = {};

            if (searchTerm !== '') {
                for (let key in records) {
                    const recordName = records[key].name.toLowerCase();

                    if (recordName.includes(searchTerm.toLowerCase())) {
                        filteredRecords[key] = records[key];
                    }
                }
            }

            return {
                ...state,
                records,
                filteredRecords,
                isFetching: false,
                isFailed: false,
            };
        }

        case types.FETCH_WB_DATA_FAILURE: {
            return {
                ...state,
                isFetching: false,
                isFailed: true,
            };
        }

        case types.EXPAND_RECORD: {
            const { records } = state;
            const { targetKey, response } = action.payload;
            const newRecords = {};

            Object.keys(records).map(function(itemKey) {
                const item = records[itemKey];
                item.expanded = item.key === targetKey;
                item.extract = item.key === targetKey ? response.extract : '';
                newRecords[itemKey] = item;
            });

            return {
                ...state,
                records: newRecords,
            };
        }

        case types.COLLAPSE_RECORDS: {
            const { records } = state;
            const newRecords = {};

            Object.keys(records).map(function(itemKey) {
                const item = records[itemKey];
                item.expanded = false;
                newRecords[itemKey] = item;
            });

            return {
                ...state,
                records: newRecords,
            };
        }

        case types.SORT_BY_GROUP: {
            const { records, filteredRecords, contextYear, sorting } = state;
            // const { groupName: prevGroupName } = sorting;
            const { groupName, direction } = action.payload;

            const newRecords = getSortedRecords({
                records,
                groupName,
                direction,
            });

            const newFilteredRecords = getSortedRecords({
                records: filteredRecords,
                groupName,
                direction,
            });

            return {
                ...state,
                records: newRecords,
                filteredRecords: newFilteredRecords,
                sorting: {
                    direction,
                    groupName,
                },
            };
        }

        case types.SET_CONTEXT_YEAR: {
            const { contextYear } = action.payload;

            return {
                ...state,
                contextYear,
            };
        }

        case types.SET_SEARCH_TERM: {
            const { searchTerm } = action.payload;
            const { records } = state;
            const filteredRecords = {};

            for (let key in records) {
                const recordName = records[key].name.toLowerCase();

                if (recordName.includes(searchTerm.toLowerCase())) {
                    filteredRecords[key] = records[key];
                }
            }

            return {
                ...state,
                searchTerm,
                filteredRecords,
            };
        }

        default:
            return state;
    }
}
