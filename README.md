This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



**Lifecycle methods Методы жизненного цикла**

**MOUNTING**
------------
**componentDidMount()** Компонент подключен (DOM элементов уже на странице)
-1) Когда компонент создается и первый раз отображается на странице
вызывается конструктор реакт вызывает рендер затем componentDidMount(). 
Используется для инициализации (получение данных, работа с DOM и т д), когда метод вызван означает, что DOM элементы гаранитрованно находятся на странице и они проинициализированны. В этом месте уверены что DOM уже создан и другие библиотеки могут начать свою инициализацию испрользуя готовые элементы DOM дерева
### `constructor() => render() => componentDidMount()`

**UPDATES**
-----------
**componentDidUpdate()** Компонент обновился
-2) Второй этап после того как наш компонент отобразился когда он работает и может получать обновления
UPDATES могут происходить благодаря двум событиям пришли новые свойства или компонент вызвал setState
любое из этих событий приводит к тому что вызывается функция 
### ` => render() => componentDidUpdate()`
Реакт дает сделать что то после того как компонент обновится

**UNMOUNTING**
-------------
**componentWillUnmount()** Компонент будет удален (Но DOM еще на странице)
componentWillUnmount() 
-3) Когда компонент становится не нужен и он удаляется со страницы
Когда компонент становится не нужным componentWillUnmount() 

**ERROR**
---------
**componentDidCatch()** когда в компоненте или в его child компонентах произошла ошибка
-4) Этап ошибки, компонент получает ошибку которая не была поймана раньше

