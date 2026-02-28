import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
}

const BLOGS: Blog[] = [
  {
    id: 'photo-editing',
    title: 'Professional Photo Editing in Gandhinagar',
    description: 'Why polished visuals matter for brands and businesses in Gandhinagar.',
    category: 'Photo Editing',
    content: `If you run a business in Gandhinagar, you know how important visuals are. Whether it's your product photos, team headshots, or social media posts, people notice when images look sharp and professional. Good photo editing can turn an ordinary shot into something that builds trust and draws customers in.

Creed Creations offers photo editing services right here in Gandhinagar. We work with local businesses, startups, and creatives who need clean, consistent visuals. Our team handles color correction, background removal, retouching, and more. The goal is simple: make your images look as good as your brand deserves.

We keep things natural and clear. No over-editing or fake filters—just clean, professional results that fit your style. Whether you need graphics design in Gandhinagar or focused photo editing, we are here to help.

Arun Baghel and the Creed Creations team understand what local brands need: quality work, honest pricing, and a partner who gets the job done. We have worked with businesses across Gandhinagar on product shoots, event photos, social content, and more. If you are looking for photo editing in Gandhinagar that delivers, reach out and let us chat.`,
  },
  {
    id: 'video-editing',
    title: 'Video Editing in Gandhinagar: Why It Matters',
    description: 'How professional editing turns raw footage into content that connects.',
    category: 'Video Editing',
    content: `Video is everywhere now—reels, ads, product demos, corporate films. But raw footage alone does not tell a story. Video editing in Gandhinagar is what turns hours of clips into something people actually want to watch. Clean cuts, good pacing, clear audio, and a clear message make all the difference.

At Creed Creations, we offer video editing services for businesses and creators in Gandhinagar. We work on social media reels, YouTube videos, promotional clips, and more. Our focus is on making your content easy to follow and enjoyable to watch. No fancy tricks for the sake of it—just solid, professional editing that fits your brand.

Arun Baghel leads our video team with years of experience in editing and storytelling. Whether you need a quick reel cut or a full-length brand film, we approach each project with the same care. We also handle motion graphics, brand design, and graphics design in Gandhinagar—so your visuals stay consistent across all platforms.

If you are looking for video editing in Gandhinagar that actually delivers, Creed Creations is here to help. Get in touch and let us bring your footage to life.`,
  },
  {
    id: 'ai-content',
    title: 'AI Content: How We Use It at Creed Creations',
    description: 'Using AI to work faster without losing the human touch.',
    category: 'AI Content',
    content: `AI is changing how creatives work. From quick background removal to idea generation, it can save time and help us try more options. But at Creed Creations, we believe AI should support creativity, not replace it. We use tools to speed up repetitive tasks so we can focus on what matters: strong ideas, clear design, and work that feels human.

Our team in Gandhinagar uses AI in smart ways. We might use it for resizing assets, trying different layouts, or getting faster first drafts. But the final decisions—the look, the feel, the message—always come from us. That way, your brand stays unique and your content does not feel generic.

Arun Baghel and the Creed Creations team blend AI efficiency with real creative thinking. We offer graphics design in Gandhinagar, video editing in Gandhinagar, and brand design for local businesses. Whether you need social posts, product videos, or a full brand refresh, we make sure the result feels like you.

If you want a partner who uses modern tools without losing the personal touch, reach out. We are here for brands in Gandhinagar who care about quality.`,
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Design for Gandhinagar Brands',
    description: 'Creating visuals that stop the scroll and connect with your audience.',
    category: 'Social Media',
    content: `Social media is crowded. To stand out, your posts need to look good and feel consistent. That is where design comes in. Strong visuals—thumbnails, stories, reels, and feed aesthetics—help people recognize your brand and stop scrolling long enough to engage.

Creed Creations helps Gandhinagar brands with social media design. We create templates, graphics, and videos that fit your voice and your platforms. What works on Instagram might not work on LinkedIn, so we adapt. The goal is a feed that feels cohesive and professional, without being boring.

We work with local businesses who want to level up their social presence. From graphics design in Gandhinagar to video content and brand design, we cover the full picture. Arun Baghel and the team understand what it takes to build a strong online presence.

Creed Creations has helped brands in Gandhinagar create cohesive feeds, better thumbnails, and content that converts. If you are ready to make your social media look as good as your business, reach out. Let us talk about what you need.`,
  },
  {
    id: 'brand-storytelling',
    title: 'Brand Design in Gandhinagar: Why It Matters',
    description: 'How a clear brand identity helps local businesses stand out.',
    category: 'Branding',
    content: `Your brand is more than a logo. It is the colors, fonts, tone, and visuals that people connect with. Good brand design in Gandhinagar helps businesses look professional, build trust, and stand out from competitors. When everything—from your website to your visiting card—feels consistent, people remember you.

Creed Creations offers brand design services for businesses in Gandhinagar. We help with logos, color palettes, typography, and guidelines so your brand looks the same everywhere. Whether you are a startup or an established company, we create systems that are easy to maintain and grow with you.

Arun Baghel leads our brand and design work. We keep things simple and effective: no jargon, no overcomplication. Just clear, strong design that reflects who you are. Creed Creations has helped startups, shops, and service providers across Gandhinagar build brands they are proud of.

If you are looking for brand design in Gandhinagar or graphics design that fits your vision, we are ready to help. Reach out and let us build something that stands out.`,
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics for Gandhinagar Brands',
    description: 'How animation and motion add impact to your visuals.',
    category: 'Motion Design',
    content: `Static images are great, but motion catches the eye. Motion graphics—animated logos, lower thirds, explainer clips, and social intros—add energy and clarity to your content. They help explain ideas quickly and leave a stronger impression than text or stills alone.

Creed Creations creates motion graphics for brands in Gandhinagar. We keep animations purposeful: every movement should support your message, not distract from it. Whether it is a short logo animation for your website or animated posts for social media, we make sure it feels smooth and on-brand.

We combine motion with our other services—video editing in Gandhinagar, graphics design in Gandhinagar, and brand design—so your visuals stay consistent. Arun Baghel and the Creed Creations team bring years of experience to every project.

Whether you need a logo animation, a product demo, or animated social posts, we are here for brands in Gandhinagar who want to stand out. Get in touch and let us add some motion to your brand.`,
  },
];

