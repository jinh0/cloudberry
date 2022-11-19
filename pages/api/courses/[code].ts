import { CourseType } from '@typing'
import fuse from 'fuse.js'
import { NextApiRequest, NextApiResponse } from 'next'
import courses from 'utils/courses'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { status: number; result: CourseType } | { status: number; error: string }
  >
) {
  return res.status(200).json({
    status: 200,
    result: courses.find(
      course => course.code.toLowerCase() === req.query.code
    ),
  })
}
