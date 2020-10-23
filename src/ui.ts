export class UI {
	private btn:any = document.querySelector('.btn_start');	
	private cubes:object[] = Array.from(document.querySelectorAll('.cubes__cube'));
	private textLvl:any = document.querySelector('.level');

	public getBtn():any {
		return this.btn;
	}

	public getCubes():object[] {
		return this.cubes;
	}

	public getTextlvl():object {
		return this.textLvl;
	}
}