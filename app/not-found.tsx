import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">404</span>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. The page you&apos;re looking for
        doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href="/">Back to Homepage</Button>
        <Button href="/contact" variant="outline">
          Contact Us
        </Button>
      </div>
    </Container>
  );
}
