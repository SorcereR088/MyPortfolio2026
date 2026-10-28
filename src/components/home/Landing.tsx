import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import SGraphic from "./SGraphic";

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
          <h1 className="max-w-[620px] text-heading-h1 font-bold tracking-[-0.03em] text-text-primary max-sm:text-heading-h3">
            <span className="block">
              Designing <span className="text-highlight">products</span>
            </span>
            <span className="block">that feel right on every</span>
            <span className="block">
              <span className="mr-2 inline-flex h-[52px] w-[80px] items-center justify-center rounded-full bg-primary align-middle">
                <span
                  aria-hidden="true"
                  className="h-9 w-6 rounded-[3px] border-2 border-on-primary bg-on-primary"
                />
              </span>
              screen.
            </span>
          </h1>

          <p className="mt-12 max-w-[470px] text-body-1 text-text-secondary">
            5+ years of hands-on experience in graphic design and UI/UX. I bring visual craft and
            product thinking to everything I build, no second-guessing.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}