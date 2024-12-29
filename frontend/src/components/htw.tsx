import Image from "next/image";
import HeroImg from "../../public/images/hero.png";
import CanvaImg from "../../public/images/canvas.png";
import TriggerImg from "../../public/images/trigger.png";
import ActionImg from "../../public/images/actions.png";
import { Button } from "./ui/button";
export default function HowItWorks() {
  return (
    <section className="mt-24 px-4 md:px-6 lg:px-8">
      <div className="mb-16 flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="max-w-[450px]">
          <span className="text-black-600 rounded-full px-4 py-1.5 text-sm font-medium border border-black-600">
            How It Works
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.2] text-gray-900">
            Built For Content Creators
          </h2>
        </div>
        <div>
          <p className="mt-4 font-medium text-[14px] max-w-[400px] leading-[22px]">
            CodeGuide makes creating project documentation easy with a simple,
            streamlined process that takes you from sign-up to downloading your
            docs in just a few steps.
          </p>
          <Button className="mt-4 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 py-4 px-6">
            Get Started
          </Button>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-24 mb-28">
        <div className="relative w-full md:w-auto">
          <Image
            src={HeroImg.src}
            width={400}
            height={300}
            className="rounded-[24px] z-10 shadow-xl w-full md:w-[400px] h-auto"
            alt="Quick sign-up process illustration"
          />
          <div
            className="w-full h-full absolute -top-2 -left-4 md:-top-6 md:-left-6 -z-10 
            bg-gradient-to-br from-teal-400 to-teal-600 rounded-[24px] opacity-90
            border-8 border-teal-500"
          ></div>
        </div>
        <div className="pl-0 md:pl-4 text-center md:text-left">
          <h2 className="text-[80px] md:text-[140px] font-bold text-teal opacity-20 leading-[0.75]">
            01
          </h2>
          <h3 className="text-[24px] md:text-[32px] font-bold tracking-tighter mb-4">
            Quick Sign-Up
          </h3>
          <p className="mt-4 font-medium text-[14px] max-w-[400px] leading-[22px]">
            Sign up effortlessly using your Google account for instant access to
            the CodeGuide dashboard. Our streamlined authentication process
            ensures a secure and quick setup, allowing you to start automating
            your workflows within seconds.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-24 mb-28">
        <div className="pl-0 md:pl-4 text-center md:text-left">
          <h2 className="text-[80px] md:text-[140px] font-bold text-teal opacity-20 leading-[0.75]">
            02
          </h2>
          <h3 className="text-[24px] md:text-[32px] font-bold tracking-tighter mb-4">
            Open Workflow Canvas
          </h3>
          <p className="mt-4 font-medium text-[14px] max-w-[400px] leading-[22px]">
            Open the Workflow Canvas to start designing your automation
            workflow. This intuitive interface allows you to drag and drop
            actions, set triggers, and customize each step to fit your needs.
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Image
            src={CanvaImg.src}
            width={400}
            height={300}
            className="rounded-[24px] z-10 shadow-xl w-full md:w-[400px] h-auto"
            alt="Workflow canvas interface"
          />
          <div
            className="w-full h-full absolute -top-2 -left-4 md:-top-6 md:-left-6 -z-10 
            bg-gradient-to-br from-teal-400 to-teal-600 rounded-[24px] opacity-90
            border-8 border-teal-500"
          ></div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-24 mb-28">
        <div className="relative w-full md:w-auto">
          <Image
            src={TriggerImg.src}
            width={400}
            height={300}
            className="rounded-[24px] z-10 shadow-xl w-full md:w-[400px] h-auto"
            alt="hero"
          />
          <div
            className="w-full h-full absolute -top-2 -left-4 md:-top-6 md:-left-6 -z-10 
            bg-gradient-to-br from-teal-400 to-teal-600 rounded-[24px] opacity-90
            border-8 border-teal-500"
          ></div>
        </div>
        <div className="pl-0 md:pl-4 text-center md:text-left">
          <h2 className="text-[80px] md:text-[140px] font-bold text-teal opacity-20 leading-[0.75]">
            03
          </h2>
          <h3 className="text-[24px] md:text-[32px] font-bold tracking-tighter mb-4">
            Select triggers
          </h3>
          <p className="mt-4 font-medium text-[14px] max-w-[400px] leading-[22px]">
            "Choose between pre-production and post-production triggers to
            automate your workflow. Pre-production triggers help prepare your
            content, while post-production triggers activate after content
            creation, giving you complete control over your automation
            pipeline."
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-24 mb-28">
        <div className="pl-0 md:pl-4 text-center md:text-left">
          <h2 className="text-[80px] md:text-[140px] font-bold text-teal opacity-20 leading-[0.75]">
            04
          </h2>
          <h3 className="text-[24px] md:text-[32px] font-bold tracking-tighter mb-4">
            Select Actions
          </h3>
          <p className="mt-4 font-medium text-[14px] max-w-[400px] leading-[22px]">
            "Configure powerful actions like automatic caption generation,
            thumbnail creation, and content summarization. Each action can be
            customized with specific parameters to match your exact needs and
            content requirements."
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Image
            src={ActionImg.src}
            width={400}
            height={300}
            className="rounded-[24px] z-10 shadow-xl w-full md:w-[400px] h-auto"
            alt="hero"
          />
          <div
            className="w-full h-full absolute -top-2 -left-4 md:-top-6 md:-left-6 -z-10 
            bg-gradient-to-br from-teal-400 to-teal-600 rounded-[24px] opacity-90
            border-8 border-teal-500"
          ></div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-24 mb-28">
        <div className="relative w-full md:w-auto">
          <Image
            src={HeroImg.src}
            width={400}
            height={300}
            className="rounded-[24px] z-10 shadow-xl w-full md:w-[400px] h-auto"
            alt="hero"
          />
          <div
            className="w-full h-full absolute -top-2 -left-4 md:-top-6 md:-left-6 -z-10 
            bg-gradient-to-br from-teal-400 to-teal-600 rounded-[24px] opacity-90
            border-8 border-teal-500"
          ></div>
        </div>
        <div className="pl-0 md:pl-4 text-center md:text-left">
          <h2 className="text-[80px] md:text-[140px] font-bold text-teal opacity-20 leading-[0.75]">
            05
          </h2>
          <h3 className="text-[24px] md:text-[32px] font-bold tracking-tighter mb-4">
            Run & Monitor
          </h3>
          <p className="mt-4 font-medium text-[14px] max-w-[400px] leading-[22px]">
            Launch your automated workflow and track its progress in real-time
            through our intuitive dashboard. Monitor task completion, view
            generated content, and receive notifications about your workflow's
            status.
          </p>
        </div>
      </div>
    </section>
  );
}
