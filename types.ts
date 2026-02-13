
export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ToolState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
