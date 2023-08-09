import defaultSettings from '@/settings'

const title = defaultSettings.title || 'React'

export default function getPageTitle(pageTitle, t) {
  if (pageTitle) {
    console.log('title: ', t(title))
    return `${t(pageTitle)} - ${t(title)}`
  }
  return `${t(title)}`
}
