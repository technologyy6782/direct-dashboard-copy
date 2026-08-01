// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { DemoTestModeProvider } from "@/contexts/DemoTestModeContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SecurityProvider } from "@/contexts/SecurityContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { GlobalRealtimeProvider } from "@/providers/GlobalRealtimeProvider";

export const Route = createFileRoute("/probe")({ ssr: false, component: Probe });

const qc = new QueryClient();

function M({ id }) { return <div>OK_{id}</div>; }

function Probe() {
  return (
    <div>
      <Suspense fallback={<div>F1</div>}><QueryClientProvider client={qc}><M id="query" /></QueryClientProvider></Suspense>
      <Suspense fallback={<div>F2</div>}><QueryClientProvider client={qc}><AuthProvider><M id="auth" /></AuthProvider></QueryClientProvider></Suspense>
      <Suspense fallback={<div>F3</div>}><DemoTestModeProvider><M id="demo" /></DemoTestModeProvider></Suspense>
      <Suspense fallback={<div>F4</div>}><AnimationProvider><M id="anim" /></AnimationProvider></Suspense>
      <Suspense fallback={<div>F5</div>}><TooltipProvider><M id="tooltip" /></TooltipProvider></Suspense>
      <Suspense fallback={<div>F6</div>}><SecurityProvider><M id="security" /></SecurityProvider></Suspense>
      <Suspense fallback={<div>F7</div>}><NotificationProvider><M id="notif" /></NotificationProvider></Suspense>
      <Suspense fallback={<div>F8</div>}><TranslationProvider><M id="trans" /></TranslationProvider></Suspense>
      <Suspense fallback={<div>F9</div>}><QueryClientProvider client={qc}><GlobalRealtimeProvider><M id="realtime" /></GlobalRealtimeProvider></QueryClientProvider></Suspense>
    </div>
  );
}
