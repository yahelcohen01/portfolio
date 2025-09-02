"use client";
import { ProfileSection } from "./components/ProfileSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { CertificatesSection } from "./components/CertificatesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Secret } from "./components/Secret";
import { ToggleThemeButton } from "./components/ToggleThemeButton";

export default function MinimalistPortfolio() {
  return (
    <main className="min-h-screen md:h-screen flex flex-col pb-16 sm:pb-0">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 min-h-0">
        {/* Left Column: Profile */}
        <div className="relative md:col-span-2 border-b md:border-b-0 md:border-r border-gray-300 md:flex md:items-center">
          <ToggleThemeButton />
          <ProfileSection />
          <Secret />
        </div>

        {/* Right Column: Skills and Experience */}
        <div className="md:col-span-3 flex flex-col min-h-0">
          {/* This is the scroll container */}
          <div className="overflow-y-auto h-full">
            <div className="p-6">
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <CertificatesSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
