export type StudentStatus = 'On track' | 'Needs attention' | 'At risk'
export type Grade = '9' | '10' | '11' | '12'

export type Student = {
  id: string
  name: string
  initials: string
  grade: Grade
  advisor: string
  attendance: number
  average: number
  status: StudentStatus
  nextMilestone: string
  email: string
}

const names = [
  ['Amara Wilson', 'AW'], ['Noah Bennett', 'NB'], ['Maya Chen', 'MC'], ['Elias Rivera', 'ER'],
  ['Sofia Patel', 'SP'], ['Liam Thompson', 'LT'], ['Zoe Martin', 'ZM'], ['Kai Johnson', 'KJ'],
  ['Ava Brooks', 'AB'], ['Mateo Garcia', 'MG'], ['Ivy Nguyen', 'IN'], ['Caleb Moore', 'CM'],
]
const advisors = ['J. Carter', 'R. Singh', 'M. Alvarez', 'T. Okafor']
const statuses: StudentStatus[] = ['On track', 'On track', 'Needs attention', 'At risk']
const milestones = ['Algebra project', 'Essay draft', 'Lab reflection', 'College plan']

export const students: Student[] = Array.from({ length: 12 }, (_, index) => {
  const [name, initials] = names[index]
  return {
    id: `ST-${String(index + 1041).padStart(4, '0')}`,
    name,
    initials,
    grade: (9 + (index % 4)).toString() as Grade,
    advisor: advisors[index % advisors.length],
    attendance: [96, 91, 88, 79, 97, 94, 86, 92, 99, 84, 90, 95][index],
    average: [91, 86, 78, 72, 94, 89, 76, 84, 96, 81, 88, 93][index],
    status: statuses[index % statuses.length],
    nextMilestone: milestones[index % milestones.length],
    email: `${name.toLowerCase().replace(' ', '.')}@northstar.edu`,
  }
})

export const largeStudents = Array.from({ length: 240 }, (_, index) => {
  const base = students[index % students.length]
  return { ...base, id: `ST-${String(index + 2000).padStart(4, '0')}`, name: `${base.name} ${Math.floor(index / 12) + 1}` }
})
