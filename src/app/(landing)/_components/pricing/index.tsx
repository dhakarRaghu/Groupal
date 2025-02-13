import BackdropGradient from "@/components/global/backdrop-gradient";
import GradientText from "@/components/gradient-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

type Props = {};

export const PricingSection = (props: Props) => {
  return (
    <section className="w-full pt-20 pb-24 flex flex-col items-center text-center px-4 relative space-y-10" id="pricing">
      {/* Background Gradient */}
      <BackdropGradient className="absolute inset-0 w-full h-full opacity-40 z-[-1]" />

      {/* Title Section - Centered */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-3xl">
        <GradientText className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight" element="H2">
          Pricing Plans That Fit Your Needs
        </GradientText>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl text-balance leading-relaxed">
          Groupal is a vibrant online community platform that empowers people to connect, collaborate, and cultivate meaningful relationships.
        </p>
      </div>

      {/* Pricing Card - Positioned Below the Text */}
      <div className="mt-12 flex justify-center w-full">
        <Card className="p-7 max-w-md w-full bg-themeBlack border-themeGray shadow-lg rounded-2xl">
          <CardContent className="flex flex-col gap-6">
            {/* Pricing Header */}
            <div className="text-center">
              <CardTitle className="text-black text-3xl font-bold">$99/m</CardTitle>
              <CardDescription className="text-[#B4B0AE] text-lg">
                Great if you're just getting started
              </CardDescription>
            </div>

            {/* Features List (Inside Pricing Card) */}
            <div className="flex flex-col text-[#B4B0AE] space-y-3">
              <p className="text-lg font-semibold text-white">Features</p>
              <div className="grid gap-3 text-base">
                {["Feature number 1", "Feature number 2", "Feature number 3", "Feature number 4"].map((feature, index) => (
                  <span key={index} className="flex gap-2 items-center">
                    <Check className="text-green-400" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a href="#" className="w-full">
              <Button
                variant="default"
                className="bg-[#333337] w-full rounded-2xl text-white hover:bg-white hover:text-[#333337] transition-all"
              >
                Start for free
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
