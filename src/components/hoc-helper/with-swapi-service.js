import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

// const withSwapiService = (Wrapped, mapMethodsToProps) => {
  // Что бы сделать вызов проще в item-lists 
  // В начале получаем методы getData и потом второй аргумент(компонент Wrapped видит пропс) передает в него SwapiService
const withSwapiService = (mapMethodsToProps) => (Wrapped) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
        {
          (swapiService) => {
            // Когда получаем swapiService создаем serviceProps и вызываем нашу функцию
            const serviceProps = mapMethodsToProps(swapiService);
            return (
              <Wrapped {...props} {...serviceProps} />
            );
          }
        }
      </SwapiServiceConsumer>
    );
  }
};

export default withSwapiService;