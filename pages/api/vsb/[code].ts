/**
 * [code].ts: Get individual VSB data by code
 */

import { Safe, VSBCourse } from '@typing'
import { getCourse } from '@utils/vsbScraper'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VSBCourse | { error: string }>
) {
  const { code } = req.query

  console.log('code', code)

  const vsbData = await getCourse(code as Uppercase<string>)

  console.log('vsbData', vsbData)

  if (!vsbData.isOk)
    return res.status(400).json({ error: 'VSB data not found' })

  return res.status(200).json(vsbData.result)
}
