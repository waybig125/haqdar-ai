import React from 'react';
import { SDGBadge } from "@/components/ui/SDGBadge";
import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-urdu text-xl font-bold text-primary">حق دار</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> for Code for Pakistan 2026
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SDGBadge variant="sdg16" />
            <SDGBadge variant="sdg10" />
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/waybig125/haqdar-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} HaqDar AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
