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
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Why Choose Creator Stream?
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
                className="relative p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
