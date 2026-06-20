// Avatar generator using DiceBear-style initials avatars (no external image dependency issues)
export const avatarUrl = (seed) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f1edec`

export const currentUser = {
  id: 'u0',
  name: 'Alex Rivera',
  role: 'HR Lead',
  email: 'alex.rivera@company.com',
  avatar: avatarUrl('Alex Rivera')
}

export const departments = [
  'Engineering',
  'Product',
  'Design',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'HR'
]

export const roles = [
  'Senior Product Designer',
  'Lead Backend Engineer',
  'Account Executive',
  'Frontend Engineer',
  'Marketing Manager',
  'Financial Analyst',
  'Operations Coordinator',
  'HR Generalist',
  'QA Engineer',
  'Sales Director',
  'Data Analyst',
  'DevOps Engineer',
  'Customer Success Manager',
  'Content Strategist',
  'Recruiter'
]

const statuses = ['Active', 'On Leave', 'Terminated']

const names = [
  'Jordan Smith',
  'Elena Vasquez',
  'Marcus Chen',
  'Sarah Jenkins',
  'David Miller',
  'Priya Patel',
  'Liam O\u2019Connor',
  'Aisha Khan',
  'Noah Garcia',
  'Sofia Rossi',
  'Ethan Wong',
  'Maria Silva',
  'Daniel Cohen',
  'Grace Park',
  'Omar Hassan'
]

export let initialEmployees = names.map((name, i) => ({
  id: `emp-${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, '.')}@company.com`,
  department: departments[i % departments.length],
  role: roles[i % roles.length],
  status: i === 1 ? 'On Leave' : i === 13 ? 'Terminated' : 'Active',
  avatar: avatarUrl(name),
  joined: `${2019 + (i % 5)}-0${(i % 9) + 1}-1${i % 2}`
}))

export const initialLeaves = [
  {
    id: 'lv-1',
    employeeName: 'Jordan Smith',
    role: 'Senior Product Designer',
    avatar: avatarUrl('Jordan Smith'),
    type: 'Annual',
    period: 'Sept 24 \u2014 Sept 28, 2024',
    days: 5,
    reason: 'Family vacation. Work hand-off documents shared in Slack.',
    status: 'Pending'
  },
  {
    id: 'lv-2',
    employeeName: 'Elena Vasquez',
    role: 'Lead Backend Engineer',
    avatar: avatarUrl('Elena Vasquez'),
    type: 'Emergency',
    period: 'Sept 16 \u2014 Sept 17, 2024',
    days: 2,
    reason: 'Sudden family emergency requiring immediate travel.',
    status: 'Pending'
  },
  {
    id: 'lv-3',
    employeeName: 'Marcus Chen',
    role: 'Account Executive',
    avatar: avatarUrl('Marcus Chen'),
    type: 'Sick',
    period: 'Today',
    days: 1,
    reason: 'Feeling unwell, will monitor and update tomorrow.',
    status: 'Pending'
  },
  {
    id: 'lv-4',
    employeeName: 'Sarah Jenkins',
    role: 'Frontend Engineer',
    avatar: avatarUrl('Sarah Jenkins'),
    type: 'Annual',
    period: 'Sep 10 \u2014 Sep 12',
    days: 3,
    reason: 'Personal time off.',
    status: 'Approved'
  },
  {
    id: 'lv-5',
    employeeName: 'David Miller',
    role: 'Marketing Manager',
    avatar: avatarUrl('David Miller'),
    type: 'Sick',
    period: 'Sep 08 \u2014 Sep 09',
    days: 2,
    reason: 'Flu recovery.',
    status: 'Approved'
  },
  {
    id: 'lv-6',
    employeeName: 'Priya Patel',
    role: 'Financial Analyst',
    avatar: avatarUrl('Priya Patel'),
    type: 'Annual',
    period: 'Aug 28 \u2014 Aug 30',
    days: 3,
    reason: 'Wedding anniversary trip.',
    status: 'Approved'
  },
  {
    id: 'lv-7',
    employeeName: 'Liam O\u2019Connor',
    role: 'Operations Coordinator',
    avatar: avatarUrl('Liam OConnor'),
    type: 'Emergency',
    period: 'Aug 20',
    days: 1,
    reason: 'Home emergency.',
    status: 'Rejected'
  },
  {
    id: 'lv-8',
    employeeName: 'Aisha Khan',
    role: 'HR Generalist',
    avatar: avatarUrl('Aisha Khan'),
    type: 'Annual',
    period: 'Aug 12 \u2014 Aug 14',
    days: 3,
    reason: 'Family event.',
    status: 'Approved'
  }
]

export const recentActivities = [
  {
    id: 'act-1',
    name: 'Sarah Jenkins',
    avatar: avatarUrl('Sarah Jenkins'),
    action: 'submitted a new leave request',
    time: '12 minutes ago',
    status: 'Pending'
  },
  {
    id: 'act-2',
    name: 'David Miller',
    avatar: avatarUrl('David Miller'),
    action: 'was approved for sick leave',
    time: '1 hour ago',
    status: 'Approved'
  },
  {
    id: 'act-3',
    name: 'Priya Patel',
    avatar: avatarUrl('Priya Patel'),
    action: 'updated their contract details',
    time: '3 hours ago',
    status: 'Updated'
  },
  {
    id: 'act-4',
    name: 'Liam O\u2019Connor',
    avatar: avatarUrl('Liam OConnor'),
    action: 'had a leave request rejected',
    time: 'Yesterday',
    status: 'Rejected'
  },
  {
    id: 'act-5',
    name: 'Alex Rivera',
    avatar: avatarUrl('Alex Rivera'),
    action: 'generated payroll for September',
    time: '2 days ago',
    status: 'Completed'
  }
]

export const upcomingLeaves = [
  {
    id: 'up-1',
    name: 'Jordan Smith',
    avatar: avatarUrl('Jordan Smith'),
    type: 'Annual',
    dates: 'Sept 24 \u2014 28'
  },
  {
    id: 'up-2',
    name: 'Elena Vasquez',
    avatar: avatarUrl('Elena Vasquez'),
    type: 'Emergency',
    dates: 'Sept 16 \u2014 17'
  },
  {
    id: 'up-3',
    name: 'Aisha Khan',
    avatar: avatarUrl('Aisha Khan'),
    type: 'Annual',
    dates: 'Oct 02 \u2014 04'
  }
]

export const headcountDistribution = [
  { label: 'Engineering', count: 18, percent: 38 },
  { label: 'Sales', count: 12, percent: 26 },
  { label: 'Design', count: 8, percent: 17 }
]

export const dashboardStats = {
  totalEmployees: 47,
  pendingLeaves: 8,
  monthlyPayroll: 124500,
  activeContracts: 45
}
