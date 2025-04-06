import Link from 'next/link';
import { FiMail, FiInstagram, FiTwitter, FiGithub } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-black dark:text-white">Tokyo Culture Drop</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Unique fashion inspired by Japanese music culture. Crafted with passion and attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" aria-label="Instagram">
                <FiInstagram aria-hidden="true" className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" aria-label="Twitter">
                <FiTwitter aria-hidden="true" className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" aria-label="GitHub">
                <FiGithub aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Shop Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/men/folk" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Folk
                </Link>
              </li>
              <li>
                <Link href="/men/rock" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Rock
                </Link>
              </li>
              <li>
                <Link href="/men/rap" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Rap
                </Link>
              </li>
              <li>
                <Link href="/men/jpop" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  J-Pop
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FiMail aria-hidden="true" className="h-4 w-4 mr-2" />
                <a href="mailto:info@tokyoculturedrop.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                  info@tokyoculturedrop.com
                </a>
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400">
                Shibuya-ku, Tokyo<br />
                Japan
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 