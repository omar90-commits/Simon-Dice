const generateRandom = (n:number):number[] => {
	const arrRandom:number[] = [];

	for (let i = 0; i < n; i++) {
		const numAleatorio:number = Math.floor(Math.random() * 5);
		arrRandom.push(numAleatorio);
	}

	return arrRandom;
}

export const selectedColor = (...rest:[string, string, string, string, string, number, any]):void => {
	const [b, r, y, g, lb, index, cube] = rest;

	if (index + 1 === 1) cube.style.backgroundColor = b;
	else if (index + 1 === 2) cube.style.backgroundColor = r;
	else if (index + 1 === 3) cube.style.backgroundColor = y;
	else if (index + 1 === 4) cube.style.backgroundColor = g;
	else if (index + 1 === 5) cube.style.backgroundColor = lb;
}

export const winOrLose = (lvl:number, ...rest:[number[], number]):number => {

	const [sequence, index] = rest;

	if (sequence[0] === index) {
		sequence.shift();

		if (sequence.length === 0) {
			lvl === 5 ? alert('GANASTE EL JUEGO!!') : alert('GANASTE !! siguiente nivel');
			lvl++;
		}

	} else {
		lvl === 1 ? alert('PERDISTE :(') : alert('PERDISTE, bajas un nivel');
		lvl > 0 && lvl--;
	}
	
	return lvl;
} 

export const selectedColorRandom = (...rest:[number,any[],string[],string[],any]):[number, number[]] => {
	const [n, cubes, arrColor, darkColors, btn] = rest;
	const ArrNumberRandom:number[] = generateRandom(n);
	const sequence:number[] = [];
	let time:number = 0;

	for (let i = 0; i < n; i++) {
		const x:number = ArrNumberRandom[i];

		setTimeout(() => cubes[x].style.backgroundColor = arrColor[x], (i + .5) * 1000);
		setTimeout(() => cubes[x].style.backgroundColor = darkColors[x], (i + 1) * 1000);
		
		setTimeout(() => btn.style.backgroundColor = arrColor[x], (i + .5) * 1000);
		setTimeout(() => btn.style.backgroundColor = 'transparent', (i + 1) * 1000);

		time = (i + .5) * 1000;
		sequence.push(x);
	}

	return [time, sequence];
}