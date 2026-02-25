interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <section className="pt-32 pb-16 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="honey-gradient w-full h-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-cream">
          {title}
        </h1>
        {subtitle && (
          <p className="text-cream/80 font-body text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
