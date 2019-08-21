import React, { Component } from "react";
import "./item-list.css";
import {withData} from '../hoc-helper'
import SwapiService from "../services/swapi-service";
// import Spinner from "../spinner";
// теперь наш higher order component withData находится в своем собственном бале
// В компонент ItemList передаем аргумент props - который получает данные из компонента высшего порядка
// (мы вынесли всю логику расчетов в компонент обертку поэтому все запросы идут с верхнего компонента) 

const ItemList = props => {
  console.log(props)
  // Деструктурируем данные из аргумента
  const { data, onItemSelected, children: renderLabel } = props;
  // Нельзя изменять компонент напрямую, мы копируем данные из аргумента и итерируем по объекту
  const items = data.map(item => {
    const { id } = item;
    const label =renderLabel(item);

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });
  return <ul className="item-list list-group">{items}</ul>;
};

const { getAllPeople } = new SwapiService()
// В экспорт передаем что хотим создать ItemList который обернут в компонент который занимается мененджментом данных
// Мы разделили компонент на две части одна часть отвечает исключительно за отрисовку ItemList
// Вторая часть отвечает за логику работы с сетью
// В импортированную функцию передаем компонент и функцию которая вернет промис с данными с сервера
// тем самым мы используем патерн реакт, разделяя компонент отрисовки с компонентам отвечающим с получением и манипуляциями данных с сервера 
export default withData(ItemList, getAllPeople);
