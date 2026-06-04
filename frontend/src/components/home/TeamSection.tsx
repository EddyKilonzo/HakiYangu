'use client';

import ProfileCard from '@/components/ui/ProfileCard';

const TEAM = [
  {
    name: 'Martha Ngendo',
    role: 'Product Lead',
    handle: 'martha_haki',
    bio: 'Drives the vision of making Kenyan legal information accessible to every citizen, in every corner of the country.',
    initials: 'MN',
    color: '#DB1A1A',
  },
  {
    name: 'Eddy Max Kilonzo',
    role: 'Software Engineer',
    handle: 'eddy_dev',
    bio: 'Builds the APIs and data pipelines that connect HakiYangu to authoritative Kenyan legal sources.',
    initials: 'EK',
    color: '#D4AF37',
  },
  {
    name: 'John Brandews',
    role: 'Full-Stack Developer',
    handle: 'brandews_codes',
    bio: 'Crafts the seamless experience from the AI chat engine to the responsive interfaces Kenyans rely on daily.',
    initials: 'JB',
    color: '#16a34a',
  },
  {
    name: 'Felix Tony Maloba',
    role: 'UI/UX Designer',
    handle: 'felix_pixels',
    bio: 'Ensures every interaction on HakiYangu feels intuitive, trustworthy, and distinctly Kenyan.',
    initials: 'FM',
    color: '#6366f1',
  },
];

export function TeamSection() {
  return (
    <section
      className="py-24"
      style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
            The People Behind It
          </p>
          <h2 className="font-serif text-3xl font-bold md:text-5xl" style={{ color: 'var(--color-text)' }}>
            Meet Our Team
          </h2>
          <div className="mx-auto mt-6 h-px w-20" style={{ background: 'var(--color-accent)' }} />
          <p className="mt-6 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Four Kenyans building the tool they always wished existed — free, bilingual legal information for every Kenyan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={`${i * 100}`}
              className="w-full flex justify-center"
            >
              <ProfileCard
                name={member.name}
                title={member.role}
                handle={member.handle}
                initials={member.initials}
                behindGlowColor={`${member.color}66`}
                behindGlowSize="60%"
                innerGradient={`linear-gradient(145deg, rgba(20,20,20,0.4) 0%, ${member.color}11 100%)`}
                contactText="Connect"
                status="Online"
                onContactClick={() => console.log(`Contacting ${member.name}`)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
