import create from 'zustand';

export const useVideoStore = create((set) => ({
    videoData: { title: '', template: 'default', clips: [], avatar: null, vrOverlay: null },
    setVideoData: (data) => set({ videoData: data })
}));
