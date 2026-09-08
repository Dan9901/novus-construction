"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { validateQuoteForm, type QuoteFormErrors, type QuoteFormValues } from "@/lib/validation";
import { services } from "@/data/services";

const budgetOptions = [
  "Under €10,000",
  "€10,000 – €25,000",
  "€25,000 – €50,000",
  "€50,000 – €100,000",
  "€100,000+",
  "Not sure yet",
];

const initialValues: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

function inputClass(hasError: boolean) {
  return cn(
    "w-full border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/30",
    hasError ? "border-red-500" : "border-border focus:border-accent"
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-soft">
        {label}{" "}
        {required ? (
          <span className="text-accent">*</span>
        ) : (
          <span className="text-muted normal-case tracking-normal">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<QuoteFormValues>(initialValues);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // honeypot — real users never see or fill this

  const handleChange =
    (field: keyof QuoteFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateQuoteForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors) setErrors(data.errors);
        setErrorMessage(data?.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setErrorMessage("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="border border-accent bg-accent-tint/50 p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">Request Received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground-soft">
          Thanks for reaching out — your request has been sent to Novus Construction. We&apos;ll be
          in touch as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-dark"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-6">
      <div
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden whitespace-nowrap"
        style={{ clip: "rect(0 0 0 0)" }}
      >
        <label htmlFor="website">Leave this field blank</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field label="Email Address" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>

        <Field label="Project Type" htmlFor="projectType" error={errors.projectType} required>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={handleChange("projectType")}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={inputClass(Boolean(errors.projectType))}
          >
            <option value="">Select a project type</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Project Location" htmlFor="location" error={errors.location}>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Town / County"
            autoComplete="address-level2"
            value={values.location}
            onChange={handleChange("location")}
            className={inputClass(Boolean(errors.location))}
          />
        </Field>

        <Field label="Estimated Budget" htmlFor="budget" error={errors.budget}>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={handleChange("budget")}
            className={inputClass(Boolean(errors.budget))}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tell Us About Your Project" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass(Boolean(errors.message))}
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {errorMessage || "Something went wrong submitting the form. Please try again."}
        </p>
      ) : null}

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          showArrow={status !== "submitting"}
          className="w-full justify-center sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending
            </>
          ) : (
            "Request a Quote"
          )}
        </Button>
      </div>
    </form>
  );
}
