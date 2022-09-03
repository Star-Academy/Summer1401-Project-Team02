export interface ItemData {
    _id: string;
    _tableNameEnteredByUser: string;
    _dateTime: string;
}
export interface sourceItemData extends ItemData {
    _checked: boolean;
}
