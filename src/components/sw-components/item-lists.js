import React from 'react'
import ItemList from '../item-list'
import {withData, withSwapiService} from '../hoc-helper'

// withChildFunction возвращает функцию fn которая принимает то что передали в качестве child
//  а вторая функция принимает один аргумент который мы будем оборачивать
const withChildFunction = (fn) => (Wrapped ) => {
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
const PersonList = withSwapiService(mapPersonMethodsToProps)(
    withData(
      withChildFunction(renderName)(
          ItemList)));

const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
    withData(
    withChildFunction(renderName)(ItemList))
)

const StarshipList = withSwapiService(mapStarshipMethodsToProps)(withData(
    withChildFunction(renderModalAndName)(ItemList))
)


// const PlanetList = withSwapiService(withData(
//     withChildFunction(ItemList, renderName)),
//     mapPlanetMethodsToProps
// )

// const StarshipList = withSwapiService(withData(
//     withChildFunction(ItemList, renderModalAndName)),
//     mapStarshipMethodsToProps
// )

export {
    PersonList,
    PlanetList,
    StarshipList
}

// const add = (a) => (b) => a + b
// add(a)(b)