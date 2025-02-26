import { GoMail } from "react-icons/go";
import { FaTelegram, FaWhatsapp, FaDiscord, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul>
              <li className="flex items-center mb-2">
                <GoMail className="mr-2" />
                <a href="mailto:admin@CourseHub.live" className="hover:underline">
                  admin@CourseHub.live
                </a>
              </li>
              <li className="flex items-center mb-2">
                <FaTelegram className="mr-2" />
                <a href="https://t.me/CourseHub" className="hover:underline">
                  Telegram
                </a>
              </li>
              <li className="flex items-center mb-2">
                <FaWhatsapp className="mr-2" />
                <a href="https://wa.me/1234567890" className="hover:underline">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul>
              <li className="mb-2">
                <a href="/account" className="hover:underline">
                  My Account
                </a>
              </li>
              <li className="mb-2">
                <a href="/help" className="hover:underline">
                  Customer Help
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Follow</h3>
            <ul>
              <li className="flex items-center mb-2">
                <FaTelegram className="mr-2" />
                <a href="https://t.me/CourseHub" className="hover:underline">
                  Telegram
                </a>
              </li>
              <li className="flex items-center mb-2">
                <FaWhatsapp className="mr-2" />
                <a href="https://wa.me/1234567890" className="hover:underline">
                  WhatsApp Group
                </a>
              </li>
              <li className="flex items-center mb-2">
                <FaDiscord className="mr-2" />
                <a href="https://discord.gg/CourseHub" className="hover:underline">
                  Discord
                </a>
              </li>
              <li className="flex items-center mb-2">
                <FaInstagram className="mr-2" />
                <a href="https://instagram.com/CourseHub" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Over 170+ 5-star reviews</h3>
            <p className="text-gray-400">
              Join our community and explore the vast collection of courses with top-notch content.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CourseHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
