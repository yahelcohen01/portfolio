import LinkSVG from "@/public/link.svg";
import Image from "next/image";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Clash Royale AI Model",
      description:
        "AI-driven Clash Royale bot that autonomously plays and learns from games using reinforcement learning, implemented in Python with PyTorch, PyAutoGUI, and Roboflow, and containerized with Docker for streamlined deployment.",
      link: "https://github.com/yahelcohen01/CRBot-public",
    },
    {
      title: "Qubit",
      description:
        "I developed the Qubit website for a quantum computing community, utilizing TypeScript, Tailwind CSS, Vite, and TanStack for a modern, responsive frontend.",
      link: "https://github.com/yahelcohen01/qubit",
    },
  ];

  return (
    <div className="py-6 bg-primary px-6">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 text-center md:text-left">
            Projects
          </h3>
          <div className="h-px w-full bg-gray-300 mt-2" />
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <div key={project.title} className="relative">
              <div className="relative pl-4 border-l-2 border-gray-300">
                <div className="absolute -left-[6px] top-[8px] h-2.5 w-2.5 rounded-full bg-gray-400" />

                <div className="space-y-1">
                  <h4 className="text-md font-medium text-gray-900">
                    <a
                      href={project.link}
                      className="flex hover:text-gray-700"
                      target="_blank"
                    >
                      {project.title}

                      <Image
                        src={LinkSVG}
                        alt="Link"
                        className="h-4 w-4 ml-1 self-center"
                      />
                    </a>
                  </h4>

                  <span className="text-sm text-gray-500">
                    {project.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
