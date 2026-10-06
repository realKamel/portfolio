"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/** Copies the email to the clipboard and confirms inline. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked — the mailto link still works.
    }
  }, [email]);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="lg"
              onClick={copy}
              aria-label={copied ? "Email address copied" : "Copy email address"}
            />
          }
        >
          {copied ? <Check className="text-brand" /> : <Copy />}
          {copied ? "Copied" : "Copy email"}
        </TooltipTrigger>
        <TooltipContent>{email}</TooltipContent>
      </Tooltip>
      {/* Announce the async clipboard result to assistive tech. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
