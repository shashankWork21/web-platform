import { FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-6 bg-stone-white-3">
      <div className="px-4 md:px-24 mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p>&copy; 2024 SmartAlgorhythm. All rights reserved.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a href="/terms-and-conditions" className="hover:text-gray-600">
            Terms and Conditions
          </a>
          <a href="/privacy-policy" className="hover:text-gray-600">
            Privacy Policy
          </a>
          <a href="/resources" className="hover:text-gray-600">
            Resources
          </a>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
