import { POST } from "@/app/api/contact/route";
import { ContactFormDTO } from "@/types/ContactFormDTO";
import "@testing-library/jest-dom";

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [{ id: 0 }], error: null }),
    }),
  },
}));

jest.mock("@/lib/email/sendEmail", () => ({
  sendContactEmail: jest.fn().mockResolvedValue(true),
}));

describe("Contact API route", () => {
  const mockUserData: ContactFormDTO = {
    full_name: "John Doe",
    company_name: "Acme Corp",
    company_email: "test@test.com",
    services: ["web-design"],
    message: "This is a test message.",
  };
  it("it should submit successfully", async () => {
    const request = new Request("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockUserData),
    });
    const res = await POST(request);
    const body = await res.json();

    // console.log("Response body:", body);
    // Check that the response is as expected
    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([{ id: 0 }]);
  });
  it("it should fail validation for empty fields", async () => {
    const invalidData = { ...mockUserData, full_name: "" };
    // console.log("Testing with empty string:", invalidData);
    const request = new Request("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidData),
    });
    const res = await POST(request);
    const body = await res.json();

    // Check that the response is as expected
    expect(res.status).toBe(400);
    expect(body.success).toBeUndefined();
    expect(body.error).toBe("A required field is empty");
  });
  it("it should fail validation for missing fields", async () => {
    // test if a required field is missing
    const { full_name, ...invalidData } = mockUserData;
    // console.log("Testing with missing field:", invalidData);
    const request = new Request("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidData),
    });
    const res = await POST(request);
    const body = await res.json();

    // Check that the response is as expected
    expect(res.status).toBe(400);
    expect(body.success).toBeUndefined();
    expect(body.error).toBe("Missing field(s) from request body");
  });
  it("it should fail validation if the fields are not strings", async () => {
    const invalidData = {
      ...mockUserData,
      full_name: 123 as unknown as number,
    };
    // console.log("Testing with wrong type:", invalidData);
    const request = new Request("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidData),
    });
    const res = await POST(request);
    const body = await res.json();

    // Check that the response is as expected
    expect(res.status).toBe(400);
    expect(body.success).toBeUndefined();
    expect(body.error).toBe("Incorrect data type(s)");
  });
  it("it should fail validation if full_name has invalid characters", async () => {
    const invalidData = { ...mockUserData, full_name: "John123" };
    // console.log("Testing with invalid characters in full_name:", invalidData);
    const request = new Request("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidData),
    });
    const res = await POST(request);
    const body = await res.json();

    // Check that the response is as expected
    expect(res.status).toBe(400);
    expect(body.success).toBeUndefined();
    expect(body.error).toBe("full_name contains invalid characters");
  });
});
