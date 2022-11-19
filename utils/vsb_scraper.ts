/**
 * vsb_scraper.ts: Scrapes VSB API for course data
 */

import { load } from 'cheerio'

// Weird time anti-bot thing VSB does
const nWindow = () => {
  let f8b0 = ['\x26\x74\x3D', '\x26\x65\x3D']
  let t = Math.floor(new Date().getTime() / 60000) % 1000
  let e = (t % 3) + (t % 19) + (t % 42)
  return f8b0[0] + t + f8b0[1] + e
}

// Converts current time to minutes since midnight
const getMinutes = (time: string) => {
  let [hours, minutes] = time.split(':')
  return parseInt(hours) * 60 + parseInt(minutes)
}

// Converts minutes since midnight to current time
const getTime = (minutes: number) => {
  let hours = Math.floor(minutes / 60)
  let mins = minutes % 60
  return `${hours}:${mins}`
}

// Get course data from VSB
const getCourse = async courseCode => {
  // Converts current time to milliseconds
  let currTime = new Date().getTime()
  let term = 202301

  let url = `https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=${term}&course_1_0=${courseCode}&rq_1_0=null${nWindow()}&nouser=1&_=${currTime}`

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    },
  })

  const text = await response.text()

  const $ = load(text)

  const course = $('course').attr() // course div
  const courseInfo = $('block').attr() // block div
  const courseTime = $('timeblock').attr() //timeblock div
  console.log($.html())

  // Create a dictionary with course data
  let courseData = {
    code: course.key,
    type: courseInfo.type,
    section: courseInfo.secno,
    location: courseInfo.location,
    remainingSeats: Number(courseInfo.os),
    waitlistRem: Number(courseInfo.ws),
    waitlistCap: Number(courseInfo.wc),
    schedule: [],
  }

  // Get day and time in mins
  $('timeblock').each((_, element) => {
    const { day, t1, t2 } = $(element).attr()
    const times = { day, t1, t2 }
    courseData.schedule.push(times)
  })

  courseData.schedule = courseData.schedule.map(block => ({
    ...block,
    t1: Number(block.t1),
    t2: Number(block.t2),
  }))

  console.log(courseData)
}

getCourse('MATH-251')

export {}