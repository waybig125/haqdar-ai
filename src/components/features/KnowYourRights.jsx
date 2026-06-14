"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { ShieldAlert, Camera, ArrowRightCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function KnowYourRights({ result }) {
  if (!result) return null;

  return (
    <AnimatedContainer variant="fadeUp" className="w-full max-w-6xl mx-auto px-4 pb-24">
      
      <div className="mb-8 text-center flex flex-col items-center gap-1.5">
        <h2 className="font-urdu text-4xl font-bold text-foreground leading-normal" dir="rtl">اپنے حقوق جانیں</h2>
        <p className="text-muted-foreground text-sm font-inter mt-1">Know your rights and next steps</p>
      </div>

      <Tabs defaultValue="rights" className="w-full" dir="rtl">
        
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50 rounded-xl mb-6">
          <TabsTrigger value="rights" className="font-urdu text-[11px] sm:text-base md:text-lg py-2.5 sm:py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 sm:ml-2 hidden sm:inline-block" />
            <span>آپ کے حقوق</span>
          </TabsTrigger>
          <TabsTrigger value="evidence" className="font-urdu text-[11px] sm:text-base md:text-lg py-2.5 sm:py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center justify-center">
            <Camera className="w-4 h-4 sm:ml-2 hidden sm:inline-block" />
            <span>ثبوت جمع کریں</span>
          </TabsTrigger>
          <TabsTrigger value="steps" className="font-urdu text-[11px] sm:text-base md:text-lg py-2.5 sm:py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center justify-center">
            <ArrowRightCircle className="w-4 h-4 sm:ml-2 hidden sm:inline-block" />
            <span>اگلے اقدامات</span>
          </TabsTrigger>
        </TabsList>

        <Card className="border-border/50 shadow-md">
          <CardContent className="p-6 md:p-8 h-[280px] md:h-[300px] overflow-y-auto relative pr-6 pl-8">
            
            <TabsContent value="rights" className="mt-0 outline-none">
              <h3 className="font-urdu text-2xl font-bold text-primary mb-4">قانون آپ کو کیا حق دیتا ہے؟</h3>
              <p className="font-urdu text-xl leading-[2.4] text-foreground">
                {result.citizen_rights}
              </p>
            </TabsContent>
 
            <TabsContent value="evidence" className="mt-0 outline-none">
              <h3 className="font-urdu text-2xl font-bold text-primary mb-4">شکایت سے پہلے کیا ثبوت درکار ہے؟</h3>
              {Array.isArray(result.evidence_to_collect) ? (
                <ul className="space-y-4 font-urdu text-xl text-foreground">
                  {result.evidence_to_collect.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-inter font-bold text-sm mt-2">
                        ✓
                      </span>
                      <span className="leading-[2.4] pt-1">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-urdu text-xl leading-[2.4] text-foreground">
                  {result.evidence_to_collect}
                </p>
              )}
            </TabsContent>
 
            <TabsContent value="steps" className="mt-0 outline-none">
              <h3 className="font-urdu text-2xl font-bold text-primary mb-4">اب آپ کو کیا کرنا چاہیے؟</h3>
              <ul className="space-y-4 font-urdu text-xl text-foreground">
                {result.next_steps?.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-inter font-bold text-sm mt-2">
                      {index + 1}
                    </span>
                    <span className="leading-[2.4] pt-1">{step}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

          </CardContent>
        </Card>

      </Tabs>
    </AnimatedContainer>
  );
}
