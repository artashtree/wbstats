import {
    FETCH_WB_DATA,
    FETCH_WB_DATA_SUCCESS,
    FETCH_WB_DATA_FAILURE,
    TOGGLE_EXPAND_RECORD,
    COLLAPSE_RECORDS,
    SORT_BY_GROUP,
    SET_CONTEXT_YEAR,
} from '../actions/types';

const initialState = {
    contextYear: '2020',
    isFetching: false,
    isFailed: false,
    itemsCount: 300,
    sorting: {
        direction: '',
        groupName: '',
    },
    data: {},
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
            return {
                ...state,
                data: action.payload,
                isFetching: false,
                isFailed: false,
                sorting: {
                    direction: '',
                    groupName: '',
                },
            };
        }

        case FETCH_WB_DATA_FAILURE: {
            return {
                ...state,
                isFetching: false,
                isFailed: true,
                sorting: {
                    direction: '',
                    groupName: '',
                },
            };
        }

        case TOGGLE_EXPAND_RECORD: {
            const { data } = state;
            const { targetKey, response } = action.payload;
            const newData = {};

            Object.keys(data).map((itemKey) => {
                const item = data[itemKey];
                item.expanded =
                    item.key === targetKey && !item.expanded ? true : false;
                item.extract = item.key === targetKey ? response.extract : '';
                newData[itemKey] = item;
            });

            return {
                ...state,
                data: newData,
            };
        }

        case COLLAPSE_RECORDS: {
            const { data } = state;
            const newData = {};

            Object.keys(data).map((itemKey) => {
                const item = data[itemKey];
                item.expanded = false;
                newData[itemKey] = item;
            });

            return {
                ...state,
                data: newData,
            };
        }

        case SORT_BY_GROUP: {
            const { data, contextYear, sorting } = state;
            const { direction, groupName: prevGroupName } = sorting;
            const { groupName } = action.payload;

            const sortedArray = Object.keys(data).sort(
                (firstKey, secondKey) => {
                    const first = data[firstKey][groupName];
                    const second = data[secondKey][groupName];
                    const a = first
                        ? first[contextYear]
                            ? first[contextYear]
                            : 0
                        : null;
                    const b = second
                        ? second[contextYear]
                            ? second[contextYear]
                            : 0
                        : null;

                    if (groupName === prevGroupName && prevGroupName !== '') {
                        return direction === 'asc' ? b - a : a - b;
                    } else {
                        return b - a;
                    }
                }
            );
            const newData = {};
            sortedArray.forEach(
                (itemKey) => (newData[itemKey] = data[itemKey])
            );

            let newDirection;
            if (groupName === prevGroupName && prevGroupName !== '') {
                newDirection = direction === 'asc' ? 'desc' : 'asc';
            } else {
                newDirection = 'desc';
            }

            return {
                ...state,
                data: newData,
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

        default:
            return state;
    }
}
