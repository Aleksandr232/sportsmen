export const sportsmenFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const sportsmenFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const sportsmenFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

export const sportsmenCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

export const sportsmenDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}