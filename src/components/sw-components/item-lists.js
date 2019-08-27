import React from 'react'
import ItemList from '../item-list'
import {withData, withSwapiService} from '../hoc-helper'

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props} >
                {fn}
            </Wrapped>
        )
    }
}
const renderName = ({name}) => <span>{name}</span>
const renderModalAndName = ({model, name}) => <span>{name} ({model}</span>
// const ListWithChildren = withChildFunction(
//     ItemList,
//     ({name}) => <span>{name}</span>
// )

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}

// Композиция функций
const PersonList = withSwapiService(
    withData(
      withChildFunction(ItemList, renderName)),
  mapPersonMethodsToProps);

const PlanetList = withSwapiService(withData(
    withChildFunction(ItemList, renderName)),
    mapPlanetMethodsToProps
)

const StarshipList = withSwapiService(withData(
    withChildFunction(ItemList, renderModalAndName)),
    mapStarshipMethodsToProps
)

export {
    PersonList,
    PlanetList,
    StarshipList
}
