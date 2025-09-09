export const CertificatesSection = () => {
  const certificates = [
    {
      title: "Magshimim - Israel National Cyber Program",
      date: "2018 - 2021",
    },
  ];

  return (
    <div className="py-6 bg-primary px-6">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left">
            Certifications
          </h3>
          <div className="h-px w-full bg-gray-300 mt-2" />
        </div>

        <div className="space-y-5">
          {certificates.map((cert) => (
            <div key={cert.title} className="relative">
              <div className="relative pl-4 border-l-2 border-gray-300">
                <div className="absolute -left-[6px] top-[8px] h-2.5 w-2.5 rounded-full bg-gray-400" />

                <div className="space-y-1">
                  <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                    <a
                      href="https://www.magshimim.cyber.org.il/"
                      target="_blank"
                      className="hover:text-gray-700 flex dark:hover:text-gray-300"
                    >
                      {cert.title}
                      <svg
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="w-4 h-4 ml-1 self-center"
                      >
                        <path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z" />
                        <polygon points="20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2" />
                      </svg>
                    </a>
                  </h4>

                  <span className="text-sm">{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
