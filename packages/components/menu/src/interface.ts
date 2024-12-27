export interface MenuItemMetaInterface {
	title?: string;
	icon?: string;
	keepAlive?: boolean;
	isAffix?: boolean;
	isHide?: boolean;
	isIframe?: string;
	isLink?: string;
	level?: number;
}

export interface MenuItemInterface {
	id?: string;
	path: string;
	name: string;
	meta?: MenuItemMetaInterface;
	children?: MenuItemInterface[];
}
