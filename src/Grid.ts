class Grid extends eui.Component implements eui.UIComponent {

	private default: eui.Label;
	private ans: eui.Label;
	private hint: eui.Group;
	private numbers: number[];
	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private uiComplete(e: eui.UIEvent): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearText, this);
		this.hint.visible = false;
	}

	public reset(): void {
		this.setIsHint(true);
		this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		this.ans.text = "";
		this.guessIdx = 0;
		for (let i: number = 0; i < 9; ++i) {
			this[`hint_${i}`].visible = true;
		}
	}

	private clearText(e: egret.TouchEvent): void {
		if (SudokuScene.selectNumber != -1) {
			if (this.default.text == String(SudokuScene.selectNumber + 1)) {
				this.default.text = "";
			}
			else {
				this.setDefaultNumber(SudokuScene.selectNumber);
			}
		}
	}

	public setDefaultNumber(v: number): void {
		this.ans.text = "";
		this.setIsHint(false);
		this.default.text = String(v + 1);
	}

	public getDefaultNumber(): number {
		if (this.default.text == "") {
			return -1;
		}
		else {
			return parseInt(this.default.text) - 1;
		}
	}

	public getAnsNumber(): number {
		if (this.ans.text == "") {
			return -1;
		}
		else {
			return parseInt(this.ans.text) - 1;
		}
	}

	public getAnyNumber(): number {
		let n: number = this.getDefaultNumber();

		if (n == -1) {
			n = this.getAnsNumber();
		}

		return n;
	}

	public setNumbers(v: number[]): void {
		this.numbers = v;
		for (let i: number = 0; i < 9; ++i) {
			this[`hint_${i}`].visible = (v.indexOf(i) != -1);
		}
	}
	public getNumbers(): number[] {
		return this.numbers;
	}

	public setIsHint(v: boolean): void {
		this.hint.visible = false;
	}

	public setFinalAnswer(v: number): void {
		this.setIsHint(false);
		this.ans.text = String(v + 1);
	}

	public guessIdx: number = 0;
	public guess(): void {
		this.setFinalAnswer(this.numbers[this.guessIdx]);
	}

	public isError(): boolean {
		return this.numbers.length == 0;
	}
}