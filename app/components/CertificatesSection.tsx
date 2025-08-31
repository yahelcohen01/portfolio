import Image from "next/image";
import LinkSVG from "@/public/link.svg";

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
          <h3 className="text-lg font-semibold text-gray-900 text-center md:text-left">
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
                  <h4 className="text-md font-medium text-gray-900">
                    <a
                      href="https://www.magshimim.cyber.org.il/"
                      className="hover:text-gray-700 flex"
                    >
                      {cert.title}
                      <Image
                        src={LinkSVG}
                        alt="Link"
                        className="h-4 w-4 ml-1 self-center"
                      />
                    </a>
                  </h4>

                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
