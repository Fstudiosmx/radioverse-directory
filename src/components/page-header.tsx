type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2 px-4 sm:px-0">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
