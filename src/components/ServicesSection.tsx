import React, { useState } from 'react';

interface ServiceItem {
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: 'Brand Identity Design',
    description:
      'At CreedCreations, brand identity design is more than just visuals — it’s about building a personality your audience can instantly recognize and trust. We start by understanding your business goals, target audience, industry positioning, and long-term vision. Through research and strategic thinking, we craft a cohesive visual aidentity that reflects your values and differentiates you from competitors. Every color, font, and design element is chosen intentionally to communicate clarity, credibility, and consistency. From startups to established companies, we help brands look professional, memorable, and trustworthy across every platform.',
  },
  {
    title: 'Logo Design',
    description:
      'Your logo is the face of your business, and at CreedCreations, we design logos that are simple, impactful, and timeless. We focus on clarity, scalability, and brand relevance so your logo works perfectly across websites, packaging, social media, and print materials. Our design process includes research, concept development, refinement, and final delivery in professional formats. We ensure every logo reflects your brand values and leaves a strong first impression. A well-designed logo builds trust — and that’s exactly what we help you achieve.',
  },
  {
    title: 'Brand Strategy',
    description:
      'A strong brand starts with a clear strategy. At CreedCreations, we help businesses define their brand positioning, messaging, tone of voice, and target audience. Our brand strategy services are focused on building long-term growth and recognition. We analyze your competitors, market trends, and customer behavior to create a roadmap that guides all your marketing and design decisions. With a clear strategy in place, your brand communicates consistently, builds credibility, and attracts the right audience who truly connects with your business.',
  },
  {
    title: 'Brand Guidelines',
    description:
      'Consistency builds trust, and our brand guidelines ensure your brand always looks and feels professional. At CreedCreations, we create detailed brand guideline documents that define logo usage, color palettes, typography, spacing, imagery style, and communication tone. These guidelines help your internal team and partners maintain brand consistency across websites, social media, advertisements, and print materials. Clear brand guidelines prevent confusion and protect your brand identity as you grow, ensuring every touchpoint reflects your brand accurately and professionally.',
  },
  {
    title: 'Graphic Design',
    description:
      'Great design communicates clearly and visually. At CreedCreations, we provide professional graphic design services tailored to your marketing needs. From social media creatives to digital ads and promotional graphics, we design visuals that grab attention and drive engagement. Our focus is on clean layouts, strategic messaging, and visually appealing compositions that align with your brand identity. Every design we create is purposeful and optimized to support your marketing goals, helping your business communicate effectively and leave a lasting impression.',
  },
  {
    title: 'Social Media Graphics',
    description:
      'At CreedCreations, we design engaging social media graphics that capture attention and strengthen your online presence. We create visually consistent posts, stories, banners, and ad creatives tailored to your brand identity. Our team focuses on clarity, strong visuals, and strategic messaging to help you increase engagement and brand recall. Whether you’re building awareness or running campaigns, our social media designs are optimized to perform across platforms like Instagram, Facebook, and LinkedIn while maintaining a professional and cohesive look.',
  },
  {
    title: 'Marketing Materials Design',
    description:
      'Professional marketing materials build credibility and support your sales efforts. At CreedCreations, we design brochures, flyers, posters, banners, and promotional assets that communicate your message clearly and effectively. We combine compelling visuals with structured layouts and persuasive content to create materials that attract and inform your audience. Our designs align with your brand identity and marketing goals, ensuring consistency across all touchpoints. Whether digital or print, we deliver marketing materials that enhance brand trust and drive results.',
  },
  {
    title: 'Presentation Design',
    description:
      'A powerful presentation can influence decisions and win clients. At CreedCreations, we design clean, modern, and visually engaging presentations that communicate your ideas confidently. We focus on structured layouts, impactful visuals, and easy-to-understand content flow to ensure clarity and professionalism. Whether it’s a business pitch, investor deck, or corporate report, we transform complex information into compelling slides. Our presentation design services help you present with confidence while maintaining brand consistency and leaving a strong impression.',
  },
  {
    title: 'Website Design',
    description:
      'Your website is often the first interaction customers have with your business. At CreedCreations, we design modern, responsive, and user-focused websites that reflect your brand identity and build trust. Our website design process focuses on clean layouts, strong visual hierarchy, and seamless user experience. We ensure your website is mobile-friendly, visually appealing, and optimized for conversions. Every design is strategically crafted to help you attract visitors, communicate clearly, and turn traffic into long-term customers.',
  },
  {
    title: 'Website Development',
    description:
      'At CreedCreations, we develop high-performance websites that are fast, secure, and scalable. Our development process ensures clean coding, responsive functionality, and smooth performance across devices. We build websites that are optimized for SEO, speed, and user experience, helping your business rank better and perform efficiently. Whether it’s a business website, portfolio, or custom platform, we focus on reliability and long-term growth. Our goal is to create websites that not only look great but also deliver measurable results.',
  },
  {
    title: 'UI/UX Design',
    description:
      'At CreedCreations, we design intuitive and user-friendly digital experiences that keep your audience engaged. Our UI/UX design process focuses on understanding user behavior, improving navigation, and creating seamless interactions. We combine clean interface design with strategic user experience planning to ensure your website or app is easy to use and visually appealing. From wireframes to final UI design, we prioritize usability, clarity, and performance. Our goal is to help your business deliver smooth digital experiences that increase engagement and conversions.',
  },
  {
    title: 'Landing Page Design',
    description:
      'A high-converting landing page can significantly boost your marketing results. At CreedCreations, we design focused, conversion-driven landing pages tailored to your campaigns and target audience. We structure content strategically, highlight key benefits, and create strong call-to-actions that encourage users to take action. Our landing pages are responsive, fast-loading, and optimized for SEO and performance. Whether for product launches, ads, or lead generation, we ensure your landing page is visually compelling and built to drive measurable results.',
  },
  {
    title: 'Packaging Design',
    description:
      'Packaging plays a crucial role in attracting customers and building brand recognition. At CreedCreations, we create packaging designs that are visually striking, practical, and aligned with your brand identity. We focus on shelf impact, clarity of information, and aesthetic appeal to help your product stand out in competitive markets. Our design approach balances creativity with functionality, ensuring your packaging enhances customer experience while strengthening brand value and trust.',
  },
  {
    title: 'Print Design',
    description:
      'At CreedCreations, we provide professional print design services that maintain quality and consistency across all physical materials. From business cards and posters to banners and corporate stationery, we ensure every print asset reflects your brand identity accurately. We focus on layout precision, color accuracy, and print-ready formatting to deliver flawless results. Our print designs are crafted to leave a lasting impression and help your brand communicate professionally in offline environments.',
  },
  {
    title: 'Brochure & Catalog Design',
    description:
      'Brochures and catalogs are powerful tools for showcasing your products and services. At CreedCreations, we design structured, visually engaging brochures and catalogs that communicate information clearly and professionally. We focus on organized layouts, compelling visuals, and persuasive content that guides readers smoothly. Our designs are tailored to your brand identity and marketing goals, helping you present your offerings effectively. Whether for corporate profiles or product listings, we create materials that build trust and support your sales efforts.',
  },
  {
    title: 'Merchandise Design',
    description:
      'At CreedCreations, we design custom merchandise that strengthens brand visibility and creates lasting impressions. From t-shirts and hoodies to mugs, stationery, and promotional products, we create designs that align with your brand identity and appeal to your audience. Our focus is on clean, impactful visuals that look great both digitally and in print. Whether for corporate gifting, events, or brand promotions, our merchandise designs help increase brand recognition and build stronger connections with your customers.',
  },
  {
    title: 'Video Editing',
    description:
      'Professional video editing transforms raw footage into powerful brand stories. At CreedCreations, we edit videos with precision, creativity, and attention to detail. We focus on smooth transitions, color correction, sound design, and engaging pacing to deliver high-quality content. Whether it’s social media videos, corporate content, or promotional campaigns, we ensure your message is clear and impactful. Our video editing services are designed to enhance storytelling and help your brand connect effectively with its audience.',
  },
  {
    title: 'Videography',
    description:
      'At CreedCreations, we provide professional videography services that capture your brand with clarity and creativity. We plan, shoot, and produce high-quality videos tailored to your marketing goals. From corporate shoots to product showcases and event coverage, we ensure every frame reflects professionalism and brand consistency. Our team focuses on storytelling, composition, and visual quality to create videos that engage viewers and build trust. We help businesses communicate visually with confidence and impact.',
  },
  {
    title: 'Motion Graphics',
    description:
      'Motion graphics add life and energy to your brand communication. At CreedCreations, we create engaging motion graphics that simplify complex ideas and enhance visual storytelling. From animated social media content to corporate presentations and digital ads, we design dynamic visuals that capture attention. Our motion graphics are crafted with clarity, creativity, and brand consistency in mind. By combining animation, typography, and visual effects, we help your brand communicate more effectively in today’s fast-moving digital world.',
  },
  {
    title: 'Logo Animation',
    description:
      'A logo animation gives your brand a modern and professional touch. At CreedCreations, we transform static logos into smooth, visually engaging animations that enhance brand recognition. Perfect for videos, websites, presentations, and social media, our logo animations are designed to reflect your brand personality. We focus on clean transitions, timing, and creative effects that maintain simplicity while adding impact. A well-crafted animated logo strengthens your brand presence and leaves a memorable impression on your audience.',
  },
  {
    title: 'Explainer Videos',
    description:
      'Explainer videos are powerful tools for simplifying your message and increasing customer understanding. At CreedCreations, we create clear, engaging, and professionally produced explainer videos tailored to your business goals. From script development to animation and editing, we manage the complete production process. Our focus is on clarity, storytelling, and visual appeal to ensure your audience quickly understands your product or service. Explainer videos help build trust, improve engagement, and boost conversions effectively.',
  },
  {
    title: 'Promotional Videos',
    description:
      'Promotional videos help showcase your brand, products, and services in a compelling way. At CreedCreations, we create high-quality promotional videos designed to attract attention and drive action. We combine strong visuals, storytelling, and strategic messaging to highlight your brand’s strengths. Whether for social media, advertising campaigns, or website use, our promotional videos are crafted to engage viewers and deliver measurable marketing results. Our goal is to help your business stand out and connect confidently with your audience.',
  },
];