const BlogsSection: React.FC = () => {
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  const openModal = (blog: Blog) => setActiveBlog(blog);
  const closeModal = () => setActiveBlog(null);

  return (
    <section id="blogs" className="bg-neon-orange py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-heading text-white text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase mb-6"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          BLOGS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed mb-10"
        >
          Insights on photo editing, video production, AI content, social media marketing, and more — straight from our creative studio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {BLOGS.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => openModal(blog)}
              className="group cursor-pointer rounded-2xl border border-white/25 bg-white/10 p-6 sm:p-8 text-left hover:bg-white hover:border-white transition-all duration-300"
            >
              <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70 group-hover:text-black/70 mb-3 transition-colors">
                {blog.category}
              </span>
              <h3 className="section-heading text-white group-hover:text-black text-xl sm:text-2xl tracking-tight mb-2 transition-colors">
                {blog.title}
              </h3>
              <p className="text-white/85 group-hover:text-black/80 text-sm sm:text-base leading-relaxed line-clamp-3 transition-colors">
                {blog.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-white/90 group-hover:text-black text-sm font-medium group-hover:gap-3 transition-all duration-300">
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Blog Modal — white bg, black text, glass morphism + 3D effect */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              perspective: 1200,
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
              }}
              exit={{ opacity: 0, scale: 0.95, rotateX: 6 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl my-auto rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow:
                  '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.2), 0 0 120px rgba(0,0,0,0.08)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-full border border-black/15 bg-white/90 text-black hover:bg-black hover:text-white transition-colors duration-300"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-neon-orange mb-3">
                {activeBlog.category}
              </span>
              <h2 className="section-heading text-black text-2xl sm:text-3xl tracking-tight mb-3">
                {activeBlog.title}
              </h2>
              <p className="text-black/70 text-sm sm:text-base mb-6">
                {activeBlog.description}
              </p>
              <div className="prose prose-sm sm:prose-base max-w-none text-black/90 leading-relaxed space-y-4">
                {activeBlog.content.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogsSection;
