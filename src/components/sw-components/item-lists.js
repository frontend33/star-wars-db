import React from "react";
import ItemList from "../item-list";
import {
  withData,
  withSwapiService,
  compose,
  withChildFunction
} from "../hoc-helper";
const renderName = ({ name }) => <span>{name}</span>;
const renderModalAndName = ({ model, name }) => (
  <span>
    {name} ({model}
  </span>
);
// const ListWithChildren = withChildFunction(
//     ItemList,
//     ({name}) => <span>{name}</span>
// )

const mapPersonMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPeople
  };
};

const mapPlanetMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipMethodsToProps = swapiService => {
  return {
    getData: swapiService.getAllStarships
  };
};

// 1 метод const PlanetList = withSwapiService(withData(
//     withChildFunction(ItemList, renderName)),
//     mapPlanetMethodsToProps
// )
//  2 метод const PersonList = withSwapiService(mapPersonMethodsToProps)(
//     withData(
//       withChildFunction(renderName)(
//           ItemList)));

// Композиция функций
// Каждый компонент высшего порядка каждая функция  принимает один аргумент, тот компонент который нужно обернуть
// А затем обернутый компонент передается в функции, выше по цепочке withChildFunction => withData =>  withSwapiService
// Получил аргумент передал его в функцию, вызвал функцию,результат функции передал выше и т д

const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  withData,
  withChildFunction(renderModalAndName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };

// const add = (a) => (b) => a + b
// add(a)(b)
