// components/AnimatedServicesHeading.tsx
"use client";

import { HandWrittenTitle } from "@/components/ui/hand-writing-text";

export function AnimatedServicesHeading() {
  return (
    <div className="mb-6 text-center">
      <HandWrittenTitle
        title="Services we can help with"
        words={[
          "Services we can help with",
          "Interior painting",
          "TV & art mounting",
          "Furniture assembly",
          "Gazebo installation",
        ]}
        subtitle="Interior painting, TV & art mounting, furniture assembly and gazebo installation in Orange County."
      />
    </div>
  );
}
