"use client";
import { Contact as ContactType } from "@/types";
import TextInput from "../atoms/TextInput";
import TextareaInput from "../atoms/TextareaInput";
import DropdownInput from "../atoms/DropdownInput";
import Button from "../atoms/Button";
import { useData } from "@/providers/DataProvider";
import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";

export default function ContactForm({ blok }: { blok: ContactType }) {
  const { datasourceObject } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    company_email: "",
    services: [],
    message: "",
  });

  const updateField = (
    field: keyof typeof formData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const options = datasourceObject.services.map((service) => ({
    label: service.name,
    value: service.value,
  })).sort((a, b) => a.label.localeCompare(b.label));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.full_name === "" ||
      formData.company_name === "" ||
      formData.company_email === "" ||
      formData.message === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.services.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    if (formData.message.length < 15) {
      alert("Please enter a message of at least 15 characters.");
      return;
    }
    const trimmedFormData = {
      full_name: formData.full_name.trim(),
      company_name: formData.company_name.trim(),
      company_email: formData.company_email.trim(),
      services: formData.services,
      message: formData.message.trim(),
    };
    setIsSubmitting(true);

    // TODO: SEND DATA TO BACKEND API
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedFormData),
      });

      if (response.ok) {
        setFormData({
          full_name: "",
          company_name: "",
          company_email: "",
          services: [],
          message: "",
        });
        alert("Thank you for contacting us! We will get back to you shortly.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsSubmitting(false);
  };
  return (
    <div
      {...storyblokEditable(blok as any)}
      className="col-span-full flex flex-col items-center px-4! py-18!"
    >
      <div className="flex w-full max-w-2xl flex-col gap-8 py-8">
        <div className="text-center">
          <h3 className="typo-h3">{blok.title}</h3>
          <p className="">{blok.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <TextInput
              id="full_name"
              placeholder={blok.placeholderName}
              value={formData.full_name}
              name="full_name"
              autoComplete="name"
              minLength={2}
              required
              onChange={(e) => updateField("full_name", e.target.value)}
            />
            <TextInput
              id="company_name"
              placeholder={blok.placeholderCompany}
              value={formData.company_name}
              name="company_name"
              minLength={2}
              autoComplete="organization"
              required
              onChange={(e) => updateField("company_name", e.target.value)}
            />
            <div className="flex flex-col gap-4 sm:flex-row">
              <TextInput
                id="company_email"
                placeholder={blok.placeholderEmail}
                type="email"
                value={formData.company_email}
                name="company_email"
                autoComplete="email"
                required
                onChange={(e) => updateField("company_email", e.target.value)}
              />
              <DropdownInput
                id="services"
                options={options}
                placeholder={blok.placeholderServices}
                value={formData.services}
                selectedOption={formData.services}
                setSetlectedOption={(values) => updateField("services", values)}
                name="services"
                required
              />
            </div>
            <TextareaInput
              id="message"
              placeholder={blok.placeholderMessage}
              value={formData.message}
              name="message"
              required
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center pt-4">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {blok.submitButtonLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
