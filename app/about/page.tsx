export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <p className="text-sm uppercase tracking-[0.35em] text-walnut">About the Brand</p>
      <h1 className="mt-3 text-5xl text-ink">A premium furniture story for upper-middle class Indian homes</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-float">
          <h2 className="text-2xl font-semibold text-ink">Brand positioning</h2>
          <p className="mt-4 leading-8 text-black/65">
            WOODNEST stands for luxury, comfort, and modern living. The store language
            is tuned for new homeowners, interior-conscious families, and buyers who want
            customization without losing trust or convenience.
          </p>
        </section>
        <section className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-float">
          <h2 className="text-2xl font-semibold text-ink">Launch roadmap</h2>
          <p className="mt-4 leading-8 text-black/65">
            Month 1 focuses on UI, merchandising, and content. Month 2 adds cart, checkout,
            account flows, and integrations. Month 3 hardens analytics, QA, SEO, and launch campaigns.
          </p>
        </section>
      </div>
    </main>
  );
}
