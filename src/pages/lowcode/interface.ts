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
  columnIndex: number
  compIndex: number
}

export interface ColumnProps {
  data: LayoutItem
  columnIndex: number
  rowIndex: number
}

export interface RowProps {
  data: LayoutItem
  rowIndex: number
}

export interface BaritemProps {
  type: string
}

export interface DropZoneProps {
  className: string
  path: string
}

export interface DrapProps {
  type: string
  path: string
  data: LayoutItem
}

export type ContextType = {
  swapPosition: (item: DrapProps, path2: string) => void
}
