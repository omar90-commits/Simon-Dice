import { selectedColor, selectedColorRandom, winOrLose } from './helper';

export class Circle {
	private blue:string = '';
	private red:string = '';
	private yellow:string = '';
	private green:string = '';
	private lightBlue:string = '';
	private darkColors:string[] = ['#00008B', '#8B0000', '#81811D', '#015A01', '#007180'];
	private stateStart:boolean = false;
	private lvl:number = 1;
	private sequence:number[] = [];
	private stateYourTurn:boolean = true;

	constructor(blue:string, red:string, yellow:string, green:string, lightBlue:string) {
		this.blue = blue;
		this.red = red;
		this.yellow = yellow;
		this.green = green;
		this.lightBlue = lightBlue;
	}

	public getStateStart():boolean {
		return this.stateStart;
	}

	public setStateStart(state:boolean):void {
		this.stateStart = state;
	}	

	/*
		Cambia el color del fragmento del circulo sobre el que se iso click.
	*/
	public changeColorClick(cube:any, index:number, btn:any, textLvl:any):void {

		// Verifica si es el turno del jugador o no, false = Tu turno, true = Esperar.
		if (this.stateYourTurn) return;

		const [darkBlue, darkRed, darkYellow, darkgreenn, darkLightBlue] = this.darkColors;
		const sequence:number[] = this.sequence;

		//Cambia el color del fragmento de circulo que ha sido clickiado.
		selectedColor(this.blue, this.red, this.yellow, this.green, this.lightBlue, index, cube);

		//Regresa al color orignal.
		setTimeout(() => 
		selectedColor(darkBlue, darkRed, darkYellow, darkgreenn, darkLightBlue,index,cube), 300);

		/* compara el indice del elemento sobre el que se iso click con el indice 
		del array de la secuencia y retorna el nivel. */
		const lvl:number = winOrLose(this.lvl, sequence, index);

		if (this.lvl !== lvl) this.nextOrPrev_Level(btn, textLvl, lvl);

		this.lvl = lvl === 0 ? 1 : lvl;	
	}

	public levels(cubes:any[], btn:any, textLvl:any):void {

		const arrColor:string[] = [this.blue, this.red, this.yellow, this.green, this.lightBlue];

		switch (this.lvl) {
			case 1:
				const [time1, sequence1] = selectedColorRandom(3, cubes, arrColor, this.darkColors, btn);

				this.yourTurn(time1, sequence1, btn);
			break;

			case 2:
				const [time2, sequence2] = selectedColorRandom(5, cubes, arrColor, this.darkColors, btn);

				this.yourTurn(time2, sequence2, btn);
			break;

			case 3:
				const [time3, sequence3] = selectedColorRandom(7, cubes, arrColor, this.darkColors, btn);

				this.yourTurn(time3, sequence3, btn);
			break;

			case 4:
				const [time4, sequence4] = selectedColorRandom(9, cubes, arrColor, this.darkColors, btn);

				this.yourTurn(time4, sequence4, btn);
			break;

			case 5:
				const [time5, sequence5] = selectedColorRandom(11, cubes, arrColor, this.darkColors, btn);
				
				this.yourTurn(time5, sequence5, btn);
			break;
			
			default:
				//Resetea el juego.
				this.stateStart = false;
				this.stateYourTurn = true;
				this.lvl = 1;
				this.sequence = [];
				btn.removeAttribute('disabled', '');
				btn.style.cursor = 'pointer';
				textLvl.textContent = 'Level 1';
				btn.textContent = 'Comenzar';
			break;
		}
	}

	//Este metodo se encarga de esperar que termina la secuencia para que sea el turno del jugador.
	private yourTurn(time:number, sequence:number[], btn:any):void {
		setTimeout(() => {
			btn.textContent = 'Tu turno';
			this.sequence = sequence; 
			this.stateYourTurn = false;
		}, time + 500);
	}

	private nextOrPrev_Level(btn:any, textLvl:any, lvl:number):void {
		btn.removeAttribute('disabled', '');
		btn.style.cursor = 'pointer';

		this.stateStart = false;
		this.stateYourTurn = true;

		btn.textContent = 'Comenzar';
		setTimeout(() => textLvl.style.backgroundColor = 'transparent', 1000);
		
		textLvl.style.backgroundColor = 'white';
		textLvl.textContent = lvl > 1 ? `Level ${lvl}` : 'Level 1';

		if (lvl > 5) {
			btn.textContent = 'Reiniciar Juego';
			textLvl.textContent = 'Level 5';
		} else lvl;
	}
}