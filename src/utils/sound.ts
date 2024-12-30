// Sound utility for button clicks
export const playButtonSound = () => {
  const audio = new Audio('/sounds/pop.mp3');
  audio.volume = 0.3; // Subtle volume
  audio.play().catch(() => {}); // Ignore autoplay restrictions
};