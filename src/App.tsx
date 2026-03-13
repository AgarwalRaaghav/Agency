/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { Paperclip, Zap, MousePointer2, Plus, ArrowUpRight } from 'lucide-react';

const CountUp = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, numericValue, count]);

  React.useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const Scribble = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 10 Q 15 5, 25 10 T 45 10 T 65 10 T 85 10 T 95 10" />
  </svg>
);

const Lightning = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const Navbar = () => (
  <nav className="flex justify-between items-center px-8 py-6 sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-brand-cyan rounded-full" />
      <span className="font-display text-2xl tracking-tight">Bond</span>
    </div>
    <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium opacity-70">
      <a href="#" className="hover:text-brand-cyan transition-colors">Service</a>
      <a href="#" className="hover:text-brand-cyan transition-colors">Portofolios</a>
      <a href="#" className="hover:text-brand-cyan transition-colors">Work</a>
      <a href="#" className="hover:text-brand-cyan transition-colors">Contact</a>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative pt-20 pb-32 px-8 flex flex-col items-center text-center overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10"
    >
      <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tighter mb-8">
        /real <br />
        agency with its -
      </h1>
      <div className="flex flex-wrap justify-center gap-4 items-center">
        <motion.span 
          whileHover={{ rotate: -2 }}
          className="bg-brand-cyan text-brand-dark px-8 py-2 text-4xl md:text-6xl font-display rounded-sm paper-fold paper-fold-cyan relative"
        >
          super.
          <Lightning className="absolute -top-6 -right-6 w-12 h-12 text-brand-neon" />
        </motion.span>
        <motion.span 
          whileHover={{ rotate: 2 }}
          className="bg-brand-neon text-brand-dark px-8 py-2 text-4xl md:text-6xl font-display rounded-sm paper-fold paper-fold-neon relative"
        >
          digital.
          <Paperclip className="absolute -top-4 -right-2 w-8 h-8 text-brand-dark/40 rotate-45" />
        </motion.span>
      </div>
    </motion.div>

    <Scribble className="absolute top-1/4 right-10 w-32 text-brand-neon/30 rotate-12" />
    <Scribble className="absolute bottom-1/4 left-10 w-40 text-brand-cyan/30 -rotate-12" />
    <Lightning className="absolute bottom-20 right-1/4 w-16 h-16 text-brand-cyan/20 rotate-45" />

    <div className="mt-16 flex items-center gap-4">
      <span className="text-xs uppercase tracking-widest opacity-50">Let's start discussing<br/>your project</span>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-brand-dark px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 relative"
      >
        Start a Project
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </motion.button>
    </div>
  </section>
);

const StatCard = ({ title, value, description, color = "white", rotate = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ 
      y: -15, 
      rotate: rotate + 3,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    }}
    style={{ rotate }}
    className={`bg-${color === 'white' ? 'white' : 'brand-' + color} p-6 rounded-sm text-brand-dark w-64 paper-fold paper-fold-${color} shadow-xl relative transition-shadow duration-300`}
  >
    <h3 className="font-display text-4xl mb-2">
      <CountUp value={value} />
    </h3>
    <h4 className="font-bold text-sm mb-2 uppercase tracking-tight">{title}</h4>
    <p className="text-[10px] leading-tight opacity-70">{description}</p>
    {Math.random() > 0.5 && <Paperclip className="absolute -top-3 right-4 w-6 h-6 text-brand-dark/20 rotate-12" />}
  </motion.div>
);

const WhyUsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-32 px-8 grid md:grid-cols-2 gap-20 items-center max-w-7xl mx-auto relative">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ rotate: -5, scale: 1.02 }}
          className="bg-brand-neon text-brand-dark p-10 rounded-sm inline-block paper-fold paper-fold-neon mb-12 cursor-default"
        >
          <h2 className="font-display text-7xl leading-none">why us?</h2>
          <Scribble className="w-32 mt-4 opacity-40" />
        </motion.div>
        <motion.h3 
          variants={itemVariants}
          className="font-display text-4xl md:text-5xl leading-tight mb-8"
        >
          Recognize success, <br />
          — strive for more.
        </motion.h3>
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.05, backgroundColor: "#CCFF00" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-brand-dark px-6 py-3 rounded-full font-bold text-sm transition-colors duration-300"
        >
          Start a Project
        </motion.button>
      </motion.div>

      <div className="flex flex-col gap-8 items-center md:items-end relative">
        <StatCard 
          title="Money Raised" 
          value="$812+" 
          description="Total amount of money raised as a result of working with Walk Studio" 
          rotate={-2}
        />
        <StatCard 
          title="Unicorn Award" 
          value="12+" 
          description="We have received various awards with prayers and efforts" 
          rotate={3}
        />
        <StatCard 
          title="Our Client" 
          value="400+" 
          description="Total of all clients around the world who have collaborated with us" 
          color="white"
          rotate={-1}
        />
        <StatCard 
          title="Project Complete" 
          value="425+" 
          description="Various kinds of big projects that you have completed on time" 
          color="white"
          rotate={2}
        />
      </div>
    </section>
  );
};

