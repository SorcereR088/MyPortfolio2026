import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import SGraphic from "./SGraphic";
import LandingContent from "./LandingContent";

export default function Landing() {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate -mt-[68px] min-h-[708px] overflow-hidden bg-background pt-[68px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[700px] max-lg:-right-[140px] max-sm:-right-[260px] max-sm:opacity-40"
      >
        <SGraphic className="h-full w-full" />
      </div>

      <div className="relative z-10 flex min-h-[640px] items-center border-b border-outline">
        <div className="flex w-full max-w-[640px] flex-col items-start">
          <LandingContent>
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowUpRight weight="regular" />}
            >
              View selected work
            </Button>
            <Button
              variant="secondary"
              size="md"
              rightIcon={<ArrowUpRight weight="regular" />}
            >
              About me
            </Button>
          </LandingContent>
        </div>
      </div>
    </section>
  );
}
