import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "w-full max-w-[400px]",
          card: "bg-surface border border-border-default shadow-none rounded-3xl",
          headerTitle: "text-text-primary",
          headerSubtitle: "text-text-secondary",
          socialButtonsBlockButton: "bg-base border border-border-default hover:bg-subtle text-text-primary transition-colors",
          socialButtonsBlockButtonText: "text-text-primary font-medium",
          dividerLine: "bg-border-default",
          dividerText: "text-text-faint",
          formFieldLabel: "text-text-secondary",
          formFieldInput: "bg-base border-border-subtle text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary rounded-xl",
          formButtonPrimary: "bg-accent-primary hover:bg-accent-primary/90 text-bg-base font-bold rounded-xl transition-colors",
          footerActionText: "text-text-muted",
          footerActionLink: "text-accent-primary hover:text-accent-primary/80 font-medium transition-colors",
          identityPreviewText: "text-text-primary",
          identityPreviewEditButtonIcon: "text-accent-primary",
        },
      }}
    />
  );
}
