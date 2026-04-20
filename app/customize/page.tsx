import { SofaBuilder } from "@/components/sofa-builder";

export default function CustomizePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-walnut">Custom Sofa Builder</p>
        <h1 className="mt-3 text-5xl text-ink">Your signature differentiator, built as a premium guided flow</h1>
        <p className="mt-5 text-lg leading-8 text-black/65">
          This configurator models the shape, seats, fabric, color, finish, and dimension
          journey you described, with live quote feedback and a clear consultation CTA.
        </p>
      </div>

      <SofaBuilder />
    </main>
  );
}
