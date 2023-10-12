interface ITableRowValue {
    value?: number
    subValue?: number
}

interface ITableRow {
    title: string
    values: ITableRowValue[]
}

export interface ITable {
    header: string[]
    body: ITableRow[]
}
