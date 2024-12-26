import { AiOutlineClockCircle } from "react-icons/ai";
import { BsPiggyBank } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";
import { BoltIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";

const benefits = [
  {
    title: "Visual Workflow Builder",
    description:
      "Create complex automation workflows with our intuitive drag-and-drop interface. Connect different AI actions and customize their behavior visually.",
    icon: RiRobot2Line,
  },
  {
    title: "AI-Powered Content Generation",
    description:
      "Leverage advanced AI to automatically generate video captions, create engaging thumbnails, and produce content summaries.",
    icon: SparklesIcon,
  },
  {
    title: "Customizable Triggers",
    description:
      "Set up automated workflows that respond to various triggers. Schedule actions or respond to events in real-time.",
    icon: BoltIcon,
  },
  // Add more benefits...
];

export default function Benefits() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-tr from-teal-50 to-white opacity-30 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div
          className="absolute top-0 left-0 -translate-y-12 transform-gpu blur-3xl"
          aria-hidden="true"
        >
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-teal-100 to-teal-50 opacity-20" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="inline-block bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent pb-2">
              Why Choose Creator Stream?
            </span>
            <div className="mt-1 h-1 w-24 bg-gradient-to-r from-teal-600 to-teal-800 mx-auto rounded-full" />
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline your workflow with powerful automation tools designed for
            modern businesses
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                bg-gradient-to-b from-white to-teal-50/20"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl 
                  bg-gradient-to-br from-teal-500 to-teal-600 
                  group-hover:scale-110 transition-transform duration-300"
                >
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            className="inline-flex items-center px-6 py-3 rounded-full 
            bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold
            hover:from-teal-500 hover:to-teal-600 transition-all duration-300
            shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}
