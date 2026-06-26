import { 
    SiNextdotjs, SiTailwindcss, SiSpringboot, SiPostgresql, 
    SiReact, SiDocker, SiTypescript, SiMysql, SiJunit5 
} from 'react-icons/si';
import { FaJava, FaNodeJs, FaGitAlt, FaReact } from 'react-icons/fa';
import { JSX } from 'react';

export const IconMap: Record<string, JSX.Element> = {
    "SiNextdotjs": <SiNextdotjs size={16} />,
    "SiTailwindcss": <SiTailwindcss size={16} />,
    "SiSpringboot": <SiSpringboot size={16} />,
    "SiPostgresql": <SiPostgresql size={16} />,
    "SiReact": <SiReact size={16} />,
    "SiTypescript": <SiTypescript size={16} />,
    "SiDocker": <SiDocker size={16} />,
    "SiMysql": <SiMysql size={16} />,
    "SiJunit5": <SiJunit5 size={16} />,
    "FaJava": <FaJava size={16} />,
    "FaNodeJs": <FaNodeJs size={16} />,
    "FaGitAlt": <FaGitAlt size={16} />,
    "FaReact": <FaReact size={16} />
};
