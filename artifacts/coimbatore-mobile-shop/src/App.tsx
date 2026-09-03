import { type CSSProperties, type FormEvent, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Headphones,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

type Product = {
  brand: string;
  name: string;
  badge: string;
  description: string;
  tags: string[];
  wash: string;
  image: string;
};

const resolveAssetUrl = (filePath: string) => {
  const basePath = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${basePath}${filePath.replace(/^\/+/, '')}`;
};

const products: Product[] = [
  {
    brand: 'Google',
    name: 'Pixel 9a',
    badge: 'Smart pick',
    description: 'A seriously clever camera and a clean Android experience for everyday city life.',
    tags: ['Best camera', 'Clean Android'],
    wash: '#e7e2ff',
    image: resolveAssetUrl('phones/pixel9a.png'),
  },
  {
    brand: 'Samsung',
    name: 'Galaxy S24 FE',
    badge: 'Flagship feel',
    description: 'A bright display, dependable cameras, and all-day performance in one neat package.',
    tags: ['AMOLED', 'AI features'],
    wash: '#e1e6ff',
    image: resolveAssetUrl('phones/galaxy-s24-fe.png'),
  },
  {
    brand: 'OnePlus',
    name: '13R',
    badge: 'Fast seller',
    description: 'Big battery, bold screen, and the kind of speed that feels new every time.',
    tags: ['Big battery', '120 Hz display'],
    wash: '#f7dfd6',
    image: resolveAssetUrl('phones/oneplus-13r.png'),
  },
  {
    brand: 'Nothing',
    name: 'Phone (3a)',
    badge: 'New arrival',
    description: 'Distinctive by design and easy to love — a smooth everyday phone with character.',
    tags: ['Glyph design', 'Everyday hero'],
    wash: '#dff0e8',
    image: resolveAssetUrl('phones/nothing-phone-3a.png'),
  },
];

const spotlightNotes = [
  { kicker: 'Smart pick', quote: '“Pixel 9a is a gem.”', detail: 'A clever camera for everyday city life.' },
  { kicker: 'Flagship feel', quote: '“That screen is magic.”', detail: 'Bright, smooth, and ready for long days.' },
  { kicker: 'Fast seller', quote: '“The battery just keeps going.”', detail: 'Big energy for busy Coimbatore days.' },
  { kicker: 'New arrival', quote: '“Design you can feel.”', detail: 'A little different, in the best way.' },
];

const stagePalettes = [
  ['hsl(12 87% 72%)', 'hsl(280 35% 63%)'],
  ['hsl(224 65% 72%)', 'hsl(245 45% 47%)'],
  ['hsl(18 72% 72%)', 'hsl(323 42% 48%)'],
  ['hsl(155 34% 61%)', 'hsl(166 42% 39%)'],
];

const navItems = [
  ['home', 'Home'],
  ['range', 'Our range'],
  ['services', 'Services'],
  [ 'reviews', 'Reviews'],
  ['story', 'Our story'],
  ['visit', 'Visit us'],
 ] as const;

type TabId = typeof navItems[number][0];
type TabChange = (tab: TabId) => void;

function Header({ activeTab, onTabChange }: { activeTab: TabId; onTabChange: TabChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const chooseTab = (tab: TabId) => {
    onTabChange(tab);
    setMenuOpen(false);
  };

  return (
    <>
      
      <header className="header">
        <div className="container-wide header-inner">
          <button className="brand brand-button" onClick={() => chooseTab('home')} data-testid="link-brand">
           
           <img
            src={resolveAssetUrl('phones/universal-logo.jpeg')}
             className="universal-logo"
            />
         <span><span className="brand-name">Universal Mobiles <span style={{ color: 'hsl(var(--accent-foreground))' }}></span></span><span className="brand-sub" style={{ color: 'hsl(42 20% 70%)' }}>Good phones. Good people.</span></span>
          </button>
          <nav className={menuOpen ? 'nav mobile-nav' : 'nav'} aria-label="Primary navigation" role="tablist">
            {navItems.map(([id, label]) => (
              <button key={id} id={`tab-${id}`} role="tab" aria-selected={activeTab === id} className={`nav-link ${activeTab === id ? 'active' : ''}`} onClick={() => chooseTab(id)} data-testid={`link-nav-${id}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-call" href="tel:+917845246107"><Phone size={15} /> <span>Call us</span></a>
            <button className="icon-btn mobile-menu-btn" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function Footer({ onTabChange }: { onTabChange: TabChange }) {
  return (
    <footer className="footer">
      <div className="container-wide footer-grid">
        <div>
          <button className="brand brand-button" onClick={() => onTabChange('home')} data-testid="link-footer-brand">
            <img
            src={resolveAssetUrl('phones/universal-logo.jpeg')}
            className="universal-logo"
            />
            <span><span className="brand-name">Universal Mobiles <span style={{ color: 'hsl(var(--accent-foreground))' }}></span></span><span className="brand-sub" style={{ color: 'hsl(42 20% 70%)' }}>Good phones. Good people.</span></span>
          </button>
          <p>Good phones, clear advice, and a familiar face in Coimbatore whenever you need help.</p>
        </div>
        <div><h4>Explore</h4>{navItems.slice(1).map(([id, label]) => <button key={id} className="footer-tab-link" onClick={() => onTabChange(id)}>{label}</button>)}</div>
        <div><h4>Find us</h4><a href="https://maps.google.com/?q=SN+Complex,+Lakshmi+Garden,+Kondayampalayam+Road,+Varathaiyangar+Palayam,+Coimbatore,+Tamil+Nadu+641110">SN Complex, Lakshmi Garden, Kondayampalayam Rd, Varathaiyangar Palayam, Coimbatore, Tamil Nadu 641110</a><a href="tel:+917845246107">078452 46107</a><button className="footer-tab-link" onClick={() => onTabChange('visit')}>Get directions</button></div>
        <div><h4>Stay connected</h4><p>New arrivals, practical tips, and the occasional phone opinion.</p><div style={{ display: 'flex', gap: 8 }}><a href="https://instagram.com" aria-label="Instagram"><Instagram size={18} /></a><a href="tel:+917845246107" aria-label="Call Universal Mobiles"><Phone size={18} /></a></div></div>
      </div>
      <div className="container-wide footer-bottom"><span>Copyright © 2026 Universal Mobiles | All Rights Reserved.</span><span>Walk in · Call up · Write in</span></div>
    </footer>
  );
}

function PhoneShowcase({ product, index }: { product: Product; index: number }) {
  return (
    <article className="product-card reveal-on-scroll" style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties} data-testid={`card-showcase-${index}`}>
      <div className="product-visual" style={{ '--wash': product.wash } as CSSProperties}>
        <span className="product-badge">{product.badge}</span>
        <img
  src={product.image}
  alt={`${product.brand} ${product.name}`}
  className="real-phone-image"
/>
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3>{product.name}</h3>
        <p className="showcase-copy">{product.description}</p>
        <div className="showcase-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}

function Home({ activeTab, onTabChange }: { activeTab: TabId; onTabChange: TabChange }) {
  const [sent, setSent] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [localTime, setLocalTime] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  useEffect(() => {
    const spotlightTimer = window.setInterval(() => {
      setSpotlightIndex((current) => (current + 1) % products.length);
    }, 4200);
    return () => window.clearInterval(spotlightTimer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()));
    };
    updateTime();
    const clockTimer = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activeTab]);

  const spotlight = products[spotlightIndex];
  const [stageStart, stageEnd] = stagePalettes[spotlightIndex];

  return (
    <div className="site-shell noise">
      <Header activeTab={activeTab} onTabChange={onTabChange} />
      <main className="tabbed-main">
        <div className="tab-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} key={activeTab}>
        {activeTab === 'home' && (
          <>
        <section className="hero" id="home">
          <div className="container-wide hero-grid">
            <div className="hero-copy-column reveal-on-scroll is-visible">
              <div className="hero-kicker eyebrow"><span />A better phone starts with a better conversation</div>
              <div className="spotlight-copy" key={spotlight.name} aria-live="polite">
                <p className="spotlight-label">{spotlight.brand} · {spotlight.badge}</p>
                <h1>Find your <em>{spotlight.name}</em>.</h1>
                <p className="hero-copy">{spotlight.description} Universal Mobiles is here to help you try it, compare it, and make a confident call.</p>
              </div>
              <div className="hero-ctas">
                <button className="btn btn-primary" onClick={() => onTabChange('range')} data-testid="button-hero-range">Explore our range <ArrowRight size={16} /></button>
                <button className="btn btn-ghost" onClick={() => onTabChange('story')} data-testid="link-hero-story">Why Universal Mobiles <ArrowRight size={15} /></button>
              </div>
              <div className="hero-notes"><div><MapPin size={15} />Varathaiyangar Palayam, Coimbatore</div><div><span className="live-dot" />Showroom live · {localTime}</div></div>
            </div>
            <div
              className="hero-art reveal-on-scroll is-visible"
              style={{ '--reveal-delay': '150ms' } as CSSProperties}
            >
              <svg
                className="phone-orbit"
                viewBox="0 0 600 600"
                aria-hidden="true"
              >
                <ellipse
                  cx="300"
                  cy="300"
                  rx="220"
                  ry="90"
                  className="orbit-line orbit-line-1"
                />
                <ellipse
                  cx="300"
                  cy="300"
                  rx="250"
                  ry="105"
                  className="orbit-line orbit-line-2"
                />
                <ellipse
                  cx="300"
                  cy="300"
                  rx="185"
                  ry="75"
                  className="orbit-line orbit-line-3"
                />
                <circle cx="520" cy="300" r="7" className="orbit-dot" />
              </svg>

              <img
                src={spotlight.image}
                alt={`${spotlight.brand} ${spotlight.name}`}
                className="hero-real-phone"
              />
            </div>
            </div>
        </section>
          </>
        )}

        {activeTab === 'range' && <section className="section" id="range">
          <div className="container-wide">
            <div className="section-heading reveal-on-scroll"><div><span className="eyebrow">A considered shelf</span><h2>Phones with a point of view.</h2></div><p>We keep the range focused so you can spend less time comparing spec sheets and more time finding what fits.</p></div>
            <div className="product-grid">{products.map((product, index) => <PhoneShowcase key={product.name} product={product} index={index} />)}</div>
            <div className="range-note"><span><BadgeCheck size={18} />Every phone is tested, billed, and backed.</span><button onClick={() => onTabChange('visit')} className="text-link">Come try them in person <ArrowRight size={15} /></button></div>
          </div>
        </section>}

        {activeTab === 'services' && <section className="section section-tint" id="services">
          <div className="container-wide">
            <div className="section-heading reveal-on-scroll"><div><span className="eyebrow">More than a phone counter</span><h2>Good help, before and after.</h2></div><p>The phone is only the start. Our small team makes the rest feel easy too.</p></div>
            <div className="service-grid">
              {[
                { icon: <Headphones size={21} />, title: 'Find what fits', text: 'Tell us how you work, travel, create, and spend your day. We will narrow it down to the right conversation.' },
                { icon: <Smartphone size={21} />, title: 'Set up without stress', text: 'Data transfer, account setup, and the little settings that make a new phone feel like yours.' },
                { icon: <Truck size={21} />, title: 'Keep it local', text: 'Same-day Coimbatore delivery, a nearby showroom, and a familiar person to call when you need us.' },
                { icon: <ShieldCheck size={21} />, title: 'Stay looked after', text: 'Clear warranty guidance, practical aftercare, and no disappearing act once you leave the counter.' },
              ].map((service, index) => (
                <button
                  key={service.title}
                  type="button"
                  className={`service-card reveal-on-scroll ${selectedService === index ? 'service-card-dark' : ''}`}
                  style={{ '--reveal-delay': `${40 + index * 60}ms` } as CSSProperties}
                  onClick={() => setSelectedService(index)}
                  aria-pressed={selectedService === index}
                >
                  <div className="service-icon">{service.icon}</div>
                  <span className="eyebrow">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </button>
              ))}
            </div>
          </div>
        </section>}
        {activeTab === 'reviews' && (
  <section className="section reviews-section" id="reviews">
    <div className="container-wide">

      <div className="section-heading reveal-on-scroll">
        <div>
          <span className="eyebrow">What our customers say</span>
          <h2>Good phones. Even better experiences.</h2>
        </div>

        <p>
          Real conversations, honest advice, and happy customers
          from Universal Mobiles, Coimbatore.
        </p>
      </div>

      <div className="reviews-summary reveal-on-scroll">
        <div className="reviews-rating">
          <strong>5.0</strong>
          <div>
            <div className="review-stars">★★★★★</div>
            <span>Customer rating</span>
          </div>
        </div>

        <div className="reviews-summary-text">
          <strong>Trusted by our customers</strong>
          <p>
            We believe the best review is a customer who comes back
            or recommends us to a friend.
          </p>
        </div>
      </div>

      <div className="reviews-grid">

        <article className="review-card reveal-on-scroll">
          <div className="review-card-top">
            <div className="review-avatar">R</div>
            <div>
              <h3>Natarajan C</h3>
              <span>Coimbatore</span>
            </div>
            <div className="review-stars">★★★★★</div>
          </div>

          <p>
            "Very helpful team. They explained the differences between
            the phones clearly and helped me choose the right one."
          </p>

          <small>Verified customer</small>
        </article>

        <article className="review-card reveal-on-scroll">
          <div className="review-card-top">
            <div className="review-avatar">P</div>
            <div>
              <h3>Priya</h3>
              <span>Coimbatore</span>
            </div>
            <div className="review-stars">★★★★★</div>
          </div>

          <p>
            "I liked the way they gave honest advice without pushing
            the most expensive phone. Great experience."
          </p>

          <small>Verified customer</small>
        </article>

        <article className="review-card reveal-on-scroll">
          <div className="review-card-top">
            <div className="review-avatar">S</div>
            <div>
              <h3>Suresh</h3>
              <span>Coimbatore</span>
            </div>
            <div className="review-stars">★★★★★</div>
          </div>

          <p>
            "Bought my phone here and the setup was very smooth.
            The staff were friendly and patient."
          </p>

          <small>Verified customer</small>
        </article>

        <article className="review-card reveal-on-scroll">
          <div className="review-card-top">
            <div className="review-avatar">A</div>
            <div>
              <h3>Anitha</h3>
              <span>Coimbatore</span>
            </div>
            <div className="review-stars">★★★★★</div>
          </div>

          <p>
            "Excellent service and a good collection of phones.
            They helped me compare everything before buying."
          </p>

          <small>Verified customer</small>
        </article>

         </div>

      <div className="reviews-bottom reveal-on-scroll">
        <strong>Your experience matters to us.</strong>
        <p>
          Thank you for choosing Universal Mobiles.
        </p>

        <a
          href="https://www.google.com/search?q=Universal+Mobiles+Coimbatore"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Leave a review
          <ArrowRight size={15} />
        </a>
      </div>

    </div>
  </section>
)}
 {activeTab === 'story' && <section className="section" id="story">
          <div className="container-wide story-grid">
             <div className="reveal-on-scroll"><span className="eyebrow">A little local context</span><h2>We know the difference between a spec and a need.</h2><p>Universal Mobiles began in Coimbatore in 2012 with a simple idea: choosing a phone should feel more like good advice from a neighbour than a negotiation.</p><p>Today, we keep the range considered and the advice human. We test the cameras, know which batteries last through a full day, and tell you when the simpler option is genuinely the better one.</p><div className="story-note">No commission targets. No confusing jargon. Just a good recommendation.</div></div>
             <div className="story-panel reveal-on-scroll" style={{ '--reveal-delay': '130ms' } as CSSProperties}><div className="story-panel-top"><span className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Our promise</span><Heart size={21} /></div><h3>No pressure is a feature.</h3><p>“If you leave with the right phone for you — even if it is not the most expensive one on our shelf — we have done our job.”</p><div className="story-signoff"><span className="story-avatar">U</span><span>From the Universal Mobiles team<br /><small>Coimbatore, always</small></span></div></div>
          </div>
        </section>}

        {activeTab === 'visit' && <>
        <section className="section section-tint" id="visit">
          <div className="container-wide visit-grid">
             <div className="map-location reveal-on-scroll"><iframe className="map-embed" title="Universal Mobiles store location" src="https://www.google.com/maps?q=SN+Complex,+Lakshmi+Garden,+Kondayampalayam+Road,+Varathaiyangar+Palayam,+Coimbatore,+Tamil+Nadu+641110&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><address>SN Complex, Lakshmi Garden<br />Kondayampalayam Rd<br />Varathaiyangar Palayam<br />Coimbatore, Tamil Nadu 641110<br /><br />Monday to Sunday · 10:00 AM–8:00 PM</address></div>
             <div className="visit-copy reveal-on-scroll" style={{ '--reveal-delay': '130ms' } as CSSProperties}><span className="eyebrow">Come say hi</span><h2>Bring your questions. We will bring the time.</h2><p>Walk in for a demo, call before you visit, or leave us a note and we will get back to you from the counter.</p><div className="visit-actions"><a className="btn btn-primary" href="https://maps.google.com/?q=SN+Complex,+Lakshmi+Garden,+Kondayampalayam+Road,+Varathaiyangar+Palayam,+Coimbatore,+Tamil+Nadu+641110"><MapPin size={16} />Get directions</a><a className="btn btn-outline" href="tel:+917845246107"><Phone size={16} />078452 46107</a></div><div className="visit-details"><span><Store size={17} />SN Complex showroom</span><span><Clock3 size={17} />Open every day</span></div></div>
          </div>
        </section>

        <section className="section contact-section">
          <div className="container-wide contact-grid">
            <div className="contact-copy reveal-on-scroll"><span className="eyebrow">Not sure where to start?</span><h2>Tell us the real thing.</h2><p>Maybe you need a camera for your small business, a battery that survives college, or simply a phone that does not need charging by lunch.</p><a className="text-link" href="mailto:hello@universalmobiles.in">hello@universalmobiles.in <ArrowRight size={15} /></a></div>
            {sent ? <div className="contact-success reveal-on-scroll is-visible"><BadgeCheck size={30} /><h3>That is with us.</h3><p>Thanks for reaching out. A Universal Mobiles human will be in touch soon.</p><button className="btn btn-primary" onClick={() => setSent(false)}>Send another note</button></div> : <form className="contact-form reveal-on-scroll" onSubmit={submit}><div className="field"><label htmlFor="name">Your name</label><input id="name" required placeholder="How should we call you?" /></div><div className="field"><label htmlFor="message">What can we help with?</label><textarea id="message" required placeholder="I am looking for..." /></div><button className="btn btn-primary" type="submit">Send to the counter <ArrowRight size={15} /></button></form>}
          </div>
        </section>
        </>}
        </div>
      </main>
      <Footer onTabChange={onTabChange} />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const changeTab: TabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <QueryClientProvider client={new QueryClient()}><TooltipProvider><ErrorBoundary><Home activeTab={activeTab} onTabChange={changeTab} /></ErrorBoundary><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;