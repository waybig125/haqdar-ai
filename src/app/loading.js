export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          {/* Inner spinner */}
          <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          {/* Center dot */}
          <div className="absolute w-4 h-4 rounded-full bg-primary" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="font-urdu text-2xl font-bold text-primary animate-pulse">حق دار</h2>
          <p className="text-muted-foreground font-medium text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    </div>
  );
}
