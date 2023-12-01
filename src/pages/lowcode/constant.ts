import { LayoutItem } from './interface'

export const ROW = 'row'
export const COLUMN = 'column'
export const COMPONENT = 'component'

export const initLayout: LayoutItem[] = [
  {
    type: ROW,
    id: 'row0',
    children: [
      {
        type: COLUMN,
        id: 'column0',
        children: [
          {
            type: COMPONENT,
            id: 'component0',
            component: {
              type: 'aaa',
            },
          },
          {
            type: COMPONENT,
            id: 'component1',
            component: {
              type: 'bbb',
            },
          },
        ],
      },
      {
        type: COLUMN,
        id: 'column1',
        children: [
          {
            type: COMPONENT,
            id: 'component2',
            component: {
              type: 'aaa',
            },
          },
        ],
      },
    ],
  },
  {
    type: ROW,
    id: 'row1',
    children: [
      {
        type: COLUMN,
        id: 'column2',
        children: [
          {
            type: COMPONENT,
            id: 'component3',
            component: {
              type: 'bbb',
            },
          },
          {
            type: COMPONENT,
            id: 'component4',
            component: {
              type: 'aaa',
            },
          },
          {
            type: COMPONENT,
            id: 'component5',
            component: {
              type: 'bbb',
            },
          },
        ],
      },
    ],
  },
  {
    type: COMPONENT,
    id: 'component6',
    component: {
      type: 'aaa',
    },
  },
]
