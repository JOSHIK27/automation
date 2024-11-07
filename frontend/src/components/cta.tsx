"use client";
import { Button } from "./ui/button";

export default function CTA() {
  return (
    <div className="bg-gradient-to-b from-teal-500 to-teal-600 p-20 mx-2 mt-20 rounded-lg">
      <h1 className="text-4xl font-bold text-white text-center">
        Ready to automate?
      </h1>
      <p className="text-white text-center mt-4">
        Sign up for a free account and start automating your workflows today!
      </p>
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="bg-white text-teal-700 hover:bg-white hover:text-teal-700 py-4 px-8 rounded-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
