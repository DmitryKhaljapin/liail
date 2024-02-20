import { DataGetter } from './DataGetter';
import { Renderer } from './Renderer'
import '../css/styles.scss';

(async function() {
    const data = await DataGetter.getData('http://liail.loc');
    Renderer.renderTree(data);
})()