import WeeklyView from '@components/schedule/WeeklyView'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import useVSB from '@hooks/useVSB'
import { VSBCourse } from '@typing'
import { useState } from 'react'
import Block from './Block'
import Schedule from './Schedule'

const VSBData = ({ vsb }: { vsb: VSBCourse }) => {
  const { course } = useVSB(vsb)
  const [idx, setIdx] = useState(0)

  if (!vsb || !course.blocks || course.blocks.length === 0) return <></>

  return (
    <div className='mt-10 mb-4'>
      <div className='mb-6 flex flex-row items-center gap-4'>
        <div className='text-2xl flex items-center'>Schedule</div>

        {course.blocks.length > 1 && (
          <div className='flex flex-row items-center gap-4'>
            <button
              className='p-2 rounded-xl bg-gray-50'
              onClick={() => {
                if (idx > 0) setIdx(idx - 1)
                else setIdx(course.combos.length - 1)
              }}
            >
              <ArrowLeftIcon className='w-4 h-4' />
            </button>
            <div className='text-xl'>
              {idx + 1} of {course.combos.length}
            </div>
            <button
              className='p-2 rounded-xl bg-gray-50'
              onClick={() => {
                if (idx < course.combos.length - 1) setIdx(idx + 1)
                else setIdx(0)
              }}
            >
              <ArrowRightIcon className='w-4 h-4' />
            </button>
          </div>
        )}
      </div>

      <div>
        {course.blocks
          .filter(block => course.combos[idx].includes(block.crn))
          .map(block => (
            <Block code={course.code} block={block} key={block.crn} />
          ))}
      </div>

      {/* <WeeklyView */}
      {/* blocks={course.blocks.filter(block => */}
      {/* course.combos[idx].includes(block.crn) */}
      {/* )} */}
      {/* height={32} */}
      {/* /> */}
    </div>
  )
}

export default VSBData
