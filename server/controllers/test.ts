import { type Request, type Response } from 'express'
import { getTestMockData } from '../mockData/test'

export const getAll = async (req: Request, res: Response) => {
  res.status(200).json(getTestMockData)
}

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const data = getTestMockData.find((item) => item.id === parseInt(id))
  if (!data) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json(data)
}
