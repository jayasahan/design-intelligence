import type { Student } from './data'

export function progressSummary(rows: Pick<Student, 'status'>[]) {
  const total = rows.length
  const categories = (['On track', 'Needs attention', 'At risk'] as const).map((label, index) => {
    const count = rows.filter(row => row.status === label).length
    return { label, count, percent: total ? Math.round(count / total * 100) : 0, color: ['success', 'warning', 'error'][index] }
  })
  return { total, categories }
}

export function toCsv(rows: Student[]) {
  const fields = ['id', 'name', 'grade', 'advisor', 'attendance', 'average', 'status'] as const
  const quote = (value: unknown) => `"${String(value).replaceAll('"', '""')}"`
  return [fields.join(','), ...rows.map(row => fields.map(field => quote(row[field])).join(','))].join('\r\n')
}

export function exportCsv(csv: string) {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'northstar-students.csv'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
