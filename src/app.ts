import './asseet/style/bootstrap.min.css';
import './asseet/style/sass/main.scss';

import { UI } from './ui';
import { Circle } from './circle';

const ui = new UI();
const circle = new Circle('#0000FE', '#FF0000', '#FFFF00', '#00BD00', '#00D9F5');

ui.getCubes().forEach((cube:any, index):void => {
	cube.addEventListener('click', ():void => {
		circle.changeColorClick(cube, index, ui.getBtn(), ui.getTextlvl());
	});
});

ui.getBtn().addEventListener('click', ():void => {
	//Verifica si se a hecho click en el boton "Comenzar".
	if (circle.getStateStart()) return;

	circle.setStateStart(true);
	ui.getBtn().setAttribute('disabled', '');
	ui.getBtn().style.cursor = 'no-drop';

	circle.levels(ui.getCubes(), ui.getBtn(), ui.getTextlvl());
});