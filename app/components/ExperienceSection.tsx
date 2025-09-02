export const ExperienceSection = () => {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Alta AI",
      period: "01/2025 - 04/2025",
      highlights: [
        "Implemented optimizations, refactored code, and introduced improvements to enhance reliability, usability, and development velocity.",
        "Built and integrated AI-driven features using tools such as LangChain, Anthropic API and OpenAI SDK, contributing to the product’s core value proposition and enhancing user experiences,including designing prompts and automations for AI models.",
        "Collaborated closely with product, design, and sales teams in both on-site and remote settings to deliver polished, scalable solutions with significant business impact in a fast-paced startup environment.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "J6 & Cyber Defense Directorate, IDF",
      period: "08/2022 - 11/2024",
      highlights: [
        "Served as a hands-on tech Lead for a team of 8 developers.",
        "Played a key role in the development of highly sensitive and complex products from ideation to production.",
        "Developed from scratch an ETL-driven C4I system with a map-based UI, enabled real-time visualization of C4I data for enhanced military decision-making. used by 100+ military units.",
      ],
    },
  ];

  return (
    <div className="py-6 px-6">
      <div className="space-y-4 max-w-2xl mx-auto">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left">
            Experience
          </h3>
          <div className="h-px w-full bg-gray-300 mt-2" />
        </div>

        <div className="space-y-5">
          {experiences.map((exp) => (
            <div key={exp.company} className="relative">
              <div className="relative pl-4 border-l-2 border-gray-300">
                <div className="absolute -left-[6px] top-[8px] h-2.5 w-2.5 rounded-full bg-gray-400" />

                <div className="space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                      {exp.role}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-100">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{exp.company}</p>
                  <ul className="text-sm leading-relaxed list-disc list-inside">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index} className="flex">
                        <span className="mr-2 items-start">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
