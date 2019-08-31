
// compose (a,b,c)(value) тоже самое что  a(b(c)(value)))

/*
В качестве первоначального вызова в эту функцию мы передаем сам компонент comp, который будем оборачивать
Функция принимает prevResult - компонент который будем оборачивать, т.к. funcs это массив фунций
f - принимаем как одну в качестве аргумента. Мы вызываем функцию f() передаем ей компонент 
// функция f создаст новый компонент который обернет текущий компонент и передаст 
значени след функции справа налево
*/ 
const compose = (...funcs) => (comp) => {
    return funcs.reduceRight((prevResult, f) => f(prevResult), comp)
}
export default compose


/*
const arr = ['a','b','c']
// Value наше значение, а prevResult это наше предыдущее значение
const res = arr.reduceRight((prevResult, value) => {
    console.log(`prevResult', ${prevResult}`,`value ${value}`, `will return ${prevResult + value}` )
    return prevResult + value
})
console.log(res) //cba
*/ 
