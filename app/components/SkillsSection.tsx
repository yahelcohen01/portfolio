import Chip from "./Chip";

export const SkillsSection = () => {
  const skills = [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "C/C++"],
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#9da2af"
          className="w-4 h-4"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>language_json</title>{" "}
            <rect width="24" height="24" fill="none"></rect>{" "}
            <path d="M5,3H7V5H5v5a2,2,0,0,1-2,2,2,2,0,0,1,2,2v5H7v2H5c-1.07-.27-2-.9-2-2V15a2,2,0,0,0-2-2H0V11H1A2,2,0,0,0,3,9V5A2,2,0,0,1,5,3M19,3a2,2,0,0,1,2,2V9a2,2,0,0,0,2,2h1v2H23a2,2,0,0,0-2,2v4a2,2,0,0,1-2,2H17V19h2V14a2,2,0,0,1,2-2,2,2,0,0,1-2-2V5H17V3h2M12,15a1,1,0,1,1-1,1,1,1,0,0,1,1-1M8,15a1,1,0,1,1-1,1,1,1,0,0,1,1-1m8,0a1,1,0,1,1-1,1A1,1,0,0,1,16,15Z"></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Express",
        "GraphQL",
        "Rest API",
        "BullMQ",
      ],
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9DA2AF"
          strokeWidth={2}
        >
          <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      ),
    },
    {
      category: "Cloud",
      items: ["AWS", "Kubernetes", "Docker", "GitHub Actions"],
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9DA2AF"
          strokeWidth={2}
        >
          <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Zustand",
        "Vite",
      ],
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9DA2AF"
          strokeWidth={2}
        >
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-6 px-6">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left">
            Core Skills
          </h3>
          <div className="h-px w-full bg-gray-300 mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <div className="flex items-center space-x-2 mb-2">
                {skillGroup.icon}
                <h4 className="text-sm font-medium">{skillGroup.category}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((skill) => (
                  <Chip key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
