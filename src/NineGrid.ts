class NineGrid extends eui.Component implements eui.UIComponent {

	/**9格物件 */
	private gridList: Grid[];

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
		this.gridList = [];
		for (let i: number = 0; i < 9; ++i) {
			this.gridList.push(this[`grid_${i}`]);
		}

		egret.error(this.getValueList());
	}

	private getValueList(): number[] {
		let result: number[] = [];
		this.gridList.forEach((v: Grid) => {
			result.push(v.getDefaultNumber());
		}, this);
		return result;
	}
}