export interface NavItem {
  id: string;
  label: string;
}

export interface TerminalLog {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}