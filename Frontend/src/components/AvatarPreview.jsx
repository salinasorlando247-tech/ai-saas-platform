import React from 'react';

const AvatarPreview = ({ avatarUrl }) => (
    <div className="avatar-preview">
        {avatarUrl ? <img src={avatarUrl} alt="AI Avatar" /> : <p>No avatar yet</p>}
    </div>
);

export default AvatarPreview;
