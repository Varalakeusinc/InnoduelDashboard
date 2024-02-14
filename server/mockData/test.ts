import { type Test } from '../models/test'

// This is a mock data file that we can use to test our API endpoints
// We can use this to test our API endpoints without having to connect to a database

export const getTestMockData: Test[] = [
  {
    id: 1,
    title: 'Test',
    description: 'This is a test',
    completed: false
  },
  {
    id: 2,
    title: 'Test 2',
    description: 'This is a test 2',
    completed: false

  },
  {
    id: 3,
    title: 'Test 3',
    description: 'This is a test 3',
    completed: true

  }
]
