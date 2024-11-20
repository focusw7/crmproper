export const mockCustomers = [
  { 
    id: "1", 
    name: "Ahmet Yılmaz", 
    company: "ABC Ltd.",
    location: {
      lat: 41.0082,
      lng: 28.9784,
      address: "İstanbul, Türkiye"
    }
  },
  { 
    id: "2", 
    name: "Mehmet Demir", 
    company: "XYZ A.Ş.",
    location: {
      lat: 39.9334,
      lng: 32.8597,
      address: "Ankara, Türkiye"
    }
  },
  { 
    id: "3", 
    name: "Ayşe Kaya", 
    company: "123 Teknoloji",
    location: {
      lat: 38.4192,
      lng: 27.1287,
      address: "İzmir, Türkiye"
    }
  },
  { 
    id: "4", 
    name: "Fatma Öz", 
    company: "Öz Holding",
    location: {
      lat: 37.0000,
      lng: 35.3213,
      address: "Adana, Türkiye"
    }
  },
  { 
    id: "5", 
    name: "Ali Çelik", 
    company: "Çelik Sanayi",
    location: {
      lat: 40.7667,
      lng: 29.9167,
      address: "Kocaeli, Türkiye"
    }
  },
];

export const mockEmployees = [
  { 
    id: "1", 
    name: "Can Yıldız", 
    department: "Satış",
    position: "Satış Müdürü",
    email: "can.yildiz@sirket.com",
    phone: "+90 532 123 45 67",
    startDate: "2022-01-15",
    salary: 25000,
    location: {
      lat: 41.0082,
      lng: 28.9784,
      address: "İstanbul Merkez Ofis"
    },
    advances: [
      { id: "1", date: "2024-01-10", amount: 5000, status: "Onaylandı" },
      { id: "2", date: "2023-12-15", amount: 3000, status: "Onaylandı" },
    ],
    expenses: [
      { id: "1", date: "2024-01-20", type: "Seyahat", amount: 1500, status: "Beklemede" },
      { id: "2", date: "2024-01-15", type: "Yemek", amount: 500, status: "Onaylandı" },
    ],
    leaves: [
      { id: "1", type: "Yıllık İzin", startDate: "2024-02-01", endDate: "2024-02-05", status: "Onaylandı" },
      { id: "2", type: "Hastalık", startDate: "2024-01-10", endDate: "2024-01-11", status: "Onaylandı" },
    ],
    avatar: "/avatars/can.jpg"
  },
  { 
    id: "2", 
    name: "Zeynep Ak", 
    department: "Pazarlama",
    position: "Pazarlama Uzmanı",
    email: "zeynep.ak@sirket.com",
    phone: "+90 533 234 56 78",
    startDate: "2022-03-01",
    salary: 20000,
    location: {
      lat: 39.9334,
      lng: 32.8597,
      address: "Ankara Şube"
    },
    advances: [
      { id: "3", date: "2024-01-05", amount: 4000, status: "Onaylandı" },
    ],
    expenses: [
      { id: "3", date: "2024-01-18", type: "Eğitim", amount: 2500, status: "Onaylandı" },
    ],
    leaves: [
      { id: "3", type: "Yıllık İzin", startDate: "2024-03-15", endDate: "2024-03-20", status: "Beklemede" },
    ],
    avatar: "/avatars/zeynep.jpg"
  },
  { 
    id: "3", 
    name: "Murat Demir", 
    department: "Teknik",
    position: "Teknik Müdür",
    email: "murat.demir@sirket.com",
    phone: "+90 534 345 67 89",
    startDate: "2022-02-15",
    salary: 22000,
    location: {
      lat: 38.4192,
      lng: 27.1287,
      address: "İzmir Şube"
    },
    advances: [
      { id: "4", date: "2024-01-08", amount: 3500, status: "Onaylandı" },
    ],
    expenses: [
      { id: "4", date: "2024-01-16", type: "Ekipman", amount: 3000, status: "Onaylandı" },
    ],
    leaves: [
      { id: "4", type: "Yıllık İzin", startDate: "2024-04-10", endDate: "2024-04-15", status: "Beklemede" },
    ],
    avatar: "/avatars/murat.jpg"
  },
  {
    id: "4",
    name: "Ayşe Yılmaz",
    department: "İnsan Kaynakları",
    position: "İK Müdürü",
    email: "ayse.yilmaz@sirket.com",
    phone: "+90 535 456 78 90",
    startDate: "2021-12-01",
    salary: 24000,
    location: {
      lat: 41.0082,
      lng: 28.9784,
      address: "İstanbul Merkez Ofis"
    },
    advances: [],
    expenses: [],
    leaves: [],
    avatar: "/avatars/ayse.jpg"
  },
  {
    id: "5",
    name: "Mehmet Kaya",
    department: "Muhasebe",
    position: "Muhasebe Uzmanı",
    email: "mehmet.kaya@sirket.com",
    phone: "+90 536 567 89 01",
    startDate: "2022-09-01",
    salary: 19000,
    location: {
      lat: 41.0082,
      lng: 28.9784,
      address: "İstanbul Merkez Ofis"
    },
    advances: [],
    expenses: [],
    leaves: [],
    avatar: "/avatars/mehmet.jpg"
  }
];

export const mockTools = [
  {
    id: "1",
    name: "Forklift",
    status: "Kullanımda",
    assignedTo: "Mehmet Yılmaz",
    lastCheck: "2024-01-15",
    notes: "Son bakımda hidrolik sistemi yenilendi"
  },
  {
    id: "2",
    name: "Vinç",
    status: "Bakımda",
    assignedTo: "Ali Demir",
    lastCheck: "2024-01-10",
    notes: "Motor arızası tespit edildi"
  },
  {
    id: "3",
    name: "Transpalet",
    status: "Boşta",
    assignedTo: "",
    lastCheck: "2024-01-05",
    notes: "Rutin kontrol yapıldı"
  }
]

export const mockTeams = [
  {
    id: "1",
    name: "Satış Ekibi",
    leader: {
      id: "1",
      name: "Ahmet Yılmaz",
      avatar: "/avatars/ahmet.jpg"
    },
    members: [
      { id: "2", name: "Mehmet Demir", avatar: "/avatars/mehmet.jpg" },
      { id: "3", name: "Ayşe Kaya", avatar: "/avatars/ayse.jpg" },
      { id: "4", name: "Fatma Öz", avatar: "/avatars/fatma.jpg" },
    ],
    activeProjects: 3
  },
  {
    id: "2",
    name: "Teknik Ekip",
    leader: {
      id: "5",
      name: "Ali Çelik",
      avatar: "/avatars/ali.jpg"
    },
    members: [
      { id: "6", name: "Zeynep Ak", avatar: "/avatars/zeynep.jpg" },
      { id: "7", name: "Murat Demir", avatar: "/avatars/murat.jpg" },
    ],
    activeProjects: 2
  },
  {
    id: "3",
    name: "Müşteri İlişkileri",
    leader: {
      id: "8",
      name: "Can Yıldız",
      avatar: "/avatars/can.jpg"
    },
    members: [
      { id: "9", name: "Elif Şahin", avatar: "/avatars/elif.jpg" },
      { id: "10", name: "Burak Çetin", avatar: "/avatars/burak.jpg" },
    ],
    activeProjects: 4
  },
];
