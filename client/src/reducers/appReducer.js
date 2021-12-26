import {
    FETCH_WB_DATA,
    FETCH_WB_DATA_SUCCESS,
    FETCH_WB_DATA_FAILURE,
    EXPAND_RECORD,
    COLLAPSE_RECORDS,
    SORT_BY_GROUP,
    SET_CONTEXT_YEAR,
    SET_SEARCH_TERM,
} from '../actions/types';
import { getSortedRecords } from '../helpers';

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

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_WB_DATA: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case FETCH_WB_DATA_SUCCESS: {
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

        case FETCH_WB_DATA_FAILURE: {
            return {
                ...state,
                isFetching: false,
                isFailed: true,
            };
        }

        case EXPAND_RECORD: {
            const { records } = state;
            const { targetKey, response } = action.payload;
            const newRecords = {};

            Object.keys(records).map((itemKey) => {
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

        case COLLAPSE_RECORDS: {
            const { records } = state;
            const newRecords = {};

            Object.keys(records).map((itemKey) => {
                const item = records[itemKey];
                item.expanded = false;
                newRecords[itemKey] = item;
            });

            return {
                ...state,
                records: newRecords,
            };
        }

        case SORT_BY_GROUP: {
            const { records, filteredRecords, contextYear, sorting } = state;
            const { direction: stateDirection, groupName: prevGroupName } =
                sorting;
            const { groupName, direction: actionDirection } = action.payload;

            const direction = actionDirection
                ? actionDirection
                : stateDirection;

            const newRecords = getSortedRecords({
                records,
                contextYear,
                groupName,
                prevGroupName,
                direction,
            });

            const newFilteredRecords = getSortedRecords({
                records: filteredRecords,
                contextYear,
                groupName,
                prevGroupName,
                direction,
            });

            let newDirection;
            if (groupName === prevGroupName && prevGroupName !== '') {
                newDirection = direction === 'asc' ? 'desc' : 'asc';
            } else {
                newDirection = 'desc';
            }

            return {
                ...state,
                records: newRecords,
                filteredRecords: newFilteredRecords,
                sorting: {
                    direction: newDirection,
                    groupName,
                },
            };
        }

        case SET_CONTEXT_YEAR: {
            const { contextYear } = action.payload;

            return {
                ...state,
                contextYear,
            };
        }

        case SET_SEARCH_TERM: {
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
