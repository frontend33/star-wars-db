**Render функция**
>Паттерн React - в компоненте передается функция, которая рендерит часть компонента (или весь компонент)
```` >Card renderBody = {() => <p>hello </p>} /> ````

>Такая функция обычно возвращает строку или React элемент
 В родителе app.js объявлеяем рендер функцию ````renderItem={(item) => item.name}```` и в зависимости от компонента мы можем менять, что отображать пользователю внутри компонента не повторяя наш код множество раз, внутри отрисовки списка элементов item-list объявляем функцию
 ```` const label = this.props.renderItem(item) ````
 и в цикле передаем аргумент нашего item
Вывод: Рендер функция это паттерн React когда вы передаете в функцию компонент которая занимается рендерингом части компонента или всего компонента

#### В родителе объявлеяем рендер функцию
```
<div className="col-md-6">
        <ItemList OnItemSelected={this.OnPersonSelected} 
            getData={this.swapiService.getAllStarships}
            renderItem={(item) => item.name}
              
        />
</div>
```
#### В дочернем компоненте получаем пропсы родителя и передаем их в цикл для отрисовки элемента
```
renderItems(arr) {
    return arr.map((item) => {
        const { id } = item
        const label = this.props.renderItem(item)
        return (
            <li className="list-group-item"
                key={id}
                // При клике на компонент передаем его id родителю для детального просмотра
                onClick={() => this.props.onItemSelected(id)}>
                    {/* Передадим функцию что бы отображать разные условия item list */}
                {/* {name} */}
                {label}

            </li>
        )
    })
}
render() {
    const { itemList } = this.state
    if (!itemList) {
        return <Spinner />
    }

    const items = this.renderItems(itemList)
    return (
        <ul className="item-list item-list-group" >
            {items}
        </ul>
    )
}

}
```

**Свойста-элементы**
> В качестве значения свойства можно передавать React элемент
````<Card title={<h1>Hi</h1>} />````
> Так можно создавать элементы контейнеры или элементы которые умеют выбирать, что рендерить в зависимости от условия (загрузка, ошибка и т п)
За классом, создаем переменную Row передаем в нее параметры
далее можем передавать значения в компонент
```
const Row = ({ left, right }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
}
```

```
 return (
            <div>
                <Row left={itemList} right={personDetails} />
                <Row left={<p>Hello</p>} right="Bar" />
            </div>
        );
```

**Children**
В реакт есть два способа передавать свойства компонентам
1)Способ
```
onItemSelected={this.onPersonSelected}
```
2)Способ передать свойства прямо в тело тега который описывает компонент
Компоненту можно передавать одно из свойств поместив его в тело элемента
<Card> How are you</Card>
Это свойство доступно через props.children
Поддерживает любые типы данных элементы функции объекты и другие