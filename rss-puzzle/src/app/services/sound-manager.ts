class SoundManager {
  static playClickSound() {
    const clickSound = document.querySelector(
      '.game__audio'
    ) as HTMLAudioElement;
    if (clickSound) {
      clickSound.play();
    }
  }
}

export default SoundManager;
