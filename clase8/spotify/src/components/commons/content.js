import Item from './commons/item.js'

const Content = (items) => {
    return  /*html*/ `
    <main>
    <div id="podcasts-header">
        <h1>podcast</h1>
        </div>
        <h4>Meet the podcast award nominees</h4>
        <div id="items">
            ${items.map((item)  => Item(item)).join('')}
        </div>
    </main>
    `
}

export default Content