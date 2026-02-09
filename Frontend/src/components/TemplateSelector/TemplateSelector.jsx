import React, { useState } from 'react';
import { useVideoStore } from '../../store/videoStore';

const TemplateSelector = () => {
    const { videoData, setVideoData } = useVideoStore();
    const [selectedTemplate, setSelectedTemplate] = useState('default');

    const handleSelect = (template) => {
        setSelectedTemplate(template);
        setVideoData({ ...videoData, template });
    };

    return (
        <div className='template-selector'>
            <h2>Select Template</h2>
            <button onClick={() => handleSelect('default')}>Default</button>
            <button onClick={() => handleSelect('cinematic')}>Cinematic</button>
            <button onClick={() => handleSelect('faceless')}>Faceless</button>
            <button onClick={() => handleSelect('vr_overlay')}>VR Overlay</button>
        </div>
    );
};

export default TemplateSelector;
