class SudokuScene extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
		this.skinName = "SudokuSceneSkin";
	}

	private uiComplete(e: eui.UIEvent): void {
		egret.log("A");
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}