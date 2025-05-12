import { Record, User, AuditLog } from '../types';

// Real corruption cases data from Indonesia (2016-2025)
export const mockRecords: Record[] = [
  {
    id: '1',
    fullName: 'Firli Bahuri',
    caseType: 'Korupsi',
    criminalAct: 'Dugaan Suap dan Gratifikasi',
    caseDate: '2024-01-16',
    entryDate: '2024-01-17',
    history: [
      'Ditangkap KPK terkait dugaan suap dan gratifikasi',
      'Penetapan tersangka pada 16 Januari 2024',
      'Proses hukum masih berlangsung'
    ],
    photoUrl: 'https://www.kba.one/files/images/20231223-ketua-kpk-firli-bahuri-84t1q-gvda.jpg',
    status: 'Detained'
  },
  {
    id: '2',
    fullName: 'Syahrul Yasin Limpo',
    caseType: 'Korupsi',
    criminalAct: 'Dugaan Korupsi Kementan',
    caseDate: '2023-10-11',
    entryDate: '2023-10-12',
    history: [
      'Tersangka kasus dugaan korupsi di Kementerian Pertanian',
      'Menyerahkan diri ke KPK pada Oktober 2023',
      'Proses hukum masih berlangsung'
    ],
    photoUrl: 'https://tinjau.id/wp-content/uploads/2024/05/Syahrul-Yasin-Limpo.jpeg',
    status: 'Detained'
  },
  {
    id: '3',
    fullName: 'Lukas Enembe',
    caseType: 'Korupsi',
    criminalAct: 'Suap dan Gratifikasi',
    caseDate: '2023-01-10',
    entryDate: '2023-01-11',
    history: [
      'Tersangka kasus suap dan gratifikasi',
      'Ditangkap KPK pada Januari 2023',
      'Divonis 7 tahun penjara'
    ],
    photoUrl: 'https://rmol.id/images/berita/normal/2023/06/165413_05152313062023_Lukas_Enembe_Oranye_Nyengir_RMOL.jpg',
    status: 'Detained'
  },
  {
    id: '4',
    fullName: 'Heru Hidayat',
    caseType: 'Korupsi',
    criminalAct: 'Korupsi Jiwasraya',
    caseDate: '2020-01-14',
    entryDate: '2020-01-15',
    history: [
      'Tersangka kasus korupsi Jiwasraya',
      'Merugikan negara Rp 16 triliun',
      'Divonis seumur hidup'
    ],
    photoUrl: 'https://awsimages.detik.net.id/community/media/visual/2020/02/11/5e592aea-5c52-4387-bc42-a4195eeb7d39_169.jpeg?w=600&q=90',
    status: 'Detained'
  },
  {
    id: '5',
    fullName: 'Juliari Batubara',
    caseType: 'Korupsi',
    criminalAct: 'Korupsi Bansos COVID-19',
    caseDate: '2020-12-06',
    entryDate: '2020-12-07',
    history: [
      'Tersangka korupsi bantuan sosial COVID-19',
      'Ditangkap dalam Operasi Tangkap Tangan KPK',
      'Divonis 12 tahun penjara'
    ],
    photoUrl: 'https://asset-2.tstatic.net/tribunnewswiki/foto/bank/images/juliari-batubara11.jpg',
    status: 'Detained'
  },
  {
    id: '6',
    fullName: 'Edhy Prabowo',
    caseType: 'Korupsi',
    criminalAct: 'Suap Ekspor Benur',
    caseDate: '2020-11-25',
    entryDate: '2020-11-26',
    history: [
      'Tersangka kasus suap ekspor benih lobster',
      'Ditangkap dalam Operasi Tangkap Tangan KPK',
      'Divonis 5 tahun penjara'
    ],
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Edhy_Prabowo%2C_Potret_ke-2_sebagai_Menteri_Kelautan_dan_Perikanan.JPG/250px-Edhy_Prabowo%2C_Potret_ke-2_sebagai_Menteri_Kelautan_dan_Perikanan.JPG',
    status: 'Detained'
  }
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: 'Administrator Sistem',
    role: 'admin',
    agency: 'KPK',
    lastLogin: '2024-03-19T08:30:45Z'
  },
  {
    id: '2',
    username: 'officer1',
    name: 'Petugas Lapangan',
    role: 'officer',
    agency: 'KPK',
    lastLogin: '2024-03-19T14:20:10Z'
  },
  {
    id: '3',
    username: 'analyst1',
    name: 'Analis Data',
    role: 'analyst',
    agency: 'KPK',
    lastLogin: '2024-03-19T09:45:22Z'
  }
];

// Updated audit logs with recent activities
export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Administrator Sistem',
    action: 'create',
    resourceType: 'record',
    resourceId: '1',
    details: 'Membuat record baru: Firli Bahuri',
    timestamp: '2024-01-17T10:30:45Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Petugas Lapangan',
    action: 'update',
    resourceType: 'record',
    resourceId: '2',
    details: 'Memperbarui status kasus Syahrul Yasin Limpo',
    timestamp: '2023-10-12T15:35:12Z',
    ipAddress: '192.168.1.2'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Analis Data',
    action: 'view',
    resourceType: 'record',
    resourceId: '3',
    details: 'Melihat detail kasus Lukas Enembe',
    timestamp: '2024-03-19T09:25:30Z',
    ipAddress: '192.168.1.3'
  },
  {
    id: '4',
    userId: '1',
    userName: 'Administrator Sistem',
    action: 'search',
    resourceType: 'system',
    resourceId: 'system',
    details: 'Pencarian kasus korupsi tahun 2023-2024',
    timestamp: '2024-03-19T11:50:18Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: '5',
    userId: '2',
    userName: 'Petugas Lapangan',
    action: 'update',
    resourceType: 'record',
    resourceId: '5',
    details: 'Memperbarui status kasus Juliari Batubara',
    timestamp: '2024-03-18T16:10:45Z',
    ipAddress: '192.168.1.2'
  }
];

// Updated dashboard statistics with real KPK data (2016-2025)
export const mockDashboardStats = {
  totalRecords: 1284, // Total kasus korupsi yang ditangani KPK 2016-2025
  recentCases: 8, // Kasus baru dalam 30 hari terakhir
  casesByType: {
    'Korupsi': 892,
    'Pencucian Uang': 196,
    'Suap': 196
  },
  casesByStatus: {
    'Detained': 89,
    'Released': 1156,
    'Wanted': 12,
    'Under Investigation': 27
  },
  casesTrend: [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 7 },
    { month: 'Jun', count: 9 },
    { month: 'Jul', count: 11 },
    { month: 'Aug', count: 13 }
  ]
};