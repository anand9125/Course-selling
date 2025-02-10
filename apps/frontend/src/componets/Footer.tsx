import { GoMail } from "react-icons/go";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
function Footer() {
  return (
    <div className="w-full h-max pt-6 ">
      <div className=" bg-black sm:pl-3 mx-auto">
        <div  className="max-w-7xl mx-auto  px-4  grid grid-cols-4 ">
        <div>
          <div className="text-white font-medium pt-3 ">
            CONTACT
          </div>
              <div>
                <div className="flex pt-4 items-center space-x-2">
                  <div><GoMail className="text-slate-200 "/>
                  </div>
                  <span className="text-white">admin@CourseHub.live</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaTelegram className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">Telegram</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">WhatsApp</span>
                </div>
            </div>
        </div>
        <div>
          <div className="text-white font-medium pt-3 ">
           Help
          </div>
              <div>
                <div className="flex pt-4 items-center space-x-2">
                  <div><GoMail className="text-slate-200 "/>
                  </div>
                  <span className="text-white">My Account</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaTelegram className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">Customer Help</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">Contact Us</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">FAQ</span>
                </div>
            </div>
        </div>
        <div>
          <div className="text-white font-medium pt-3 ">
          Follow
          </div>
              <div>
                <div className="flex pt-4 items-center space-x-2">
                  <div><GoMail className="text-slate-200 "/>
                  </div>
                  <span className="text-white">Telegram</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaTelegram className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">WhatsApp Group</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">WhatsApp Channel</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">Discord</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">Instagram</span>
                </div>
            </div>
        </div>
        <div>
          <div className="text-white font-medium pt-3 ">
          Over 170+ 5-star reviews
          </div>
              <div>
                <div className="flex pt-4 items-center space-x-2">
                  <div><GoMail className="text-slate-200 "/>
                  </div>
                  <span className="text-white">admin@CourseHub.live</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaTelegram className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">Telegram</span>
                </div>
                <div className="flex  items-center space-x-2">
                  <div><FaWhatsapp  className="text-slate-200 "/>
                  </div>   
                  <span className="text-white">WhatsApp</span>
                </div>
            </div>
        </div>
     
      </div>
      </div> 
    </div>
  )
}

export default Footer