import { AiOutlineClockCircle } from "react-icons/ai";
import { BsPiggyBank } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";

export default function Benifits() {
  return (
    <section className="mb-20">
      <h2 className="text-center text-4xl font-bold mb-8">Benefits</h2>
      <div className="mx-8 bg-gray-100 p-12 rounded-lg">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg">
            <AiOutlineClockCircle className="text-3xl text-black mr-2" />
            <h3 className="text-xl font-semibold">Time Saver</h3>

            <p className="text-gray-600 text-center">
              Automate your workflow and save countless hours. Let our
              automation handle repetitive tasks while you focus on what matters
              most.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg">
            <BsPiggyBank className="text-3xl text-black mr-2" />
            <h3 className="text-xl font-semibold">Cost Effective</h3>
            <p className="text-gray-600 text-center">
              Eliminate expensive freelancer fees. Our platform provides
              professional-grade automation at a fraction of the traditional
              cost.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg">
            <RiRobot2Line className="text-3xl text-black mr-2" />
            <h3 className="text-xl font-semibold">AI Powered</h3>
            <p className="text-gray-600 text-center">
              Leverage cutting-edge AI technology for intelligent,
              out-of-the-box solutions that adapt to your specific needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