const ServiceTag = ({ icon: Icon, label, color, rotate }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ 
      y: -8, 
      scale: 1.05,
      rotate: rotate + 2,
      backgroundColor: "#CCFF00",
      color: "#002B2B"
    }}
    style={{ rotate }}
    className="bg-white text-brand-dark p-4 rounded-sm flex items-center gap-3 shadow-lg paper-fold paper-fold-white relative transition-all duration-300 cursor-pointer group"
  >
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className={`p-2 rounded-full bg-brand-${color} text-white group-hover:bg-brand-dark transition-colors duration-300`}
    >
      <Icon size={16} />
    </motion.div>
    <span className="font-display text-xl">{label}</span>
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-neon rounded-full border-2 border-brand-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

const ServicesSection = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-32 px-8 max-w-7xl mx-auto relative overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row justify-between items-end mb-20"
      >
        <motion.div variants={headerVariants} className="max-w-md">
          <h3 className="font-display text-4xl mb-4">— Not what we make but your satisfaction matters</h3>
        </motion.div>
        <motion.div 
          variants={headerVariants}
          whileHover={{ rotate: 5, scale: 1.05 }}
          className="bg-brand-neon text-brand-dark p-10 rounded-sm paper-fold paper-fold-neon cursor-default"
        >
          <h2 className="font-display text-7xl">services</h2>
          <Scribble className="w-32 mt-2 opacity-40" />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative py-20">
        <ServiceTag icon={MousePointer2} label="UI/UX Design" color="cyan" rotate={-5} />
        <ServiceTag icon={Plus} label="Illustration" color="neon" rotate={3} />
        <ServiceTag icon={ArrowUpRight} label="Design Graphic" color="cyan" rotate={-2} />
        <ServiceTag icon={Zap} label="3D Design" color="neon" rotate={5} />
        
        <motion.button 
          whileHover={{ scale: 1.1, x: 5 }}
          className="absolute bottom-0 right-10 bg-white text-brand-dark px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-dark/10 shadow-sm"
        >
          Start a Project?
        </motion.button>
      </div>
    </section>
  );
};

const WorkCard = ({ image, title, subtitle, color = "white", rotate = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -15, rotate: rotate + 1 }}
    style={{ rotate }}
    className="bg-white p-4 rounded-sm text-brand-dark paper-fold paper-fold-white shadow-2xl group cursor-pointer"
  >
    <div className="relative overflow-hidden rounded-sm mb-4 aspect-[4/5]">
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover" 
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.15, rotate: 2 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300"
      >
        <div className="bg-white p-3 rounded-full shadow-lg">
          <ArrowUpRight className="text-brand-dark" size={24} />
        </div>
      </motion.div>
      <div className={`absolute top-2 left-2 p-2 rounded-full bg-brand-${color} text-white z-10`}>
        <Plus size={16} />
      </div>
    </div>
    <h4 className="font-display text-xl mb-1 group-hover:text-brand-cyan transition-colors duration-300">{title}</h4>
    <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">{subtitle}</p>
  </motion.div>
);

const WorkSection = () => (
  <section className="py-32 px-8 max-w-7xl mx-auto relative">
    <div className="flex justify-center mb-20">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="bg-brand-neon text-brand-dark p-10 rounded-sm paper-fold paper-fold-neon relative"
      >
        <h2 className="font-display text-7xl">our work</h2>
        <Scribble className="w-32 mt-2 opacity-40" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-dark rounded-full" />
      </motion.div>
    </div>

    <div className="grid md:grid-cols-3 gap-12 items-start">
      <WorkCard 
        image="https://picsum.photos/seed/app1/800/1000" 
        title="PixelCraft Studios: Elevate Your User Experience" 
        subtitle="UI/UX Design"
        rotate={-2}
        color="cyan"
      />
      <div className="pt-20">
        <WorkCard 
          image="https://picsum.photos/seed/app2/800/1000" 
          title="Visualize Beyond Limits: 3D Mastery Unleashed" 
          subtitle="3D Design"
          rotate={2}
          color="neon"
        />
      </div>
      <WorkCard 
        image="https://picsum.photos/seed/app3/800/1000" 
        title="Illustrative Odyssey: Where Ideas Take Flight" 
        subtitle="Illustration"
        rotate={-1}
        color="cyan"
      />
    </div>

    <div className="flex justify-center mt-20">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-sm relative"
      >
        Start a Project
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </motion.button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-32 px-8 text-center relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="font-display text-6xl md:text-8xl leading-none mb-4">
        lest's works <br />
        /together 
        <motion.span 
          whileHover={{ rotate: -2 }}
          className="inline-block bg-brand-cyan text-brand-dark px-6 py-2 mx-4 rounded-sm paper-fold paper-fold-cyan"
        >
          stay.
        </motion.span>
      </h2>
      <motion.div 
        whileHover={{ rotate: 2 }}
        className="inline-block bg-brand-neon text-brand-dark px-12 py-4 rounded-sm paper-fold paper-fold-neon"
      >
        <h2 className="font-display text-7xl md:text-9xl">creative</h2>
      </motion.div>
    </motion.div>

    <div className="mt-20">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-sm relative"
      >
        Start a Project
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      </motion.button>
    </div>

    <div className="mt-40 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-50">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-brand-cyan rounded-full" />
        <span className="font-display text-lg tracking-tight text-white opacity-100">Bond</span>
      </div>
      <div className="flex gap-8">
        <span>Service</span>
        <span>Portofolios</span>
        <span>Work</span>
        <span>Contact</span>
      </div>
    </div>
  </footer >
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-neon selection:text-brand-dark">
      <Navbar />
      <main>
        <HeroSection />
        <WhyUsSection />
        <ServicesSection />
        <WorkSection />
      </main>
      <Footer />
    </div>
  );
}
