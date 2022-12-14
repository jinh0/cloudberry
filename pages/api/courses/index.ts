/**
 * /api/courses/index.ts: get course list with optional query
 */

import { CourseType } from '@typing'
import type { NextApiRequest, NextApiResponse } from 'next'
import courses from 'utils/courses'
import Fuse from 'fuse.js'

const fuse = new Fuse<CourseType>(courses, {
  includeScore: true,
  keys: ['code', 'name'],
  isCaseSensitive: false,
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ results: CourseType[] } | { error: string }>
) {
  const { search, subjects, semester } = req.query as {
    search: string
    subjects: string
    semester: string
  }

  // If there is no query
  if (
    (!search || search === '') &&
    (!subjects || subjects === '') &&
    (!semester || semester === '')
  ) {
    return res.status(200).json({ results: courses.slice(0, 10) })
  }

  console.time('query')

  const results = {
    results: fuse
      .search(
        {
          $and: [
            subjects && {
              $or: subjects
                .split(',')
                .map(subject => ({ code: `^="${subject}"` })),
            },
            // search text
            search && { $or: [{ code: search }, { name: search }] },
          ].filter(x => x),
        },
        { limit: 10 }
      )
      .map(x => x.item),
  }

  console.timeEnd('query')

  return res.status(200).json(results)
}
