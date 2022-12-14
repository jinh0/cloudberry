import { Dispatch, SetStateAction } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Subject } from '@utils/subjects'

const SelectedSubjects = ({
  subjects,
  setSubjects,
}: {
  subjects: Subject[]
  setSubjects: Dispatch<SetStateAction<Subject[]>>
}) => {
  return (
    <div className='flex flex-row flex-wrap gap-y-2'>
      {subjects.map((subject, idx) => (
        <div key={idx} className='mr-2 group'>
          <div className='inline-flex w-full justify-between rounded-full px-4 py-1 border border-transparent bg-violet-100 text-violet-700 focus:outline-none mr-2 flex-wrap'>
            <span className='font-bold'>{subject.code}</span>
            {/* <span className='hidden md:ml-1 group-hover:inline-block'>
              {subject.title}
            </span> */}
            <button
              onClick={() => {
                localStorage.setItem(
                  'subjects',
                  JSON.stringify(subjects.filter(x => x.code !== subject.code))
                )
                setSubjects(subjects.filter(x => x.code !== subject.code))
              }}
            >
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SelectedSubjects
