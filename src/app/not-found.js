import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8 text-muted-foreground">
        <FileQuestion className="w-12 h-12" />
      </div>
      
      <h1 className="font-urdu text-5xl font-bold text-foreground mb-4">صفحہ نہیں ملا</h1>
      <p className="text-xl text-muted-foreground mb-8">404 - Page Not Found</p>
      
      <p className="text-foreground max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Button render={<Link href="/" />} size="lg" className="rounded-full px-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        واپس ہوم پیج پر جائیں (Go Home)
      </Button>
    </div>
  );
}
