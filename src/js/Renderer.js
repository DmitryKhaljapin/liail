export class Renderer {
    static #createHTMLElement(tag, children) {
        const HTMLElement = document.createElement(tag);

        if (children.length) {
            children.forEach(child => HTMLElement.append(child));
        }

        return HTMLElement
    }

    static #render(HTMLElement, rootId) {
        const rootElement = document.getElementById(rootId);

        rootElement.append(HTMLElement);
    }

    static renderTree(data) {
        function createHTMLOList(elements) {
            return Renderer.#createHTMLElement('ol', elements.map(element => {
                if (element.node)  {
                    return Renderer.#createHTMLElement('li', [`${element.name}`, createHTMLOList(element.services)]);
                }
                return Renderer.#createHTMLElement('li', [`${element.name} ${element.node? '': `(${element.price})`}`]);
            }));
        }

        const list = createHTMLOList(data.services);

        Renderer.#render(list, 'app');
    }
}