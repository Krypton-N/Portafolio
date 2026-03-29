import React from 'react';
import Hero from '../components/sections/Hero';
import TechStack from '../components/sections/TechStack';
import ProjectsGallery from '../components/sections/ProjectsGallery';
import AboutTimeline from '../components/sections/AboutTimeline';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';

const HomePage = () => {
    return (
        <>
            <Hero />
            <TechStack skills={skillsData} />
            <ProjectsGallery projects={projectsData} />
            <AboutTimeline />
        </>
    );
};

export default HomePage;
