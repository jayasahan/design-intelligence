import { test } from 'node:test'
import assert from 'node:assert/strict'
import { progressSummary, toCsv } from '../src/report.ts'
test('empty cohort', () => assert.deepEqual(progressSummary([]).categories.map(c => c.percent), [0,0,0]))
test('rounding and counts', () => {
  const result = progressSummary([{status:'On track'}, {status:'On track'}, {status:'At risk'}])
  assert.equal(result.total, 3)
  assert.deepEqual(result.categories.map(c => [c.count,c.percent]), [[2,67],[0,0],[1,33]])
})
test('original cohort percentages', () => {
  const rows = [...Array.from({length:208}, () => ({status:'On track' as const})), ...Array.from({length:27}, () => ({status:'Needs attention' as const})), ...Array.from({length:13}, () => ({status:'At risk' as const}))]
  assert.deepEqual(progressSummary(rows).categories.map(c => c.percent), [84,11,5])
})
test('empty CSV retains header', () => assert.equal(toCsv([]), 'id,name,grade,advisor,attendance,average,status'))
