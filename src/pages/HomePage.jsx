import React from 'react';
import Hero from '../components/sections/Hero';
import FeaturedWork from '../components/sections/FeaturedWork';
import LiveModule from '../components/sections/LiveModule';
import Method from '../components/sections/Method';
import Converge from '../components/sections/Converge';
import projectsData from '../data/projects.json';

/**
 * Home — one continuous scroll in five acts (VisualSystem.md §4):
 *   1 Hero · 2 Proof/Work · 3 Live · 4 Method · 5 Converge
 * The tensor field (App.jsx) reads scroll progress and cools from turbulence
 * to convergence across these sections.
 */
const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedWork projects={projectsData} />
            <LiveModule />
            <Method />
            <Converge />
        </>
    );
};

export default HomePage;
