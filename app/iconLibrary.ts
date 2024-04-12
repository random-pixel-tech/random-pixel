import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser'
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare'
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare'


export function initializeIconLibrary() {
  library.add(fab, faPenToSquare, faShare, faHouseUser, faFileExport, faArrowLeft, faCheck, faXmark, faPlaneDeparture, faCalendarCheck, faAddressCard, faSquareCheck, faHouse, faComment, faBookOpen, faChartSimple, faPaperclip, faEllipsisVertical)
}
