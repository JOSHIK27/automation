"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { FaCircleCheck } from "react-icons/fa6";

export default function Pricing() {
  return (
    <section className="mb-20">
      <h2 className="text-center text-4xl font-bold mb-8">Pricing</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mx-4 sm:mx-60">
        <Card className="p-8">
          <CardHeader>
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Starter
              </span>
            </div>
            <CardTitle className="text-4xl">£0</CardTitle>
            <CardDescription>
              Perfect for beginners and small projects
            </CardDescription>
            <Separator className="my-20" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <FaCircleCheck className="text-black" />
              <p>Feature 1</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaCircleCheck className="text-black" />
              <p>Feature 2</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaCircleCheck className="text-black" />
              <p>Feature 3</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full rounded-full bg-white text-black border border-gray-300 hover:bg-gray-100 py-4"
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
        <Card className="p-8">
          <CardHeader>
            <div className="mb-4">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Premium
              </span>
            </div>
            <CardTitle className="text-4xl">
              £20 <span className="text-sm text-gray-500">/ month</span>
            </CardTitle>
            <CardDescription>
              Perfect for professional content creators
            </CardDescription>
            <Separator className="my-20" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <FaCircleCheck className="text-black" />
              <p>Feature 1</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaCircleCheck className="text-black" />
              <p>Feature 2</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaCircleCheck className="text-black" />
              <p>Feature 3</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full py-4">Purchase</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
