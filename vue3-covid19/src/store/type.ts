export interface ShowAddSwitch {
	dead: boolean;
	nowSevere: boolean;
	all: boolean;
	confirm: boolean;
	suspect: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
	heal: boolean;
	nowConfirm: boolean;
	importedCase: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	showHeal: boolean;
	provinceLocalConfirm: number;
	mtime: string;
	nowConfirm: number;
	wzz: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	showRate: boolean;
	adcode: string;
	continueDayZeroLocalConfirm: number;
	confirm: number;
	heal: number;
	highRiskAreaNum: number;
	dead: number;
}

export interface Total {
	heal: number;
	highRiskAreaNum: number;
	mtime: string;
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	adcode: string;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	nowConfirm: number;
	showHeal: boolean;
}

export interface Total {
	mtime: string;
	dead: number;
	heal: number;
	wzz: number;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	nowConfirm: number;
	showRate: boolean;
	confirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	showHeal: boolean;
	adcode: string;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Children {
	total: Total;
	name: string;
	date: string;
	today: Today;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
}

export interface Children {
	total: Total;
	children: Children[];
	name: string;
	date: string;
	today: Today;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	localConfirmH5: number;
	local_acc_confirm: number;
	suspect: number;
	importedCase: number;
	confirm: number;
	heal: number;
	nowConfirm: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	localConfirm: number;
	noInfectH5: number;
	dead: number;
	nowSevere: number;
	noInfect: number;
}

export interface ChinaAdd {
	confirm: number;
	heal: number;
	dead: number;
	importedCase: number;
	localConfirm: number;
	localConfirmH5: number;
	nowConfirm: number;
	suspect: number;
	nowSevere: number;
	noInfect: number;
	noInfectH5: number;
}

export interface Diseaseh5Shelf {
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
}

export interface StatisGradeCityDetail {
	date: string;
	sdate: string;
	nowConfirm: number;
	confirm: number;
	grade: string;
	dead: number;
	heal: number;
	mtime: string;
	syear: number;
	province: string;
	city: string;
	confirmAdd: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}