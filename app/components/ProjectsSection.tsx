import Link from "next/link";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "International Space Station Tracker",
      description:
        "A web application that visualizes the real-time position of the International Space Station (ISS) using Three.js and satellite data.",
      link: "/iss",
      keepTab: true,
    },
    {
      title: "Portfolio Website (This Site)",
      description:
        "A personal portfolio website showcasing my projects, skills and interests, built with Next.js, TypeScript, and Tailwind CSS.",
      link: "/",
      keepTab: true,
    },
    {
      title: "Clash Royale AI Model",
      description:
        "AI-driven Clash Royale bot that autonomously plays and learns from games using reinforcement learning, implemented in Python with PyTorch, PyAutoGUI, and Roboflow, and containerized with Docker for streamlined deployment.",
      link: "https://github.com/yahelcohen01/clash-royale-ai",
    },
    {
      title: "Qubit",
      description:
        "I developed the Qubit website for a quantum computing community, utilizing TypeScript, Tailwind CSS, Vite, and TanStack for a modern, responsive frontend.",
      link: "https://github.com/yahelcohen01/qubit",
    },
  ];

  return (
    <div className="py-6 px-6">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left">
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
                  <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                    <Link
                      href={project.link}
                      className="flex hover:text-gray-700 dark:hover:text-gray-300"
                      target={project.keepTab ? "_self" : "_blank"}
                    >
                      {project.title}

                      <svg
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="w-4 h-4 ml-1 self-center"
                      >
                        <path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z" />
                        <polygon points="20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2" />
                      </svg>
                    </Link>
                  </h4>

                  <span className="text-sm">{project.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
