import HeroVideoDialog from "./hero-video-dialog";
import thumbnail from "../../../public/images/thumbnail.png";

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative mx-4 mt-4 sm:mx-20">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/P95eytSbC7Y"
        thumbnailSrc={thumbnail.src}
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/P95eytSbC7Y"
        thumbnailSrc={thumbnail.src}
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
