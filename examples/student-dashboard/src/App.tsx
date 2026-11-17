import { useMemo, useState } from 'react'
import {
  Alert, Avatar, Box, Button, Card, CardContent, Chip, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, Drawer, FormControl, Grid, IconButton, InputAdornment, InputLabel,
  List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Snackbar, Stack, TextField, Toolbar, Tooltip,
  Typography, useMediaQuery, useTheme,
} from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { largeStudents, Student, students } from './data'

import { progressSummary, toCsv, exportCsv } from './report'

const drawerWidth = 246
const navItems = [
  { label: 'Overview', icon: <DashboardRoundedIcon /> },
  { label: 'Students', icon: <GroupsRoundedIcon /> },
  { label: 'Calendar', icon: <CalendarMonthRoundedIcon /> },
  { label: 'Reports', icon: <BarChartRoundedIcon /> },
]

function statusColor(status: Student['status']) {
  return status === 'On track' ? 'success' : status === 'Needs attention' ? 'warning' : 'error'
}

function App() {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))
  const params = new URLSearchParams(window.location.search)
  const fixture = params.get('state')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [section, setSection] = useState('Overview')
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState('All grades')
  const [status, setStatus] = useState('All statuses')
  const [selected, setSelected] = useState<Student | null>(null)
  const [snack, setSnack] = useState('')
  const data = params.get('dataset') === 'large' ? largeStudents : students

  const progress = progressSummary(data)
  const onTrack = progress.categories[0].percent
  const filtered = useMemo(() => {
    if (fixture === 'empty') return []
    return data.filter((student) => {
    const matchesSearch = `${student.name} ${student.id}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (grade === 'All grades' || student.grade === grade) && (status === 'All statuses' || student.status === status)
    })
  }, [data, fixture, grade, search, status])

  const columns: GridColDef<Student>[] = [
    { field: 'name', headerName: 'Student', flex: 1.25, minWidth: 205, renderCell: (params: GridRenderCellParams<Student>) => <Stack direction="row" spacing={1.25} alignItems="center"><Avatar className="student-avatar">{params.row.initials}</Avatar><Box><Typography fontWeight={700} fontSize="0.85rem">{params.row.name}</Typography><Typography variant="caption" color="text.secondary">{params.row.id}</Typography></Box></Stack> },
    { field: 'grade', headerName: 'Grade', width: 90 },
    { field: 'advisor', headerName: 'Advisor', width: 120 },
    { field: 'attendance', headerName: 'Attendance', width: 120, renderCell: (params) => <Typography fontWeight={700}>{params.value}%</Typography> },
    { field: 'average', headerName: 'Average', width: 105, renderCell: (params) => <Typography fontWeight={700}>{params.value}%</Typography> },
    { field: 'status', headerName: 'Status', width: 165, renderCell: (params) => <Chip size="small" label={params.value} color={statusColor(params.value)} variant="outlined" /> },
    { field: 'actions', headerName: '', sortable: false, width: 58, renderCell: (params) => <Tooltip title="View student"><IconButton aria-label={`View ${params.row.name}`} size="small" onClick={() => setSelected(params.row)}><MoreHorizRoundedIcon /></IconButton></Tooltip> },
  ]

  const selectSection = (label: string) => { setSection(label); setDrawerOpen(false) }
  const drawer = <Box className="drawer-content" component="nav" aria-label="Primary navigation"><Box className="brand-lockup"><Box className="brand-mark">N</Box><Box><Typography fontWeight={800} lineHeight={1}>northstar</Typography><Typography variant="caption" color="text.secondary">student operations</Typography></Box></Box><Typography className="nav-label">Workspace</Typography><List component="div" disablePadding>{navItems.map((item) => <ListItemButton key={item.label} selected={section === item.label} onClick={() => selectSection(item.label)}>{<ListItemIcon>{item.icon}</ListItemIcon>}<ListItemText primary={item.label} /></ListItemButton>)}</List><Box sx={{ flex: 1 }} /><Divider /><List component="div" disablePadding><ListItemButton onClick={() => setSnack('Settings are part of the playground shell.')}><ListItemIcon><SettingsRoundedIcon /></ListItemIcon><ListItemText primary="Settings" /></ListItemButton></List></Box>

  return <Box className="app-shell">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    {!mobile && <Drawer variant="permanent" className="desktop-drawer" open><Box sx={{ width: '100%', height: '100%' }}>{drawer}</Box></Drawer>}
    <Drawer variant="temporary" open={drawerOpen} onClose={() => setDrawerOpen(false)} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { width: drawerWidth } }}>{drawer}</Drawer>
    <Box component="main" id="main-content" className="main-content">
      <Toolbar className="topbar"><IconButton aria-label="Open navigation" onClick={() => setDrawerOpen(true)} sx={{ display: { md: 'none' } }}><MenuRoundedIcon /></IconButton><Box sx={{ flex: 1 }} /><Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>Demo · October 15, 2024</Typography><Avatar className="profile-avatar" aria-label="Profile for Jordan Lee">JL</Avatar></Toolbar>
      <Box className="page-wrap">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2} alignItems={{ sm: 'center' }} mb={3}><Box><Typography variant="overline" color="primary.main" fontWeight={800} letterSpacing="0.13em">{section === 'Overview' ? 'Good morning, Jordan' : 'Workspace'}</Typography><Typography component="h1" variant="h1">{section}</Typography><Typography color="text.secondary" mt={0.75}>{section === 'Overview' ? 'A focused view of student progress across your campus.' : 'Explore the student operations workspace.'}</Typography></Box><Button variant="contained" startIcon={<ArrowUpwardRoundedIcon />} onClick={() => exportCsv(toCsv(filtered))}>Export report</Button></Stack>
        {section !== 'Overview' ? <Card><CardContent><Typography variant="h2" mb={1}>{section} view</Typography><Typography color="text.secondary">This navigation destination is intentionally lightweight in v1.2.0. Return to Overview to explore the working student directory.</Typography><Button sx={{ mt: 2 }} variant="outlined" onClick={() => setSection('Overview')}>Back to overview</Button></CardContent></Card> : <>
          <Grid container spacing={2} mb={3}>{[['Students enrolled', String(progress.total), 'Synthetic demo records'], ['Average attendance', `${(data.reduce((sum, student) => sum + student.attendance, 0) / (data.length || 1)).toFixed(1)}%`, 'Across demo records'], ['Students needing support', String(progress.total - progress.categories[0].count), 'Attention or at risk'], ['Milestones due', '26', 'Next 7 days']].map(([label, value, trend], index) => <Grid key={label} size={{ xs: 12, sm: 6, lg: 3 }}><Card className={`stat-card stat-${index}`}><CardContent><Stack direction="row" justifyContent="space-between" alignItems="start"><Typography variant="body2" color="text.secondary">{label}</Typography><Box className="stat-icon">{index === 0 ? <GroupsRoundedIcon /> : index === 1 ? <BarChartRoundedIcon /> : index === 2 ? <CalendarMonthRoundedIcon /> : <ArrowForwardRoundedIcon />}</Box></Stack><Typography className="stat-value">{value}</Typography><Typography variant="caption" color={index === 2 ? 'warning.main' : 'success.main'} fontWeight={700}>{trend}</Typography></CardContent></Card></Grid>)}</Grid>
          <Grid container spacing={2.5} mb={3}><Grid size={{ xs: 12, lg: 8 }}><Card className="progress-card"><CardContent><Stack direction="row" justifyContent="space-between" alignItems="start" mb={2}><Box><Typography variant="h2">Student progress</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>Academic health across the current term</Typography></Box><Chip label="Fall term" size="small" variant="outlined" /></Stack><Box className="progress-visual"><Box className="progress-ring" style={{ background: `radial-gradient(circle at center, white 57%, transparent 58%), conic-gradient(#25855a 0 ${onTrack}%, #e6edf0 ${onTrack}% 100%)` }}><Typography variant="h2">{onTrack}%</Typography><Typography variant="caption" color="text.secondary">on track</Typography></Box><Stack spacing={1.7} flex={1}>{progress.categories.map(({ label, count, percent, color }) => <Box key={label}><Stack direction="row" justifyContent="space-between" mb={0.5}><Typography variant="body2" fontWeight={700}>{label}</Typography><Typography variant="body2" color="text.secondary">{count} · {percent}%</Typography></Stack><Box className="bar-track"><Box className={`bar-fill ${color}`} style={{ width: `${percent}%` }} /></Box></Box>)}</Stack></Box></CardContent></Card></Grid><Grid size={{ xs: 12, lg: 4 }}><Card className="notice-card"><CardContent><Typography variant="h2">Needs a closer look</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>Small actions can keep momentum going.</Typography><Stack spacing={1.4} mt={2.5}>{students.filter((s) => s.status !== 'On track').slice(0, 3).map((student) => <Button key={student.id} variant="text" className="notice-row" onClick={() => setSelected(student)}><Avatar className="student-avatar">{student.initials}</Avatar><Box textAlign="left" flex={1}><Typography variant="body2" fontWeight={700}>{student.name}</Typography><Typography variant="caption" color="text.secondary">{student.nextMilestone}</Typography></Box><ArrowForwardRoundedIcon fontSize="small" /></Button>)}</Stack><Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}>View student directory</Button></CardContent></Card></Grid></Grid>
          <Card id="directory" className="directory-card"><CardContent sx={{ p: { xs: 2, sm: 3 } }}><Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2} mb={2.5}><Box><Typography variant="h2">Student directory</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>Search, filter and open a student record.</Typography></Box><Stack direction={{ xs: 'column', sm: 'row' }} gap={1}><TextField size="small" placeholder="Search students" value={search} onChange={(event) => setSearch(event.target.value)} inputProps={{ 'aria-label': 'Search students' }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> }} /><FormControl size="small" sx={{ minWidth: 130 }}><InputLabel id="grade-label">Grade</InputLabel><Select labelId="grade-label" label="Grade" value={grade} onChange={(event) => setGrade(event.target.value)}><MenuItem value="All grades">All grades</MenuItem>{['9', '10', '11', '12'].map((value) => <MenuItem key={value} value={value}>Grade {value}</MenuItem>)}</Select></FormControl><FormControl size="small" sx={{ minWidth: 155 }}><InputLabel id="status-label">Status</InputLabel><Select labelId="status-label" label="Status" value={status} onChange={(event) => setStatus(event.target.value)}><MenuItem value="All statuses">All statuses</MenuItem>{['On track', 'Needs attention', 'At risk'].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}</Select></FormControl></Stack></Stack>{fixture === 'error' ? <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => window.location.href = window.location.pathname}>Try again</Button>}>We couldn’t load the student directory. Please try again.</Alert> : fixture === 'loading' ? <Box className="state-box"><CircularProgress aria-label="Loading student directory" size={28} /><Typography color="text.secondary">Loading student records…</Typography></Box> : filtered.length === 0 ? <Box className="state-box"><GroupsRoundedIcon color="disabled" fontSize="large" /><Typography variant="h3">No students found</Typography><Typography color="text.secondary">Try a different name, grade or status.</Typography><Button variant="outlined" onClick={() => { setSearch(''); setGrade('All grades'); setStatus('All statuses') }}>Clear filters</Button></Box> : <Box className="grid-wrap"><DataGrid rowHeight={64} rows={filtered} columns={columns} getRowId={(row) => row.id} pageSizeOptions={[5, 10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }} disableRowSelectionOnClick onRowDoubleClick={(params) => setSelected(params.row)} aria-label="Student directory table" /></Box>}</CardContent></Card>
        </>}
      </Box>
    </Box>
    <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="sm" aria-labelledby="student-detail-title"><DialogTitle id="student-detail-title">Student detail<IconButton aria-label="Close student detail" onClick={() => setSelected(null)} sx={{ position: 'absolute', right: 12, top: 12 }}><CloseRoundedIcon /></IconButton></DialogTitle><DialogContent dividers>{selected && <Stack spacing={2}><Stack direction="row" spacing={1.5} alignItems="center"><Avatar className="dialog-avatar">{selected.initials}</Avatar><Box><Typography variant="h2">{selected.name}</Typography><Typography color="text.secondary">{selected.id} · Grade {selected.grade}</Typography></Box></Stack><Divider /><Grid container spacing={2}>{[['Advisor', selected.advisor], ['Attendance', `${selected.attendance}%`], ['Average', `${selected.average}%`], ['Next milestone', selected.nextMilestone]].map(([label, value]) => <Grid key={label} size={{ xs: 6 }}><Typography variant="caption" color="text.secondary">{label}</Typography><Typography fontWeight={700}>{value}</Typography></Grid>)}</Grid><Alert severity={selected.status === 'On track' ? 'success' : 'warning'}>{selected.status === 'On track' ? 'This student is progressing steadily.' : 'Consider checking in before the next milestone.'}</Alert></Stack>}</DialogContent><DialogActions><Button onClick={() => setSelected(null)}>Close</Button><Button variant="contained" onClick={() => { setSnack('Check-in is not available in this demo.'); setSelected(null) }}>Preview check-in</Button></DialogActions></Dialog>
    <Snackbar open={Boolean(snack)} autoHideDuration={3500} onClose={() => setSnack('')} message={snack} action={<IconButton size="small" color="inherit" aria-label="Dismiss notification" onClick={() => setSnack('')}><CloseRoundedIcon fontSize="small" /></IconButton>} />
  </Box>
}

export default App
