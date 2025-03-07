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
import CheckoutBtn from "./checkoutbtn";
import { Session } from "next-auth";

const PRICING_PLANS = {
  starter: {
    name: "Starter",
    price: "$0",
    period: "/ month",
    description: "Perfect for trying out our automation features",
    badgeColor: "bg-gray-100 text-black",
    checkColor: "text-black",
    features: [
      "5 workflow automations per month",
      "Basic AI content generation",
      "Standard video processing",
      "Community support",
    ],
  },
  premium: {
    name: "Pro",
    price: "$10",
    period: "/ month",
    description: "Perfect for professional content creators",
    badgeColor: "bg-white/20 text-white",
    checkColor: "text-white",
    features: [
      "Everything in Starter plan",
      "Unlimited workflow automations",
      "Advanced AI content generation",
      "Priority video processing",
      "Priority email & chat support",
      "Advanced analytics & reporting",
      "Multi-language caption generation",
    ],
  },
};

type PlanFeatureProps = {
  feature: string;
  checkColor: string;
};

const PlanFeature = ({ feature, checkColor }: PlanFeatureProps) => (
  <div className="flex items-center gap-2 mb-4">
    <FaCircleCheck className={checkColor} />
    <p>{feature}</p>
  </div>
);

type PricingCardProps = {
  plan: typeof PRICING_PLANS.starter | typeof PRICING_PLANS.premium;
  session: Session | null;
  isPremium?: boolean;
};

const PricingCard = ({ plan, session, isPremium }: PricingCardProps) => (
  <Card
    className={`py-10 px-10 rounded-3xl ${
      isPremium ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white" : ""
    }`}
  >
    <CardHeader>
      <div className="mb-4">
        <span
          className={`${plan.badgeColor} text-[12px] font-medium px-2.5 py-0.5 rounded`}
        >
          {plan.name}
        </span>
      </div>
      <CardTitle className="text-[64px]">
        {plan.price}
        <span
          className={`text-[16px] ${
            isPremium ? "text-gray-200" : "text-gray-500"
          }`}
        >
          {plan.period}
        </span>
      </CardTitle>
      <CardDescription className={isPremium ? "text-gray-200" : ""}>
        {plan.description}
      </CardDescription>
      <Separator className={`my-20 ${isPremium ? "bg-white/20" : ""}`} />
    </CardHeader>
    <CardContent>
      {plan.features.map((feature, index) => (
        <PlanFeature
          key={index}
          feature={feature}
          checkColor={plan.checkColor}
        />
      ))}
    </CardContent>
    <CardFooter>
      {isPremium && session ? (
        <CheckoutBtn price={2000} quantity={1} productName="Automation.ai" />
      ) : (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`w-full rounded-full py-4 ${
            isPremium
              ? "bg-gray-100 text-black hover:bg-white/80"
              : "bg-white text-black border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {isPremium && !session ? "Login to Checkout" : "Get Started"}
        </Button>
      )}
    </CardFooter>
  </Card>
);

export default function Pricing({ session }: { session: Session | null }) {
  return (
    <div id="pricing">
      <section className="mb-20">
        <h2 className="text-center text-4xl font-bold mb-8">Pricing</h2>
        <div className="flex px-4 gap-4 justify-center flex-wrap sm:gap-8 sm:px-0 items-center">
          <PricingCard plan={PRICING_PLANS.starter} session={session} />
          <PricingCard
            plan={PRICING_PLANS.premium}
            session={session}
            isPremium
          />
        </div>
      </section>
    </div>
  );
}
