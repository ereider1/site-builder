"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import { starterTemplatesRegistry } from "@/lib/templatesRegistry";
import { populateProject, UserContent } from "@/lib/contentSlots";
import Link from "next/link";
import { LayoutGrid, ArrowLeft, ArrowRight, Sparkles, Check, Upload, X, HelpCircle } from "lucide-react";

type WizardStep = 0 | 1 | 2 | 3; // 01 Design, 02 Business, 03 Assets, 04 Review

export default function WizardPage() {
  const router = useRouter();
  const { cloneTemplate, setProject } = useBuilderStore();

  const [step, setStep] = useState<WizardStep>(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("professional-services-modern");

  // Form State: Business Information
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Form State: Brand Assets (stored as Base64 strings for local persistence)
  const [logo, setLogo] = useState<string>("");
  const [heroImage, setHeroImage] = useState<string>("");
  const [aboutImage, setAboutImage] = useState<string>("");
  const [featuredWorkImage, setFeaturedWorkImage] = useState<string>("");

  // Validation States
  const [emailError, setEmailError] = useState("");

  // File Upload Helper to convert images to local Base64 URLs
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size or image type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    // Basic email validation if step is 1
    if (step === 1 && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      setEmailError("");
    }
    
    if (step < 3) {
      setStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleCreateWebsite = () => {
    // Clone and populate project index on completion
    const newProjectId = cloneTemplate(selectedTemplateId);
    if (!newProjectId) return;

    const currentClonedProject = useBuilderStore.getState().project;
    if (!currentClonedProject) return;

    const userContent: UserContent = {
      business: {
        businessName: businessName.trim() || undefined,
        tagline: tagline.trim() || undefined,
        description: description.trim() || undefined,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        country: country.trim() || undefined,
      },
      brand: {
        logo: logo || undefined,
        heroImage: heroImage || undefined,
        aboutImage: aboutImage || undefined,
        featuredWorkImage: featuredWorkImage || undefined,
      },
    };

    // Populate using deterministic contentSlots merger
    const populated = populateProject(currentClonedProject, userContent);
    setProject(populated, true);
    
    router.push(`/editor?id=${newProjectId}`);
  };

  const currentTemplate = starterTemplatesRegistry.find((t) => t.id === selectedTemplateId);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-700 font-sans antialiased flex flex-col justify-between select-none">
      {/* Top Wizard Steps Bar */}
      <header className="h-14 border-b border-stone-200 bg-white shadow-sm flex items-center justify-between px-8 z-10">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Exit
        </Link>

        {/* Steps Indices Indicator */}
        <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          {[
            { stepIdx: 0, label: "Design" },
            { stepIdx: 1, label: "Profile" },
            { stepIdx: 2, label: "Assets" },
            { stepIdx: 3, label: "Review" },
          ].map((item) => (
            <div
              key={item.stepIdx}
              className={`flex items-center gap-2 ${
                step === item.stepIdx
                  ? "text-indigo-600"
                  : step > item.stepIdx
                  ? "text-stone-400"
                  : "text-stone-300"
              }`}
            >
              <span
                className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] border ${
                  step === item.stepIdx
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600 font-bold"
                    : step > item.stepIdx
                    ? "border-stone-400 bg-stone-100 text-stone-500"
                    : "border-stone-200 bg-transparent text-stone-300"
                }`}
              >
                {step > item.stepIdx ? "✓" : item.stepIdx + 1}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>

        <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Wizard
        </span>
      </header>

      {/* Main Wizard Form Steps */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 md:py-16 flex flex-col justify-center">
        
        {/* STEP 0: CHOOSE DESIGN */}
        {step === 0 && currentTemplate && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900">Choose your starter layout.</h1>
              <p className="text-xs text-stone-500">
                Select from our library of beautiful, frozen predefined designs.
              </p>
            </div>

            <div className="border border-stone-200 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[16/10] bg-stone-100 relative overflow-hidden border-b border-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentTemplate.previewImage}
                  alt={currentTemplate.name}
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-stone-900 tracking-tight">{currentTemplate.name}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{currentTemplate.description}</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    Use This Design
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: BUSINESS PROFILE FORM */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900">Tell us about your business.</h1>
              <p className="text-xs text-stone-500">
                All fields are optional. Leave fields blank to keep default template copy.
              </p>
            </div>

            <div className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-md">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center justify-between">
                  Business Name
                  <span className="text-[10px] text-stone-400 font-normal">The name visitors will see on your website.</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Harbor & Co."
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center justify-between">
                  Tagline
                  <span className="text-[10px] text-stone-400 font-normal">A short statement that describes your business.</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clarity for what's next."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center justify-between">
                  Description
                  <span className="text-[10px] text-stone-400 font-normal">A brief description of what you do.</span>
                </label>
                <textarea
                  placeholder="We help growing businesses turn complex challenges..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="e.g. hello@harbor.example"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  {emailError && <p className="text-red-500 text-[10px] mt-1">{emailError}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +1 555 010 2040"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="e.g. 120 Market Street"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-white border border-stone-200 hover:bg-stone-50 font-semibold text-xs text-stone-600 rounded-lg transition-all shadow-sm"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white rounded-lg transition-all flex items-center gap-1 shadow-md"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BRAND ASSETS */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900">Upload your brand assets.</h1>
              <p className="text-xs text-stone-500">
                Optional. If you leave these blank, we will keep the original template's beautiful imagery and brand representations intact.
              </p>
            </div>

            <div className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-md">
              {[
                { label: "Company Logo", state: logo, setter: setLogo, desc: "A text logo or favicon mark." },
                { label: "Hero Banner Image", state: heroImage, setter: setHeroImage, desc: "The main background/column photo at the top." },
                { label: "About Section Photo", state: aboutImage, setter: setAboutImage, desc: "The environmental photo beside your story." },
                { label: "Featured Work Photo", state: featuredWorkImage, setter: setFeaturedWorkImage, desc: "Large visual case-study representing completed project." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-stone-50 border border-stone-150 rounded-lg flex items-center justify-between gap-4">
                  <div className="space-y-0.5 max-w-[280px]">
                    <span className="block text-xs font-semibold text-stone-800">{item.label}</span>
                    <span className="block text-[10px] text-stone-400 leading-snug">{item.desc}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.state ? (
                      <div className="relative h-12 w-12 border border-stone-200 rounded overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.state} alt="Asset preview" className="h-full w-full object-cover" />
                        <button
                          onClick={() => item.setter("")}
                          className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer h-10 w-10 bg-white border border-stone-200 rounded flex items-center justify-center hover:bg-stone-50 transition-colors shadow-sm">
                        <Upload className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, item.setter)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-white border border-stone-200 hover:bg-stone-50 font-semibold text-xs text-stone-600 rounded-lg transition-all shadow-sm"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white rounded-lg transition-all flex items-center gap-1 shadow-md"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & CREATE WEBSITE */}
        {step === 3 && currentTemplate && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900">Review your website.</h1>
              <p className="text-xs text-stone-500">
                You are ready to create! Your website design, business profile, and brand media assets are compiled below.
              </p>
            </div>

            <div className="space-y-4 bg-white border border-stone-200 p-6 rounded-xl shadow-md text-xs">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-b border-stone-100 pb-4">
                <div>
                  <span className="block text-stone-400 mb-0.5">Selected Design</span>
                  <span className="block text-stone-900 font-bold">{currentTemplate.name}</span>
                </div>
                <div>
                  <span className="block text-stone-400 mb-0.5">Business Name</span>
                  <span className="block text-stone-900 font-bold truncate max-w-[200px]">{businessName || "Untitled Website (Fallback)"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-b border-stone-100 pb-4">
                <div>
                  <span className="block text-stone-400 mb-0.5">Tagline Statement</span>
                  <span className="block text-stone-900 font-medium italic truncate max-w-[200px]">
                    {tagline || "Built-in fallback: Build a business ready..."}
                  </span>
                </div>
                <div>
                  <span className="block text-stone-400 mb-0.5">Custom Media Loaded</span>
                  <span className="block text-stone-900 font-semibold">
                    {[(logo && "Logo"), (heroImage && "Hero"), (aboutImage && "About"), (featuredWorkImage && "Work")].filter(Boolean).join(", ") || "None (Using Template Defaults)"}
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-stone-400 mb-0.5">Full Corporate Description</span>
                <p className="block text-stone-600 leading-relaxed text-balance">
                  {description || "No description supplied. Keeping original high-end Northstar Studio intro."}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleBack}
                className="py-2 px-4 bg-white border border-stone-200 hover:bg-stone-50 font-semibold text-xs text-stone-600 rounded-lg transition-all shadow-sm"
              >
                Back
              </button>
              <button
                onClick={handleCreateWebsite}
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded-lg shadow-lg transition-all flex items-center gap-1.5"
              >
                Create Website
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