const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? prev : (prev - 1 + SERVICES.length) % SERVICES.length,
    );
  };

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? prev : (prev + 1) % SERVICES.length,
    );
  };
  return (
    <section id="services" className="bg-black py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6">
          OUR SERVICES
        </h2>
        <p className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed mb-8">
          Brand identity, design, development, and video — all under one roof.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border border-white/15">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col gap-3 px-6 py-7 text-left text-white text-sm sm:text-base border-[0.5px] border-white/10 bg-white/5 hover:bg-neon-orange transition-colors duration-300 ease-out cursor-pointer"
              onClick={() => handleOpen(index)}
            >
              {/* Icon row — simple subtle glyph to echo reference UI */}
              <div className="flex items-center gap-3 text-white/60 group-hover:text-white transition-colors duration-300 ease-out">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-xs">
                  +
                </span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              {/* Service title */}
              <div className="space-y-1">
                <p className="font-semibold text-white/90 group-hover:text-white transition-colors duration-300 ease-out">
                  {service.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service detail modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 sm:px-6">
          <div
            className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-black text-white p-6 sm:p-8"
            style={{
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.9)',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 text-white/60 hover:text-white text-lg"
              aria-label="Close"
            >
              ×
            </button>

            {/* Title */}
            <h3 className="section-heading text-2xl sm:text-3xl mb-3">
              {SERVICES[activeIndex].title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
              {SERVICES[activeIndex].description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white hover:text-black transition-colors"
                  aria-label="Previous service"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white hover:text-black transition-colors"
                  aria-label="Next service"
                >
                  ›
                </button>
              </div>

              <button
                type="button"
                className="px-5 py-2 rounded-full bg-neon-orange text-white text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors border border-white/20"
              >
                Book service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;

