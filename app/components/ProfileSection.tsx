"use client";
import Image from "next/image";

export const ProfileSection = () => {
  return (
    <div className="w-full pb-16 md:py-0 bg-primary px-6 pt-10 ">
      <div className="space-y-8 text-center">
        <div className="relative w-28 md:w-40 h-28 md:h-40 mx-auto">
          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-gray-200">
            <Image
              src="/portrait.jpeg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Yahel Cohen
          </h1>
          <h2 className="text-lg md:text-xl text-gray-600">
            Software Engineer
          </h2>
          <div className="h-px w-16 bg-gray-300 mx-auto my-4" />
          <p className="text-sm md:text-base text-gray-600 max-w-xs mx-auto leading-relaxed">
            3+ years building scalable systems and developing products
          </p>
        </div>

        <div className="space-y-4">
          {/* Contact Info */}
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a
              href="mailto:yahelcohen01@gmail.com"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              yahelcohen01@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              transform="rotate(90)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"
                  stroke="#000000"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <a
              href="tel:+972503311372"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              +972503311372
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">Tel Aviv, Israel</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <a
              href="https://github.com/yahelcohen01"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-black"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/yahelcohen"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Download Resume */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <a
              href="/yahel-cohen--resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-black hover:underline"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
