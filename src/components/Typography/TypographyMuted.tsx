export function TypographyMuted({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm text-muted-foreground lg:text-base">
      {children}
    </span>
  );
}
