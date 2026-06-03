import { inject, type InjectionKey, type Ref } from 'vue'
import type { EmployeeRow } from './types'

type EmployeesState = {
  employees: Ref<EmployeeRow[]>
  totals: Ref<string[]>
  runCalculations: () => void
  resetCalculations: () => void
}

export const EmployeesKey: InjectionKey<EmployeesState> = Symbol('Employees')

export const useEmployees = (): EmployeesState => {
  const state = inject(EmployeesKey)
  if (!state) throw new Error('useEmployees must be used within an EmployeesProvider')
  return state
}
