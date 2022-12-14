import { useQuery } from '@tanstack/react-query'
import { CourseType } from '@typing'

const useCourse = (code: string) => {
  const getCourse = async (code: string) => {
    const res = await fetch(`/api/courses/${code}`)
    return res.json()
  }

  const { data, isLoading } = useQuery<{ status: number; result: CourseType }>({
    queryKey: ['course', code],
    queryFn: () => getCourse(code),
  })

  return { data, isLoading }
}

export default useCourse
