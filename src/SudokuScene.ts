enum ProcessResult {
	CONTINUE,
	END,
	FAIL,
	SUCCESS
}

class SudokuScene extends eui.Component implements eui.UIComponent {

	private rowDefine: string[] = [
		"0012-1012-2012",
		"0345-1345-2345",
		"0678-1678-2678",
		"3012-4012-5012",
		"3345-4345-5345",
		"3678-4678-5678",
		"6012-7012-8012",
		"6345-7345-8345",
		"6678-7678-8678",
	];

	private columnDefine: string[] = [
		"0036-3036-6036",
		"0147-3147-6147",
		"0258-3258-6258",
		"1036-4036-7036",
		"1147-4147-7147",
		"1258-4258-7258",
		"2036-5036-8036",
		"2147-5147-8147",
		"2258-5258-8258",
	];

	/**啟動按鈕 */
	private startBtn: eui.Button;
	private block: eui.Rect;
	private stateTf: eui.Label;

	private columnGrids: Grid[][];
	private rowGrids: Grid[][];
	private nineGrids: Grid[][];

	private guessGrids: Grid[];
	private tempGrids: Grid[];

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "SudokuSceneSkin";
	}

	private uiComplete(e: eui.UIEvent): void {

		this.block.visible = false;
		
		this.rowGrids = [];//列
		this.columnGrids = [];//欄
		this.nineGrids = [];//九宮格
		this.guessGrids = [];//猜測
		this.tempGrids = [];//暫存

		for (let ti: number = 0; ti < 9; ++ti) {
			let define: string;
			let groups: string[];

			//row
			this.rowGrids[ti] = [];
			define = this.rowDefine[ti];
			groups = define.split("-");
			for (let gi: number = 0; gi < groups.length; ++gi) {
				let data: string[] = groups[gi].split('');
				let group: number = parseInt(data[0]);//0:群組index
				for (let i: number = 1; i < 4; ++i) {
					this.rowGrids[ti].push(this[`grid_${group}_${data[i]}`]);//1~3:索引index
				}
			}

			//column
			this.columnGrids[ti] = [];
			define = this.columnDefine[ti];
			groups = define.split("-");
			for (let gi: number = 0; gi < groups.length; ++gi) {
				let data: string[] = groups[gi].split('');
				let group: number = parseInt(data[0]);//0:群組index
				for (let i: number = 1; i < 4; ++i) {
					this.columnGrids[ti].push(this[`grid_${group}_${data[i]}`]);//1~3:索引index
				}
			}

			//九宮格
			this.nineGrids[ti] = []; 0
			for (let i: number = 0; i < 9; ++i) {
				this.nineGrids[ti].push(this[`grid_${ti}_${i}`]);
			}
		}

		//btn
		for (let i: number = 0; i < 9; ++i) {
			this[`btn_${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				SudokuScene.selectNumber = i;
			}, this);

		}
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
	}

	public static selectNumber: number = -1;

	private onStart(e: egret.TouchEvent): void {

		/*
		this[`grid_${0}_${2}`].setDefaultNumber(6);

		this[`grid_${1}_${1}`].setDefaultNumber(5);
		this[`grid_${1}_${3}`].setDefaultNumber(2);
		this[`grid_${1}_${5}`].setDefaultNumber(0);
		this[`grid_${1}_${7}`].setDefaultNumber(7);

		this[`grid_${2}_${1}`].setDefaultNumber(2);
		this[`grid_${2}_${2}`].setDefaultNumber(0);
		this[`grid_${2}_${3}`].setDefaultNumber(5);
		this[`grid_${2}_${5}`].setDefaultNumber(1);
		this[`grid_${2}_${8}`].setDefaultNumber(8);

		this[`grid_${3}_${0}`].setDefaultNumber(0);
		this[`grid_${3}_${2}`].setDefaultNumber(5);
		this[`grid_${3}_${5}`].setDefaultNumber(4);

		this[`grid_${4}_${2}`].setDefaultNumber(2);
		this[`grid_${4}_${6}`].setDefaultNumber(8);

		this[`grid_${5}_${7}`].setDefaultNumber(4);
		this[`grid_${5}_${8}`].setDefaultNumber(6);

		this[`grid_${6}_${0}`].setDefaultNumber(2);
		this[`grid_${6}_${1}`].setDefaultNumber(6);
		this[`grid_${6}_${4}`].setDefaultNumber(1);
		this[`grid_${6}_${5}`].setDefaultNumber(8);

		this[`grid_${7}_${7}`].setDefaultNumber(2);
		this[`grid_${7}_${8}`].setDefaultNumber(3);
		
		*/


		this.startBtn.visible = false;
		this.block.visible = true;
		this.stateTf.text = "計算中...";

		//重置每一顆
		for (let gi: number = 0; gi < 9; ++gi) {
			for (let i: number = 0; i < 9; ++i) {
				let grid: Grid = this[`grid_${gi}_${i}`];
				grid.name = `${gi}_${i}`;
				if (grid.getDefaultNumber() != -1) {
					continue;
				}
				grid.reset();
			}
		}

		this.process();
	}

	private delay: number = 50;
	private process(): void {
		let result: number = this.calculate();
		egret.error(`process result = ${result}`);

		switch (result) {
			case ProcessResult.CONTINUE:
				setTimeout(this.process.bind(this), this.delay);
				break;
			case ProcessResult.END:
				//沒結果，繼續猜下一格
				this.guess();
				setTimeout(this.process.bind(this), this.delay);
				break;
			case ProcessResult.FAIL:
				if (this.guessGrids.length == 0) {
					this.stateTf.text = "題目錯誤!!";
					return;
				}
				//產生矛盾，切換猜測值
				while (true) {
					let grid: Grid = this.guessGrids[this.guessGrids.length - 1];
					grid.guessIdx++;
					let numbers: number[] = grid.getNumbers();
					if (grid.guessIdx >= numbers.length) {
						let old: Grid = this.guessGrids.pop();
						old.reset();
					}
					else {
						grid.guess();
						break;
					}
				}

				setTimeout(this.process.bind(this), this.delay);
				break;

			case ProcessResult.SUCCESS:
				this.stateTf.text = "計算完成!!";
				break;
		}
	}


	/**
	 * 依照當前盤面計算結果
	 */
	private calculate(): number {

		let result: number = ProcessResult.CONTINUE;
		let getAns: boolean = false;
		let isError: boolean = false;
		let findTarget: boolean = false;

		//輪巡每一顆
		for (let gi: number = 0; gi < 9; ++gi) {
			for (let i: number = 0; i < 9; ++i) {

				let grid: Grid = this[`grid_${gi}_${i}`];

				if (grid.getAnyNumber() != -1) {
					continue;
				}

				findTarget = true;

				grid.setIsHint(true);

				egret.warn(`grid = ${gi},${i}`);

				let temp: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
				//row
				let row: number = Math.floor(gi / 3) * 3 + Math.floor(i / 3);
				this.removeNumbers(temp, this.getNumbersAtRow(row));
				//col
				let col: number = (gi % 3) * 3 + (i % 3);
				this.removeNumbers(temp, this.getNumbersAtColumn(col));

				//nine
				this.removeNumbers(temp, this.getNumbersAtNineGrid(gi));

				grid.setNumbers(temp);

				egret.warn(`grid[${gi},${i}] numbers = ${grid.getNumbers()}`);

				//已經存在矛盾直接跳出
				if (grid.isError() == true) {
					isError = true;
					grid.reset();
					this.tempGrids.forEach((g) => { g.reset() }, this);
					this.tempGrids.length = 0;
					break;
				}
				else {
					if (grid.getNumbers().length == 1) {
						grid.setFinalAnswer(grid.getNumbers()[0]);
						getAns = true;
						//正在猜測中，要暫存
						if (this.guessGrids.length > 0 && this.tempGrids.indexOf(grid) == -1) {
							this.tempGrids.push(grid);
						}
					}
				}
			}

			if (isError) {
				break;
			}
		}

		if (isError) {
			result = ProcessResult.FAIL;
		}
		else if (!getAns) {
			if (findTarget) {
				result = ProcessResult.END;
			}
			else {
				result = ProcessResult.SUCCESS;
			}
		}
		else {
			result = ProcessResult.CONTINUE;
		}

		return result;
	}

	public removeNumbers(a: number[], b: number[]): void {

		let len: number = a.length;
		for (let i: number = len - 1; i > -1; --i) {
			if (b.indexOf(a[i]) != -1) {
				a.splice(i, 1);
			}
		}
	}

	private guess(): void {
		console.error("let's guess!!");

		//輪巡每一顆
		for (let gi: number = 0; gi < 9; ++gi) {
			for (let i: number = 0; i < 9; ++i) {
				let grid: Grid = this[`grid_${gi}_${i}`];
				if (grid.getAnyNumber() != -1) {
					continue;
				}
				//找到一個目標
				grid.guess();
				this.guessGrids.push(grid);
				return;
			}
		}
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private getNumbersAtRow(row: number): number[] {
		return this.getNumbersByGrids(this.rowGrids[row]);
	}

	private getNumbersAtColumn(col: number): number[] {
		return this.getNumbersByGrids(this.columnGrids[col]);
	}

	private getNumbersAtNineGrid(index: number): number[] {
		return this.getNumbersByGrids(this.nineGrids[index]);
	}

	private getNumbersByGrids(grids: Grid[]): number[] {
		let numbers: number[] = [];
		grids.forEach((g) => {
			let n: number = g.getAnyNumber();
			if (n != -1) {
				numbers.push(n);
			}
		}, this);
		return numbers;
	}
}