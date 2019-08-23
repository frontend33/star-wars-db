import React from 'react'

/* Создание объекта Context. Когда React рендерит компонент, который подписан на этот объект, React
получит текущее значение контекста из ближайшего подходящего Provider выше в дереве компонентов. */
const { 
    Provider: SwapiServiceProvider, 
    Consumer: SwapiServiceConsumer 
} = React.createContext()
export {
    SwapiServiceProvider,
    SwapiServiceConsumer
}