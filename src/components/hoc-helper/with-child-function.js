
import React from 'react'
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

export default withChildFunction