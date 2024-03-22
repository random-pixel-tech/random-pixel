import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip'


export function initializeIconLibrary() {
  library.add(fab, faSquareCheck, faHouse, faComment, faBookOpen, faChartSimple, faPaperclip)
}
