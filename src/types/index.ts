export interface Record {
  id: string;
  fullName: string;
  caseType: string;
  criminalAct: string;
  caseDate: string;
  entryDate: string;
  history: string[];
  photoUrl: string;
  status: 'Wanted' | 'Detained' | 'Released' | 'Under Investigation';
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'officer' | 'analyst';
  agency: string;
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: 'view' | 'create' | 'update' | 'delete' | 'search' | 'login' | 'logout';
  resourceType: 'record' | 'user' | 'system';
  resourceId: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface SearchFilters {
  name?: string;
  caseType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface DashboardStats {
  totalRecords: number;
  recentCases: number;
  casesByType: {
    [key: string]: number;
  };
  casesByStatus: {
    [key: string]: number;
  };
  casesTrend: {
    month: string;
    count: number;
  }[];
}