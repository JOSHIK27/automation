import { AiOutlineClockCircle } from "react-icons/ai";
import { BsPiggyBank } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";

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
            <div className="relative p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                <AiOutlineClockCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Time Saver
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Automate repetitive tasks and save countless hours. Focus on
                strategic work while our AI handles the routine operations.
              </p>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                <BsPiggyBank className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Cost Effective
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Reduce operational costs by automating manual processes. Get
                enterprise-grade automation at a fraction of traditional costs.
              </p>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                <RiRobot2Line className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                AI Powered
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Leverage cutting-edge AI technology for intelligent automation
                that adapts to your specific business needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
