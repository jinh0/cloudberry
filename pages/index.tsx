import CourseList from '@components/home/CourseList'
import Main from '@components/Main'
import Search from '@components/home/Search'
import Title from '@components/Title'
import SearchContext from '@contexts/SearchContext'
import { useState } from 'react'
import { CourseType } from '@typing'
import { useQuery } from '@tanstack/react-query'
import Saved from '@components/home/Saved'

export default function Home() {
  const [search, setSearch] = useState('')

  const getCourses = async () => {
    const res = await fetch(`/api/courses?search=${search}`)
    return res.json()
  }

  const { isLoading, error, data, refetch } = useQuery<{
    status: number
    results: CourseType[]
  }>({
    queryKey: ['search', search],
    queryFn: getCourses,
  })

  return (
    <Main>
      <div className='w-full flex flex-row'>
        <div className='lg:w-2/3'>
          <SearchContext.Provider
            value={{ search, setSearch, isLoading, error, data, refetch }}
          >
            <Search />
            <CourseList />
          </SearchContext.Provider>
        </div>

        <Saved />
      </div>
    </Main>
  )
}
