export interface LayoutItem {
  type: string
  id: string
  children?: LayoutItem[]
  component?: {
    type: string
  }
}

export interface CompoentProps {
  data: LayoutItem
  rowIndex: number
  columnIndex?: number
  compIndex?: number
  area: Area // 当前所在区域是row还是column
}

export interface ColumnProps {
  data: LayoutItem
  columnIndex: number
  rowIndex: number
  area: Area // 当前所在区域是row还是column
}

export interface RowProps {
  data: LayoutItem
  rowIndex: number
  area: Area // 当前所在区域是row还是column
}

export interface BaritemProps {
  type: string
}
export enum Area {
  ROW = 'row', //当前在Row中
  COLUMN = 'column', //当前在Column中
  ROOT = 'root', // 当前在最顶层
  OUTSIDE = 'outside', //当前在外部组件库中
}
export interface DropZoneProps {
  className: string
  path: string
  area: Area // 当前所在区域是row还是column
  currentChildrenNum: number // 当前所在区域child数量
}

export type DropItem = Omit<DropZoneProps, 'className'>

export interface DragProps {
  type: string
  path: string
  data: LayoutItem
  area: Area
}

export type ContextType = {
  swapPosition: (item: DragProps, dropItem: DropItem) => void
}
