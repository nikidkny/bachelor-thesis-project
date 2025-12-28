"use client";
import { ContactForm as ContactFormType } from "@/types";
import TextInput from "../atoms/TextInput";
import TextareaInput from "../atoms/TextareaInput";
import DropdownInput from "../atoms/DropdownInput";
import Button from "../atoms/Button";
import { useData } from "@/providers/DataProvider";
import { useState } from "react";

export default function ContactForm({ blok }: { blok: ContactFormType }) {
  const { datasourceObject } = useData();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    service: "",
    message: "",
  });

  // console.log(blok.placeholderServices)
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const options = datasourceObject.services.map((service) => ({
    label: service.name,
    value: service.value,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement form submission logic

    const submissionData = {
      ...formData,
    };

    // TODO: ADD VALIDATION 
    // TODO: SEND DATA TO BACKEND API
    
  };
  return (
    <div className="col-span-full flex flex-col items-center">
      <div className="flex w-full max-w-2xl flex-col gap-8 py-8">
        <div className="text-center">
          <h3 className="typo-h3">{blok.title}</h3>
          <p className="">{blok.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <TextInput
              id="name"
              placeholder={blok.placeholderName}
              value={formData.name}
              name="name"
              autoComplete="name"
              required
              onChange={(e) => updateField("name", e.target.value)}
            />
            <TextInput
              id="company"
              placeholder={blok.placeholderCompany}
              value={formData.company}
              name="company"
              autoComplete="organization"
              required
              onChange={(e) => updateField("company", e.target.value)}
            />
            <TextInput
              id="email"
              placeholder={blok.placeholderEmail}
              type="email"
              value={formData.email}
              name="email"
              autoComplete="email"
              required
              onChange={(e) => updateField("email", e.target.value)}
            />
            <DropdownInput
              id="service"
              options={options}
              placeholder={blok.placeholderServices}
              value={formData.service}
              name="service"
              required
              onChange={(e) => updateField("service", e.target.value)}
            />
            <TextareaInput
              id="message"
              placeholder={blok.placeholderMessage}
              value={formData.message}
              name="message"
              required
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            {blok.submitButtonLabel}
          </Button>
        </form>
      </div>
    </div>
  );
}
