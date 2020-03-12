class Grid extends eui.Component implements eui.UIComponent {

	private ans: eui.TextInput;
	private hint: eui.Group;

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
		this.ans.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearText, this);

		this.hint.visible = false;
	}

	private clearText(e: egret.TouchEvent): void {
		this.ans.text = "";
	}

	public setValue(v: number): void {
		this.ans.text = v.toString();
	}

	public getValue(): number {
		if (this.ans.text == "") {
			return -1;
		}
		else {
			return parseInt(this.ans.text);
		}
	}
}