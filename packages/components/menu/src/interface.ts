export interface MenuItemMetaInterface {
	title?: string;
	icon?: string;
	keepAlive?: boolean;
	isAffix?: boolean;
	isHide?: boolean;
	isIframe?: string;
	isLink?: string;
}

export interface MenuItemInterface {
	id?: string;
	path: string;
	name: string;
	meta?: MenuItemMetaInterface;
	children?: MenuItemInterface[];
}
