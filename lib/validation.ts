export type QuoteFormValues = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
};

export type QuoteFormErrors = Partial<Record<keyof QuoteFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name looks too short.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (values.phone.trim().replace(/[^0-9]/g, "").length < 7) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.projectType) {
    errors.projectType = "Please select a project type.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us a little about your project.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a few more details (10 characters minimum).";
  }

  return errors;
}
